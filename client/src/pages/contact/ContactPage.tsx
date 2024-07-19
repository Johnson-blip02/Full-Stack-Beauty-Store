import { Button, ButtonGroup, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../util/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);
  return (
    <Fragment>
      <Typography variant="h2">{title}</Typography>;
      <Typography variant="h5">The data is {data}</Typography>;
      <ButtonGroup>
        <Button
          onClick={() => dispatch(decrement(1))}
          variant="contained"
          color="error"
        >
          Decrement
        </Button>
        <Button
          onClick={() => dispatch(increment(1))}
          variant="contained"
          color="primary"
        >
          Increment
        </Button>
      </ButtonGroup>
    </Fragment>
  );
}
