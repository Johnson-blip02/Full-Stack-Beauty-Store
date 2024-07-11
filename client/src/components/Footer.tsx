import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        color: "white",
        mt: 4,
        py: 3,
        px: 2,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Beauty Store Local NZ. All rights
          reserved.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/privacy" color="inherit" sx={{ mx: 2 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" sx={{ mx: 2 }}>
            Terms of Service
          </Link>
          <Link href="/contact" color="inherit" sx={{ mx: 2 }}>
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
