import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const outputDir = path.resolve("test-results", "mobile-smoke");

const viewports = [
  { name: "390x844", width: 390, height: 844 },
  { name: "375x812", width: 375, height: 812 },
  { name: "360x800", width: 360, height: 800 }
];

const routes = [
  "/",
  "/about",
  "/consultations",
  "/consultants",
  "/faq",
  "/auth/login",
  "/auth/register",
  "/contacts"
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function screenshot(page, vpName, route, suffix = "page") {
  const routeName = route === "/" ? "home" : route.replaceAll("/", "_").replace(/^_/, "");
  const file = path.join(outputDir, `${vpName}-${routeName}-${suffix}.png`);
  await page.screenshot({ path: file, fullPage: true });
}

async function hasHorizontalScroll(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
}

async function run() {
  await ensureDir(outputDir);
  const browser = await chromium.launch({ headless: true });
  const report = {
    baseUrl,
    checkedAt: new Date().toISOString(),
    viewports,
    routes,
    issues: [],
    checked: []
  };

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();

    for (const route of routes) {
      const item = { viewport: viewport.name, route, checks: [] };
      try {
        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
        await page.waitForTimeout(600);

        const overflow = await hasHorizontalScroll(page);
        item.checks.push({ key: "horizontal-scroll", ok: !overflow });
        if (overflow) {
          report.issues.push({
            severity: "high",
            viewport: viewport.name,
            route,
            title: "Горизонтальный скролл",
            reproduction: `Открыть ${route} на ${viewport.name}`
          });
        }

        await screenshot(page, viewport.name, route);

        if (route === "/") {
          const ctaCount = await page.locator("a, button").filter({ hasText: /Подобрать консультацию|Выбрать/ }).count();
          item.checks.push({ key: "home-cta-visible", ok: ctaCount > 0 });
          const menuLinksVisible = await page.locator("header a").count();
          item.checks.push({ key: "header-links-visible", ok: menuLinksVisible > 0 });
        }

        if (route === "/consultations") {
          await page.locator('input[placeholder*="задач"], input[placeholder*="Поиск"]').first().fill("переезд");
          await page.waitForTimeout(300);
          await page.locator("select").first().selectOption("BaZi").catch(() => null);
          await page.waitForTimeout(300);
          item.checks.push({ key: "consultations-filters-interact", ok: true });
        }

        if (route === "/consultants") {
          await page.locator('input[placeholder*="Поиск"]').first().fill("Марина");
          await page.waitForTimeout(300);
          await page.locator("select").first().selectOption("BaZi").catch(() => null);
          await page.waitForTimeout(300);
          item.checks.push({ key: "consultants-filters-interact", ok: true });
        }

        if (route === "/faq") {
          await page.waitForTimeout(1200);
          const firstAccordion = page.locator("button").filter({ hasText: /\+/ }).first();
          if (await firstAccordion.isVisible().catch(() => false)) {
            await firstAccordion.click();
            await page.waitForTimeout(250);
            await firstAccordion.click();
            item.checks.push({ key: "faq-accordion-toggle", ok: true });
          } else {
            item.checks.push({ key: "faq-accordion-toggle", ok: false });
            report.issues.push({
              severity: "medium",
              viewport: viewport.name,
              route,
              title: "Не найден аккордеон FAQ",
              reproduction: `Открыть ${route} на ${viewport.name}`
            });
          }
        }

        if (route === "/auth/login" || route === "/auth/register" || route === "/contacts") {
          const formVisible = await page.locator("form").first().isVisible().catch(() => false);
          item.checks.push({ key: "form-visible", ok: formVisible });
          if (!formVisible) {
            report.issues.push({
              severity: "medium",
              viewport: viewport.name,
              route,
              title: "Форма не отображается",
              reproduction: `Открыть ${route} на ${viewport.name}`
            });
          }
        }
      } catch (error) {
        report.issues.push({
          severity: "high",
          viewport: viewport.name,
          route,
          title: "Ошибка открытия страницы",
          reproduction: `Открыть ${route} на ${viewport.name}`,
          details: String(error)
        });
      }

      report.checked.push(item);
    }

    await context.close();
  }

  // Проверка наличия мобильного меню (отдельного триггера) на главной
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(500);
  const openButton = p.locator('button[aria-label*="Открыть меню"], button[aria-label*="menu"]').first();
  if (await openButton.isVisible().catch(() => false)) {
    await openButton.click();
    await p.waitForTimeout(300);
    const mobileLinkVisible = (await p.locator('a[href="/consultations"]:visible').count()) > 0;
    if (!mobileLinkVisible) {
      report.issues.push({
        severity: "high",
        viewport: "390x844",
        route: "/",
        title: "Мобильное меню открывается некорректно",
        reproduction: "Открыть главную и нажать на кнопку меню"
      });
    }
  }
  const hasMobileMenuTrigger = (await p.locator('button[aria-label*="меню"], button[aria-label*="menu"]').count()) > 0;
  if (!hasMobileMenuTrigger) {
    report.issues.push({
      severity: "medium",
      viewport: "390x844",
      route: "/",
      title: "Нет явного мобильного меню",
      reproduction: "Открыть главную на мобильном разрешении",
      details: "В шапке нет burger/menu триггера для навигации по разделам."
    });
  }
  await ctx.close();

  await browser.close();
  await fs.writeFile(path.join(outputDir, "report.json"), JSON.stringify(report, null, 2), "utf8");
  console.log(`Report saved to ${path.join(outputDir, "report.json")}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
