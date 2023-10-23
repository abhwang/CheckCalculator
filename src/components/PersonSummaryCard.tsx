import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Food } from "./FoodItem";
import { Person } from "./PersonItem";

interface Check {
  name: string;
  items: {
    name: string;
    price: number;
  }[];
}

interface Props {
  person: Person;
  foodArray: Food[];
}

export default function PersonSummaryCard(props: Props) {
  let personCheck: Check = { name: '', items: [] };

  // Record name of member
  personCheck.name = props.person.name;

  // Iterate each food in the array
  props.foodArray.map((food) => {
    // For each food, divide the the price by it's members to get pricePerPerson
    food.members.forEach(memberName => {
      const numPeople = food.members.length;
      const pricePerPerson = (Math.round(food.price / numPeople * 100) / 100).toFixed(2);

      // Check to see if food item contains person
      if (memberName === props.person.name) {
        // Add food and cost to check
        personCheck.items.push({ name: food.name, price: pricePerPerson })
      }
      // if (personCheck.items.filter(e => e.name === memberName).length === 0) {
      //   personCheck.items.push({ name: food.name, price: pricePerPerson })
      // }
    });
  })

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

      <Card sx={{ minWidth: 300 }}>
        <CardContent>
          <Typography variant="h5">
            {props.person.name}
          </Typography>
          {personCheck.items.map((food) => {
            return (
              <>
                <Typography variant="body2" className="preserve-white-space">
                  {food.name}:  ${food.price}
                </Typography>
              </>
            )
          })}
        </CardContent>
      </Card>

    </Grid>
  );
}