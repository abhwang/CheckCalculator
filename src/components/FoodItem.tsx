import { ExpandMore, ExpandLess, Edit } from '@mui/icons-material';
import { Checkbox, Collapse, IconButton, List, ListItemButton, ListItemText, unstable_ClassNameGenerator } from '@mui/material'
import { useState } from 'react'
import { Person } from './PersonItem';
import EditDialog from './EditDialog';

export interface Food {
  id: string;
  name: string;
  price: number;
  membersList?: string[];
}

interface Props {
  food: Food;
  people: Person[];
  onEdit: (e: Food) => void;
  onDelete: (e: Food) => void;
  addMembers: (e: Food) => void;
}

export default function FoodItem(props: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newFood, setNewFood] = useState<Food>();

  const [members, setMembers] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setNewName(e.target.value);
        break;
      case 'price':
        setNewPrice(Number(e.target.value));
        break;

    }
    setNewName(e.target.value);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(Number(e.target.value));
  }

  const saveNewFood = (name: string, price: number) => {
    setNewFood({ id: props.food.id, name: name, price: price });
  }

  const updateFoodMembers = (members: string[]) => {
    setNewFood({ id: props.food.id, name: props.food.name, price: props.food.price, membersList: members });
  }

  const checkBoxItem = (person: Person, key: number) => {
    let isMarked = false;

    if (props.food.membersList != undefined) {
      isMarked = props.food.membersList.includes(person.id);
    }
    const [checked, setChecked] = useState(isMarked);

    return (
      <ListItemButton key={key} onClick={() => {
        setChecked(!checked);
        checked === true ? setMembers(prevMembers => [...prevMembers, person.id]) : setMembers(prevMembers => prevMembers.filter((data) => data != person.id));
        updateFoodMembers(members);
        props.addMembers(newFood!);
      }}>
        <ListItemText>
          {person.name}
        </ListItemText>
        <Checkbox
          edge="end"
          checked={checked}
        />
      </ListItemButton >
    )
  }

  const editDialogFields = [
    {
      label: `Edit Food (${props.food.name})`,
      name: 'name',
      onChange: handleChange
    },
    {
      label: `Edit Price (${props.food.price})`,
      name: 'price',
      onChange: handleChange
    }
  ]

  const convertedPrice = '$' + (Math.round(props.food.price * 100) / 100).toFixed(2);

  return (
    <>
      <List>
        <ListItemButton
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          <IconButton
            edge="end"
            aria-label="Edit"
            onClick={() => {
              setIsOpen(true)
            }}>
            <Edit />
          </IconButton>
          <ListItemText
            primary={props.food.name}
            secondary={convertedPrice}
          >
          </ListItemText>
          {
            props.people.length > 0 &&
            <>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </>
          }
        </ListItemButton>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.people.map((person, index) => {
              return (
                checkBoxItem(person, index)
              )
            })}
          </List>
        </Collapse>
      </List>

      <EditDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        onSubmit={() => {
          saveNewFood(newName, newPrice);
          props.onEdit(newFood!);
          setIsOpen(false);
        }}
        onDelete={() => {
          props.onDelete(props.food);
          setIsOpen(false);
        }}
        textItems={editDialogFields}
      />
    </>
  )
}