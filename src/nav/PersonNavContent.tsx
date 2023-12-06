import { useState } from 'react'
import PersonList from '../components/PersonList'
import InputDialog from '../components/InputDialog'
import { Person } from '../models/Person';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  people: Person[];
  addPerson: (person: Person) => void;
  editPerson: (person: Person) => void;
  deletePerson: (person: Person) => void;
}

const PersonNavContent = ({ people, addPerson, editPerson, deletePerson }: Props) => {
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [person, setPerson] = useState<Person>({ id: '', name: '' });

  const dialogFieldsPerson = [
    {
      label: 'Enter Person',
      name: 'person',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerson({ ...person, name: e.currentTarget.value })
      }
    }
  ]

  return (
    <>
      <div className='list-container'>
        {
          <PersonList
            people={people}
            editPerson={editPerson}
            deletePerson={deletePerson}
          />
        }
      </div>

      <InputDialog
        open={dialogVisibility}
        textItems={dialogFieldsPerson}
        onClose={() => {
          setDialogVisibility(false);
        }}
        onSubmit={() => {
          addPerson({ ...person, id: uuidv4() });
          setDialogVisibility(false);
        }}
      />

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 64, right: 16 }}
        onClick={() => setDialogVisibility(true)}>
        <Add />
      </Fab >
    </>
  )
}

export default PersonNavContent