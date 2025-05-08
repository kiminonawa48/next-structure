"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { GitHub, Twitter, LinkedIn } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are a modern web application built with Next.js 15, TanStack
              Query, and Material UI.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Example Street, City
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <IconButton aria-label="GitHub" color="inherit">
              <GitHub />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton aria-label="LinkedIn" color="inherit">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
