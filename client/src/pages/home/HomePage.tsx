import { Box } from "@mui/material";
import Banner from "../../components/Home/Banner";
import Who from "../../components/Home/Who";

export default function HomePage() {
  return (
    <Box>
      <Banner />
      <Box sx={{ marginTop: 4 }}>
        <Who />
      </Box>
    </Box>
  );
}
