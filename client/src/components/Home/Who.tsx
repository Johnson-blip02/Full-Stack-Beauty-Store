import { Box, Typography, Container, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled container for image
const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  marginBottom: 2, // Spacing below the image
});

export default function Who() {
  return (
    <Container
      sx={{
        mt: 5,
        paddingY: 4, // Vertical padding
        paddingX: 2, // Horizontal padding
        backgroundColor: "secondary.main", // Background color
        color: "background.default", // Text color
        borderRadius: 2, // Rounded corners
      }}
    >
      <Box
        sx={{
          textAlign: "center", // Center-align text and image
          marginBottom: 4, // Spacing between sections
        }}
      >
        <StyledAvatar
          src="/img/team.jpg" // Path to your image in the public folder
          alt="Team"
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Who We Are
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.6 }}>
          We are a passionate team dedicated to delivering exceptional service
          and innovative solutions. With a commitment to excellence and a deep
          understanding of our industry, we strive to create meaningful
          experiences and drive success for our clients. Our team is composed of
          skilled professionals who are experts in their fields, working
          together to achieve our common goals and exceed expectations.
        </Typography>
      </Box>
    </Container>
  );
}
