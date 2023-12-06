import { Edit } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import { Person } from '../models/Person';
import EditDialog from './EditDialog';
import { useState } from 'react';

interface Props {
  person: Person;
  editPerson: (person: Person) => void;
  deletePerson: (person: Person) => void;
}

const PersonListItem = ({ person, editPerson, deletePerson }: Props) => {
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [newName, setNewName] = useState(person.name);

  const editDialogFields = [
    {
      label: 'Edit Name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
      }
    }
  ]

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="Edit"
            onClick={() => setDialogVisibility(true)}
          >
            <Edit />
          </IconButton>
        }>
        <ListItemText>
          {person.name}
        </ListItemText>
      </ListItem>

      <EditDialog
        open={dialogVisibility}
        textItems={editDialogFields}
        onClose={() => setDialogVisibility(false)}
        onSubmit={() => {
          setDialogVisibility(false);
          editPerson({ ...person, name: newName });
        }}
        onDelete={() => deletePerson(person)}
      />
    </>
  )
}

export default PersonListItem