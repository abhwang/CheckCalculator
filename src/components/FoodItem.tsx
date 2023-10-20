import { ExpandMore, ExpandLess, Edit } from '@mui/icons-material';
import { Checkbox, Collapse, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import { Person } from './PersonItem';
import EditDialog from './EditDialog';

export interface Food {
  id: number;
  name: string;
  price: number;
}

interface Props {
  food: Food;
  people: Person[];
  onEdit: (e: Food) => void;
}

export default function FoodItem(props: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newFood, setNewFood] = useState<Food>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(Number(e.target.value));
  }

  const saveNewFood = () => {
    setNewFood({ id: props.food.id, name: newName, price: newPrice });
  }

  const editDialogFields = [
    {
      label: `Edit Food (${props.food.name})`,
      name: 'name',
      onChange: handleNameChange
    },
    {
      label: `Edit Price (${props.food.price})`,
      name: 'price',
      onChange: handlePriceChange
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
                CheckBoxItem(person, index)
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
          saveNewFood();
          props.onEdit(newFood!);
          setIsOpen(false);
        }}
        textItems={editDialogFields}
      />
    </>
  )
}

function CheckBoxItem(person: Person, key: number) {
  const [checked, setChecked] = useState(false);

  return (
    <ListItemButton key={key} onClick={() => {
      setChecked(!checked)
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