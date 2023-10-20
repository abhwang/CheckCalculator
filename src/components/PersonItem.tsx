import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import EditDialog from './EditDialog';

export interface Person {
  id: number;
  name: string;
}

interface Props {
  person: Person;
  onEdit: (e: Person) => void;
}

export default function PersonItem(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [newPerson, setNewPerson] = useState<Person>();

  const editDialogFields = [
    {
      label: 'Edit Name',
      name: 'name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPerson({ id: props.person.id, name: e.target.value })
      }
    }
  ]

  return (
    <>
      <List>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="Edit"
              onClick={() => {
                setIsOpen(true)
              }}>
              <Edit />
            </IconButton>
          }>
          <ListItemText>
            {props.person.name}
          </ListItemText>
        </ListItem>
      </List>

      <EditDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        onSubmit={() => {
          props.onEdit(newPerson!);
          setIsOpen(false);
        }}
        textItems={editDialogFields}
      />
    </>
  )
}