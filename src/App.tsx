import { useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, Paper } from '@mui/material'
import BottomNavBar from './components/BottomNavBar';
import { Paid, Restaurant, PersonOutlined } from '@mui/icons-material';
import TopAppBar from './components/TopAppBar';
import { Person } from './models/Person';
import { Food } from './models/Food';
import PersonNavContent from './nav/PersonNavContent';
import FoodNavContent from './nav/FoodNavContent';
import SummaryNavContent from './nav/SummaryNavContent';

function App() {
  const [navPosition, setNavPosition] = useState(0);

  const [people, setPeople] = useState<Person[]>([]);
  const addPerson = (newPerson: Person) => {
    setPeople([...people, newPerson]);
  }
  const editPerson = (newPerson: Person) => {
    setPeople(people.map(person => person.id === newPerson.id ? { ...person, name: newPerson.name } : person));
  }
  const deletePerson = (modifiedPerson: Person) => {
    setPeople(people.filter(person => person.id !== modifiedPerson.id));

    // Remove person id from food members
    setFoods(foods.map(food => food.members.includes(modifiedPerson.id) ? { ...food, members: food.members.filter(id => id !== modifiedPerson.id) } : food))
  }

  const [foods, setFoods] = useState<Food[]>([]);
  const addFood = (newFood: Food) => {
    setFoods([...foods, newFood]);
  }
  const editFood = (modifiedFood: Food) => {
    setFoods(foods.map(food => food.id === modifiedFood.id ? { ...food, name: modifiedFood.name, price: modifiedFood.price, members: modifiedFood.members } : food));
  }
  const deleteFood = (modifiedFood: Food) => {
    setFoods(foods.filter(food => food.id !== modifiedFood.id));
  }

  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);

  const navItems = [
    { name: 'People', icon: PersonOutlined, content: PersonNavContent },
    { name: 'Food', icon: Restaurant, },
    { name: 'Check Summary', icon: Paid, },
  ];

  const renderContent = () => {
    switch (navPosition) {
      case 0:
        return <PersonNavContent
          people={people}
          addPerson={addPerson}
          editPerson={editPerson}
          deletePerson={deletePerson}
        />
      case 1:
        return <FoodNavContent
          foods={foods}
          people={people}
          addFood={addFood}
          editFood={editFood}
          deleteFood={deleteFood}
        />
      case 2:
        return <SummaryNavContent
          people={people}
          foods={foods}
          tax={tax}
          tip={tip}
          setTax={(tax) => setTax(tax)}
          setTip={(tip) => setTip(tip)}
        />
    }
  }

  return (
    <>
      <Box>
        <CssBaseline />

        <TopAppBar>
          Check Calculator
        </TopAppBar>

        <Container className='container'>
          {renderContent()}
        </Container >

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={1}>
          <BottomNavBar
            navItems={navItems}
            navPosition={navPosition}
            onChange={(e, newNavPosition) => setNavPosition(newNavPosition)}
          />
        </Paper>
      </Box >
    </ >
  )
}

export default App
