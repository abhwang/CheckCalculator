import { List } from '@mui/material';
import { Person } from '../models/Person';
import PersonListItem from './PersonListItem';

interface Props {
  people: Person[];
  editPerson: (person: Person) => void;
  deletePerson: (person: Person) => void;
}

const PersonList = ({ people, editPerson, deletePerson }: Props) => {

  return (
    <>
      <List>
        {people.map((person, index) => (
          <PersonListItem
            key={index}
            person={person}
            editPerson={editPerson}
            deletePerson={deletePerson}
          />
        ))}
      </List>
    </>
  )
}

export default PersonList