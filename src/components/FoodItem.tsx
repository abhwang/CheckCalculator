import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Checkbox, Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'

interface Props {
  itemName: string;
  itemPrice: number;
  people: string[];
}

export default function FoodItem(props: Props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  }

  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  }

  const convertedPrice = '$' + (Math.round(props.itemPrice * 100) / 100).toFixed(2);

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={props.itemName} secondary={convertedPrice}></ListItemText>
        {
          props.people.length > 0 &&
          <>{open ? <ExpandLess /> : <ExpandMore />}</>
        }
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.people.map((person) => {
            return (
              <ListItem
                sx={{ pl: 4 }}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={checked}
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