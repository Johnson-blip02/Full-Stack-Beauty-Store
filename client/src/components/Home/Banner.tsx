import { Box, styled, Typography } from "@mui/material";

const StyledImage = styled("img")({
  width: 200, // Fixed width for the image
  height: "100%", // Full height of the Box
  objectFit: "cover", // Maintain aspect ratio while covering the container
});

export default function Banner() {
  return (
    <Box
      sx={{
        width: "100%", // Full width
        height: 250, // Height of the Box
        backgroundColor: "secondary.main", // Background color
        color: "background.default", // Text color
        display: "flex", // Use flexbox layout
        alignItems: "center", // Center items vertically
        padding: 3, // Padding around the entire Box
        boxSizing: "border-box", // Ensure padding is included in the total width and height
      }}
    >
      <Box
        sx={{
          flexShrink: 0, // Prevent the image from shrinking
          width: 200, // Fixed width for the image
          height: "100%", // Full height of the container
        }}
      >
        <StyledImage
          src="/img/Girl_Holding_Products.jpg" // Path relative to the public folder
          alt="Logo"
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1, // Allow this Box to take the remaining space
          paddingLeft: 2, // Padding for spacing inside this Box
        }}
      >
        <Typography variant="h2" fontWeight="bold" mb={2}>
          Beauty Is Everywhere
        </Typography>
        <Typography variant="h4">
          Unleash your Beauty with these stunning products
        </Typography>
      </Box>
    </Box>
  );
}
