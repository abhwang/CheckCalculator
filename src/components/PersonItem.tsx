import { Edit } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemText } from '@mui/material'

interface Props {
  person: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function PersonItem(props: Props) {

  return (
    <List>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="Edit"
            onClick={props.onClick}>
            <Edit />
          </IconButton>
        }>
        <ListItemText>{props.person}</ListItemText>
      </ListItem>
    </List>
  )
}