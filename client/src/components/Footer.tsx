import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        color: "white",
        py: 1, // Reduced vertical padding
        px: 2, // Reduced horizontal padding
        textAlign: "center",
        position: "absolute",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Beauty Store Local NZ. All rights
          reserved.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
          <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
