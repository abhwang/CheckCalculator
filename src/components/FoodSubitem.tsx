import { Checkbox, ListItemButton, ListItemText } from "@mui/material";
import { Person } from "./PersonItem";
import { useState } from "react";

interface Props {
  person: Person;
  checked: boolean;
  onClick: (e: { person: Person; checked: boolean; }) => void;
}

export default function FoodSubitem(props: Props) {
  const [checked, setChecked] = useState(props.checked);

  return (
    <ListItemButton onClick={() => {
      setChecked(!checked);
      props.onClick({ person: props.person, checked: !checked })
    }}>
      <ListItemText>
        {props.person.name}
      </ListItemText>
      <Checkbox
        edge="end"
        checked={checked}
      />
    </ListItemButton >
  )
}