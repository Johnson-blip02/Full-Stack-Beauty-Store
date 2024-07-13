import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <Fragment>
          <Typography gutterBottom variant="h3" color="secondary">
            {state.error.title}
          </Typography>
          <Divider></Divider>
          <Typography variant="body1">
            {state.error.detail || "Server Error"}
          </Typography>
        </Fragment>
      ) : (
        <Typography gutterBottom variant="h5">
          Server error
        </Typography>
      )}
    </Container>
  );
}
