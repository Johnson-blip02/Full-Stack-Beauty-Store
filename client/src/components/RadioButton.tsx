import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
  option: any[];
  onChange: (event: any) => void;
  selectOption: string;
}

export default function RadioButton({ option, onChange, selectOption }: Props) {
  return (
    <RadioGroup onChange={onChange} value={selectOption}>
      {option.map(({ value, label }) => (
        <FormControlLabel
          value={value}
          control={<Radio />}
          label={label}
          key={value}
        />
      ))}
    </RadioGroup>
  );
}
