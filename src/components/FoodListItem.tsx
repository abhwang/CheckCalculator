import { Edit, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Checkbox, Collapse, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import EditDialog from './EditDialog'
import { Food } from '../models/Food'
import { Person } from '../models/Person'
import FoodMembers from './FoodMembers'

interface Props {
  food: Food;
  people: Person[];
  editFood: (food: Food) => void;
  deleteFood: (food: Food) => void;
}

const FoodListItem = ({ food, people, editFood, deleteFood }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [newName, setNewName] = useState(food.name);
  const [newPrice, setNewPrice] = useState(food.price);

  const handleCheckBox = (e: { person: Person; checked: boolean; }) => {
    if (e.checked === false) {
      // if unchecked, check to see if members array includes person id and remove it, if so
      if (people.find(obj => obj.id.includes(e.person.id))) {
        editFood({ ...food, members: food.members.filter(id => id !== e.person.id) });
      }
    } else {
      // if members array doesn't already have person, add it
      if (!food.members.includes(e.person.id)) {
        editFood({ ...food, members: [...food.members, e.person.id] });
      }
    }
  }

  const editDialogFields = [
    {
      label: `Edit Food (${food.name})`,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
      }
    },
    {
      label: `Edit Price (${food.price})`,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrice(Number(e.target.value));
      }
    }
  ]

  const convertedPrice = '$' + (Math.round(food.price * 100) / 100).toFixed(2);

  return (
    <>
      <ListItemButton
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ListItemText
          primary={food.name}
          secondary={convertedPrice}
        >
        </ListItemText>
        <IconButton
          edge="start"
          aria-label="Edit"
          onClick={(event) => {
            event.stopPropagation();
            setDialogVisibility(true);
          }}
        >
          <Edit />
        </IconButton>
        {
          people.length > 0 &&
          <>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </>
        }
      </ListItemButton >

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {people.map((person, index) => (
            <FoodMembers
              key={index}
              person={person}
              isChecked={food.members.includes(person.id)}
              onClick={handleCheckBox}
            />
          ))}
        </List>
      </Collapse>

      <EditDialog
        open={dialogVisibility}
        textItems={editDialogFields}
        onClose={() => setDialogVisibility(false)}
        onSubmit={() => {
          setDialogVisibility(false);
          editFood({ ...food, name: newName, price: newPrice });
        }}
        onDelete={() => {
          setDialogVisibility(false);
          deleteFood(food);
        }}
      />
    </>
  )
}

export default FoodListItem