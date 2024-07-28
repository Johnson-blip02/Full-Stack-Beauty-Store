export interface CounterState {
  data: number;
  title: string;
}

const initalState: CounterState = {
  data: 30,
  title: "redux counter",
};

export default function counterReduce(state = initalState) {
  return state;
}
