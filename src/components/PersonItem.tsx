import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import EditDialog from './EditDialog';

export interface Person {
  id: string;
  name: string;
}

interface Props {
  person: Person;
  onEdit: (e: Person) => void;
  onDelete: (e: Person) => void;
}

export default function PersonItem(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [person, setPerson] = useState<Person>({ id: props.person.id, name: props.person.name });

  const editDialogFields = [
    {
      label: 'Edit Name',
      name: 'name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerson({ id: props.person.id, name: e.target.value });
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
                setIsOpen(true);
              }}>
              <Edit />
            </IconButton>
          }>
          <ListItemText>
            {person.name}
          </ListItemText>
        </ListItem>
      </List>

      <EditDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onSubmit={() => {
          props.onEdit(person!);
          setIsOpen(false);
        }}
        onDelete={() => {
          props.onDelete(props.person);
          setIsOpen(false);
        }}
        textItems={editDialogFields}
      />
    </>
  )
}