// theme/ThemeProviderWrapper.tsx
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import { RTL } from "./rtlCache";
import { getTheme } from "./theme";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  // You may also have a "mode" = "dark" | "light"
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  const direction = i18n.language === "he" ? "rtl" : "ltr";
  const theme = useMemo(() => getTheme(direction), [direction]);

  return (
    <RTL direction={direction}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </RTL>
  );
};
