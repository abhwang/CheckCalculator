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
import PersonSummaryCard from './components/PersonSummaryCard';

function App() {
  // Bottom Navigation state
  const [navPosition, setNavPosition] = useState(0);

  // Dialog Window state
  const [openDialog, setOpenDialog] = useState('');
  const closeDialog = () => setOpenDialog('');

  // Food
  const [food, setFood] = useState<Food>({ id: '', name: '', price: 0, members: [] });
  const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFood({ ...food, [e.target.name]: e.target.value, id: uuid() });
  }

  // Food Array
  const [foodArray, setFoodArray] = useState<Food[]>([]);
  const addFoodToArray = () => {
    setFoodArray(prevFoodArray => [...prevFoodArray, food]);
    closeDialog();
  }
  const editFoodFromArray = (childData: { id: string, name: string, price: number, members: string[] }) => {
    const newFood = foodArray.map((item) => {
      if (item.id === childData.id) {
        // return updated name, price, and members, but keep the existing id
        return { id: item.id, name: childData.name, price: childData.price, members: childData.members }
      } else {
        // return existing food
        return item;
      }
    })
    setFoodArray(newFood);
  }
  const deleteFoodFromArray = (childData: Food) => {
    setFoodArray(foodArray.filter(function (item) {
      return item.id !== childData.id
    }))
  }

  // Person
  const [person, setPerson] = useState({ id: '', name: '' });
  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson({ name: e.currentTarget.value, id: uuid() });
  }

  // People Array
  const [peopleArray, setPeopleArray] = useState<Person[]>([]);
  const addPersonToArray = () => {
    setPeopleArray(prevPeopleArray => [...prevPeopleArray, person]);
    closeDialog();
  }
  const editPersonFromArray = (childData: Person) => {
    const newPeopleArray = peopleArray.map((item) => {
      if (item.id === childData.id) {
        // return updated name, but keep the existing id
        return { id: item.id, name: childData.name };
      } else {
        // return existing person
        return item;
      }
    })
    setPeopleArray(newPeopleArray);
  }
  const deletePersonFromArray = (childData: Person) => {
    setPeopleArray(peopleArray.filter(function (item) {
      return item.id !== childData.id
    }))
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
      onChange: handlePersonChange
    }
  ]

  const dialogFieldsFoods = [
    {
      label: 'Enter Item',
      name: 'name',
      onChange: handleFoodChange
    },
    {
      label: 'Enter Price',
      name: 'price',
      onChange: handleFoodChange
    }
  ]

  return (
    <>
      <Box>
        <CssBaseline />

        <TopAppBar>
          Check Calculator
        </TopAppBar>

        <Container className='container'>
          {navPosition === 0 &&
            <>
              <div className='list-container'>
                {peopleArray.map((person, index) => {
                  return (
                    <PersonItem
                      key={index}
                      person={person}
                      onEdit={editPersonFromArray}
                      onDelete={deletePersonFromArray}
                    />
                  )
                })}
              </div>

              <InputDialog
                open={openDialog === 'PERSON'}
                onClose={closeDialog}
                onSubmit={addPersonToArray}
                textItems={dialogFieldsPerson}
              />
            </>
          }

          {navPosition === 1 &&
            <>
              <div className='list-container'>
                {foodArray.map((foodItem, index) => {
                  return <FoodItem
                    key={index}
                    food={foodItem}
                    people={peopleArray}
                    onEdit={editFoodFromArray}
                    onDelete={deleteFoodFromArray}
                  />
                })}
              </div>

              <InputDialog
                open={openDialog === 'ITEM'}
                onClose={closeDialog}
                onSubmit={addFoodToArray}
                textItems={dialogFieldsFoods}
              />
            </>
          }

          {navPosition === 2 &&
            <>
              {peopleArray.map((person) => {
                return <PersonSummaryCard person={person} foodArray={foodArray}></PersonSummaryCard>
              })}
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
