import { Card, CardContent, Grid, Typography } from "@mui/material";
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
  numPeople: number;
  subtotal: number;
  tax: number;
  tip: number;
}

export default function PersonSummaryCard(props: Props) {
  let personSubtotal = 0;
  let personCheck: Check = { name: '', items: [] };

  // Record name of member
  personCheck.name = props.person.name;

  // Iterate each food in the array
  props.foodArray.map((food) => {
    // For each food, divide the the price by it's members to get pricePerPerson
    food.members.forEach(memberName => {
      const numPeople = food.members.length;
      const pricePerPerson = Number((Math.round(food.price / numPeople * 100) / 100).toFixed(2));

      // Check to see if food item contains person
      if (memberName === props.person.name) {
        // Add food and cost to check
        personCheck.items.push({ name: food.name, price: pricePerPerson })

        personSubtotal += pricePerPerson;
      }
    });
  })

  const subtotal = props.foodArray.reduce((sum, num) => sum + Number(num.price), 0);

  // Calculate tax in %
  const calculatedTax = Number(((props.tax / subtotal) * personSubtotal).toFixed(2));

  // Divide tip evenly
  const calculatedTip = (props.tip / props.numPeople);

  // Calculate person total
  const personTotal = (personSubtotal + calculatedTax + calculatedTip).toFixed(2);

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
          <Typography variant="body2" className="preserve-white-space">
            Subtotal:  ${personSubtotal}
          </Typography>
          <Typography variant="body2" className="preserve-white-space">
            Calculated Tax:  ${calculatedTax}
          </Typography>
          <Typography variant="body2" className="preserve-white-space">
            Calculated Tip:  ${calculatedTip}
          </Typography>
          <Typography variant="body2" className="preserve-white-space">
            Total:  ${personTotal}
          </Typography>
        </CardContent>
      </Card>

    </Grid>
  );
}