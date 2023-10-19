import { useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, Fab, Paper } from '@mui/material'
import FoodItem from './components/FoodItem'
import BottomNavBar from './components/BottomNavBar';
import { Paid, Restaurant, Person, Add } from '@mui/icons-material';
import TopAppBar from './components/TopAppBar';
import DialogWindow from './components/DialogWindow';
import PersonItem from './components/PersonItem';

interface Food {
  itemName: string;
  itemPrice: number;
}

function App() {
  // Bottom Navigation state
  const [navPosition, setNavPosition] = useState(0);

  // Dialog Window state
  const [openDialog, setOpenDialog] = useState('');
  const closeDialog = () => setOpenDialog('');

  // Items
  const [item, setItem] = useState({
    itemName: '',
    itemPrice: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    console.log(item);
  }
  const [items, setItems] = useState<Food[]>([]);
  const addItem = () => {
    setItems(items => [...items, item]);
    closeDialog();
  }

  // People
  const [personName, setPersonName] = useState('');
  const [people, setPeople] = useState<string[]>([]);
  const addPerson = () => {
    setPeople(prevPeople => [...prevPeople, personName]);
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

  const dialogFieldsPerson = [
    {
      label: 'Enter Person',
      name: 'person',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPersonName(e.currentTarget.value)
    }
  ]

  const dialogFieldsFoods = [
    {
      label: 'Enter Item',
      name: 'itemName',
      onChange: handleChange
    },
    {
      label: 'Enter Price',
      name: 'itemPrice',
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
                  return <PersonItem key={index} person={person} onClick={(e) => {
                    return (<DialogWindow
                      open={openDialog === 'PERSON'}
                      onClose={closeDialog}
                      onSubmit={addPerson}
                      textItems={dialogFieldsPerson}
                    />
                    )
                  }} />
                })}
              </div>

              <DialogWindow
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
                {items.map((item, index) => {
                  return <FoodItem key={index} itemName={item.itemName} itemPrice={item.itemPrice} people={people} />
                })}
              </div>

              <DialogWindow
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
