import { Fab } from "@mui/material"
import InputDialog from "../components/InputDialog"
import { Add } from "@mui/icons-material"
import { Food } from "../models/Food";
import { useState } from "react";
import { Person } from "../models/Person";
import FoodList from "../components/FoodList";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  foods: Food[];
  people: Person[];
  addFood: (food: Food) => void;
  editFood: (food: Food) => void;
  deleteFood: (food: Food) => void;
}

const FoodNavContent = ({ foods, people, addFood, editFood, deleteFood }: Props) => {
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [food, setFood] = useState<Food>({ id: '', name: '', price: 0, members: [] });

  const dialogFieldsFoods = [
    {
      label: 'Enter Item',
      name: 'name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFood({ ...food, name: e.currentTarget.value })
      }
    },
    {
      label: 'Enter Price',
      name: 'price',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFood({ ...food, price: Number(e.currentTarget.value) })
      }
    }
  ]

  return (
    <>
      <div className='list-container'>
        {
          <FoodList
            foods={foods}
            people={people}
            editFood={editFood}
            deleteFood={deleteFood}
          />
        }
      </div>

      <InputDialog
        open={dialogVisibility}
        textItems={dialogFieldsFoods}
        onClose={() => {
          setDialogVisibility(false);
        }}
        onSubmit={() => {
          addFood({ ...food, id: uuidv4() });
          setDialogVisibility(false);
        }}
      />

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 64, right: 16 }}
        onClick={() => setDialogVisibility(true)}>
        <Add />
      </Fab >
    </>
  )
}

export default FoodNavContent