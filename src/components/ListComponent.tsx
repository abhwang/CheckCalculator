import { Checkbox, Collapse, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'

function ListComponent() {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  }

  const [checked, setChecked] = useState(true);
  const handleToggle = () => {
    setChecked(!checked);
  }

  return (
    <List>
      <ListItemText>Test</ListItemText>
      <Collapse in={open}>
        <List>
          <ListItem
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle}
              />
            }
          >
          </ListItem>
        </List>
      </Collapse>
    </List>

  )
}

export default ListComponent