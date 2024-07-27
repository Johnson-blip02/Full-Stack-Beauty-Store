import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="##ced4da">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        @Beauty Store Local NZ
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Box>
  );
}

// import { Box, Container, Typography, Link } from "@mui/material";

// export default function Footer() {
//   return (
//     <Box
//       sx={{
//         marginTop: 4,
//         width: "100%",
//         backgroundColor: "primary.main",
//         color: "white",
//         py: 1, // Reduced vertical padding
//         px: 2, // Reduced horizontal padding
//         textAlign: "center",
//         position: "absolute",
//         bottom: 0,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Typography variant="body1">
//           © {new Date().getFullYear()} Beauty Store Local NZ. All rights
//           reserved.
//         </Typography>
//         <Box sx={{ mt: 1 }}>
//           <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
//             Privacy Policy
//           </Link>
//           <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
//             Terms of Service
//           </Link>
//           <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
//             Contact Us
//           </Link>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
