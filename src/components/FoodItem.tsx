import { ExpandMore, ExpandLess, Edit } from '@mui/icons-material';
import { Checkbox, Collapse, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import { useState, useEffect } from 'react'
import { Person } from './PersonItem';
import EditDialog from './EditDialog';

export interface Food {
  id: string;
  name: string;
  price: number;
  members: string[];
}

interface Props {
  food: Food;
  people: Person[];
  onEdit: (e: { id: string, name: string, price: number, members: string[] }) => void;
  onDelete: (e: Food) => void;
}

export default function FoodItem(props: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [id, setId] = useState(props.food.id);
  const [name, setName] = useState(props.food.name);
  const [price, setPrice] = useState(props.food.price);
  const [members, setMembers] = useState<string[]>(props.food.members);

  useEffect(() => {
    props.onEdit({ id, name, price, members });
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'price':
        setPrice(Number(e.target.value));
        break;
    }
  }

  const handleCheckBox = (e: { person: Person; checked: boolean; }) => {
    if (e.checked === false) {
      // if unchecked, check to see if members array includes person and remove it, if so
      if (props.people.includes(e.person)) {
        setMembers(members.filter(function (item) {
          return item !== e.person.name
        }))
      }
    } else {
      // if members array doesn't already have person, add it
      if (!members.includes(e.person.name)) {
        setMembers(prevMembers => [...prevMembers, e.person.name]);
      }
    }
  }

  const editDialogFields = [
    {
      label: `Edit Food (${name})`,
      name: 'name',
      onChange: handleChange
    },
    {
      label: `Edit Price (${price})`,
      name: 'price',
      onChange: handleChange
    }
  ]

  const convertedPrice = '$' + (Math.round(price * 100) / 100).toFixed(2);

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
            primary={name}
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
            {props.people.map((person) => {
              const isChecked = members.includes(person.name);
              return (
                SubItem(person, isChecked, handleCheckBox)
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

function SubItem(person: Person, isChecked: boolean, onClick: (e: { person: Person; checked: boolean; }) => void) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <ListItemButton onClick={() => {
      setChecked(!checked);
      onClick({ person: person, checked: !checked })
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