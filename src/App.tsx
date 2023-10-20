import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, Fab, Paper } from '@mui/material'
import FoodItem, { Food } from './components/FoodItem'
import BottomNavBar from './components/BottomNavBar';
import { Paid, Restaurant, PersonOutlined, Add } from '@mui/icons-material';
import TopAppBar from './components/TopAppBar';
import InputDialog from './components/InputDialog';
import PersonItem, { Person } from './components/PersonItem';

function App() {
  // Bottom Navigation state
  const [navPosition, setNavPosition] = useState(0);

  // Dialog Window state
  const [openDialog, setOpenDialog] = useState('');
  const closeDialog = () => setOpenDialog('');

  // Food
  const [food, setFood] = useState({ id: 0, name: '', price: 0 });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFood({ ...food, [e.target.name]: e.target.value, id: uuid() });
  }
  const editFood = (childData: Food) => {
    const newFoods = foods.map((item) => {
      if (item.id === childData.id) {
        // return updated name and price
        return { id: item.id, name: childData.name, price: childData.price }
      } else {
        // return existing food
        return item;
      }
    })
    setFoods(newFoods);
  }

  const [foods, setFoods] = useState<Food[]>([]);
  const addItem = () => {
    setFoods(foods => [...foods, food]);
    closeDialog();
  }

  // People
  const [person, setPerson] = useState({ id: 0, name: '' });
  const editPerson = (childData: Person) => {
    // setPerson({ ...person, [e.target.name]: e.target.value });

    const newPeople = people.map((item) => {
      if (item.id === childData.id) {
        // return updated name
        return { id: item.id, name: childData.name };
      } else {
        // return existing person
        return item;
      }
    })
    setPeople(newPeople);
  }

  const [people, setPeople] = useState<Person[]>([]);
  const addPerson = () => {
    setPeople(people => [...people, person]);
    closeDialog();
  }



  const handleClick = () => {
    switch (navPosition) {
      case 0:
        setOpenDialog('PERSON');
        break;
      case 1:
        setOpenDialog('ITEM');
        break;
    }
  }

  const navItems = [
    {
      name: 'People',
      icon: PersonOutlined,
    },
    {
      name: 'Food Entry',
      icon: Restaurant,
    },
    {
      name: 'Check Summary',
      icon: Paid,
    },
  ];

  const dialogFieldsPerson = [
    {
      label: 'Enter Person',
      name: 'person',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPerson({ name: e.currentTarget.value, id: uuid() })
    }
  ]

  const dialogFieldsFoods = [
    {
      label: 'Enter Item',
      name: 'name',
      onChange: handleChange
    },
    {
      label: 'Enter Price',
      name: 'price',
      onChange: handleChange
    }
  ]

  return (
    <>
      <Box>
        <CssBaseline />

        <TopAppBar>
          Check Calculator
        </TopAppBar>

        <Container>
          {navPosition === 0 &&
            <>
              <div className='list-container'>
                {people.map((person, index) => {
                  return (
                    <PersonItem
                      key={index}
                      person={person}
                      onEdit={editPerson}
                    />
                  )
                })}
              </div>

              <InputDialog
                open={openDialog === 'PERSON'}
                onClose={closeDialog}
                onSubmit={addPerson}
                textItems={dialogFieldsPerson}
              />
            </>
          }
          {navPosition === 1 &&
            <>
              <div className='list-container'>
                {foods.map((foodItem, index) => {
                  return <FoodItem
                    key={index}
                    food={foodItem}
                    people={people}
                    onEdit={editFood}
                  />
                })}
              </div>

              <InputDialog
                open={openDialog === 'ITEM'}
                onClose={closeDialog}
                onSubmit={addItem}
                textItems={dialogFieldsFoods}
              />
            </>
          }

          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'absolute', bottom: 64, right: 16 }}
            onClick={handleClick}>
            <Add />
          </Fab>
        </Container >

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={1}>
          <BottomNavBar
            navItems={navItems}
            position={navPosition}
            onChange={(e, newValue) => setNavPosition(newValue)}
          />
        </Paper>
      </Box>
    </ >
  )
}

export default App
