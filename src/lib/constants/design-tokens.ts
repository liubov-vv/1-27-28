export const designTokens = {
  colors: {
    background: "#F6F1E8",
    surface: "#FFFFFF",
    surfaceMuted: "#F8F7F4",
    textPrimary: "#131D34",
    textSecondary: "#4B5565",
    border: "#E4DDCF",
    primary: "#1A2B4E",
    primaryHover: "#132240",
    accent: "#C8A96B",
    success: "#0F766E",
    warning: "#B45309",
    danger: "#B91C1C"
  },
  spacing: {
    sectionX: "px-4 sm:px-6 lg:px-10",
    sectionY: "py-10 sm:py-12 lg:py-16",
    containerMax: "max-w-7xl"
  },
  radius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl"
  },
  shadow: {
    soft: "shadow-[0_6px_24px_rgba(19,29,52,0.08)]",
    card: "shadow-[0_2px_8px_rgba(19,29,52,0.06)]"
  },
  typography: {
    h1: "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight",
    h2: "text-2xl sm:text-3xl font-semibold tracking-tight",
    h3: "text-xl sm:text-2xl font-semibold",
    body: "text-sm sm:text-base leading-7",
    caption: "text-xs sm:text-sm leading-6"
  }
} as const;
