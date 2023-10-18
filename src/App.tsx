import { useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, Paper } from '@mui/material'
import FoodItem from './components/FoodItem'
import FloatingActionButton from './components/FloatingActionButton';
import BottomNavBar from './components/BottomNavBar';
import { Paid, Restaurant, LunchDining, Person } from '@mui/icons-material';
import TopAppBar from './components/TopAppBar';
import DialogWindow from './components/DialogWindow';

function App() {
  // Bottom Navigation state
  const [navPosition, setNavPosition] = useState(0);

  // Dialog Window state
  const [openDialog, setOpenDialog] = useState('');
  const handlePersonClick = () => setOpenDialog('PERSON');
  const handleItemClick = () => setOpenDialog('ITEM');
  const closeDialog = () => setOpenDialog('');


  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const addItem = () => {
    setItems(prevItems => [...prevItems, itemName]);
    closeDialog();
  }

  const [personName, setPersonName] = useState('');
  const [people, setPeople] = useState<string[]>([]);
  const addPerson = () => {
    setPeople(prevPeople => [...prevPeople, personName]);
    closeDialog();
  }


  const navItems = [
    {
      name: 'People',
      icon: Person,
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

  const actionItems = [
    {
      name: 'Food',
      icon: LunchDining,
      onClick: () => { handleItemClick() },
    },
    {
      name: 'Person',
      icon: Person,
      onClick: () => { handlePersonClick() },
    },
  ];



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
                {items.map((item) => {
                  return <FoodItem item={item} people={people} />
                })}
              </div>

              <DialogWindow
                open={openDialog === 'PERSON'}
                label='Enter Person'
                onClose={closeDialog}
                onSubmit={addPerson}
                onChange={(e) => setPersonName(e.currentTarget.value)}
              />
            </>
          }



          <DialogWindow
            open={openDialog === 'ITEM'}
            label='Enter Item'
            onClose={closeDialog}
            onSubmit={addItem}
            onChange={(e) => setItemName(e.currentTarget.value)}
          />

          <FloatingActionButton actionItems={actionItems} />
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
