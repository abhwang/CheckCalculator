import { List } from '@mui/material';
import { Food } from '../models/Food';
import FoodListItem from './FoodListItem';
import { Person } from '../models/Person';

interface Props {
  foods: Food[];
  people: Person[];
  editFood: (food: Food) => void;
  deleteFood: (food: Food) => void;
}

const FoodList = ({ foods, people, editFood, deleteFood }: Props) => {
  return (
    <>
      <List>
        {foods.map((food, index) => (
          <FoodListItem
            key={index}
            food={food}
            people={people}
            editFood={editFood}
            deleteFood={deleteFood}
          />
        ))}
      </List>
    </>
  )
}

export default FoodList