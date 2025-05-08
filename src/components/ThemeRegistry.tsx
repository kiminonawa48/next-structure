"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "mui",
  prepend: true,
});

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
