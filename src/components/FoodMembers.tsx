import { useState } from 'react'
import { Person } from '../models/Person';
import { Checkbox, ListItemButton, ListItemText } from '@mui/material';

interface Props {
  person: Person;
  isChecked: boolean;
  onClick: (e: { person: Person; checked: boolean }) => void;
}

const FoodMembers = ({ person, isChecked, onClick }: Props) => {
  const [checked, setChecked] = useState(isChecked);

  return (
    <ListItemButton onClick={() => {
      setChecked(!checked);
      onClick({ person: person, checked: !checked });
    }}>
      <ListItemText>
        {person.name}
      </ListItemText>
      <Checkbox
        edge="end"
        checked={checked}
      />
    </ListItemButton >
  )
}

export default FoodMembers