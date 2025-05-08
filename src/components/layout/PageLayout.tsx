"use client";

import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

export default function PageLayout({
  children,
  maxWidth = "lg",
}: PageLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth={maxWidth}
        sx={{
          flexGrow: 1,
          py: 4,
          marginBottom: 8,
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
