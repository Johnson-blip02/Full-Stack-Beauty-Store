import {
  FormGroup,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked = [], onChange }: Props) {
  const [checkitems, setCheckeditems] = useState<string[]>(checked);

  useEffect(() => {
    setCheckeditems(checked);
  }, [checked]);

  function handleChecked(value: string) {
    const currentIndex = checkitems.indexOf(value);
    let newCheck: string[] = [];

    if (currentIndex === -1) {
      newCheck = [...checkitems, value];
    } else {
      newCheck = checkitems.filter((item) => item !== value);
    }

    setCheckeditems(newCheck);
    onChange(newCheck);
  }

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          control={
            <MuiCheckbox
              checked={checkitems.includes(item)}
              onChange={() => handleChecked(item)}
            />
          }
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
}
