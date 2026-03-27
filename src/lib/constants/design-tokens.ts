export const designTokens = {
  colors: {
    background: "#F6F2EC",
    surface: "#FFFFFF",
    surfaceMuted: "#FAF7F2",
    textPrimary: "#181F2D",
    textSecondary: "#58606E",
    border: "#E0D8CB",
    primary: "#1F2E48",
    primaryHover: "#182339",
    accent: "#B49058",
    success: "#0F766E",
    warning: "#B45309",
    danger: "#B91C1C"
  },
  spacing: {
    sectionX: "px-4 sm:px-8 lg:px-12",
    sectionY: "py-12 sm:py-16 lg:py-20",
    containerMax: "max-w-7xl"
  },
  radius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl"
  },
  shadow: {
    soft: "shadow-[0_18px_40px_rgba(24,31,45,0.08)]",
    card: "shadow-[0_8px_24px_rgba(24,31,45,0.06)]"
  },
  typography: {
    h1: "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
    h2: "text-3xl sm:text-4xl font-semibold tracking-tight",
    h3: "text-xl sm:text-2xl font-semibold tracking-tight",
    body: "text-base leading-7",
    caption: "text-sm leading-6"
  }
} as const;
