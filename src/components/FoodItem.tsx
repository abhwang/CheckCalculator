import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Checkbox, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useState } from 'react'

interface Props {
  item: string;
  people: string[];
}

export default function FoodItem({ item, people }: Props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  }

  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  }

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemText>{item}</ListItemText>
        {people.length > 0 &&
          <>
            {open ? <ExpandLess /> : <ExpandMore />}
          </>
        }
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {people.map((person) => {
            return (
              <ListItem
                sx={{ pl: 4 }}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle}
                  />
                }
              >
                <ListItemText>{person}</ListItemText>
              </ListItem>
              // <ListItemButton onClick={handleToggle}>
              //   <ListItemText>{person}</ListItemText>
              //   <Checkbox
              //     edge="end"
              //     checked={checked}
              //   />
              // </ListItemButton>
            )
          })}
        </List>
      </Collapse>
    </List>

  )
}