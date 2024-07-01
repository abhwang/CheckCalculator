import { Typography } from "@mui/material";
import { Food } from "../models/Food";
import { Person } from "../models/Person";

interface Props {
  foods: Food[];
  person: Person;
  totalTax: number;
  totalTip: number;
  numPeople: number;
}

class Check {
  items: {
    name: string;
    price: number;
  }[] = [];
  tax: number = 0;
  tip: number = 0;
  subtotal: number = 0;
  total: number = 0;
}

const PersonCheck = ({ foods, person, totalTax, totalTip, numPeople }: Props) => {
  const subtotal = foods.reduce((sum, num) => sum + Number(num.price), 0);

  let check = new Check;

  foods.map(food => {
    food.members.forEach(memberName => {
      const numPeople = food.members.length;
      const pricePerPerson = Number((Math.round(food.price / numPeople * 100) / 100).toFixed(2));

      // Check to see if food item contains person
      if (memberName === person.id) {
        // Add food item and cost to check
        check.items.push({ name: food.name, price: pricePerPerson });

        check.subtotal += pricePerPerson;
      }
    })
  })

  // Calculate tax in %
  check.tax = Number(((totalTax / subtotal) * check.subtotal).toFixed(2));

  // Divide tip evenly
  check.tip = Number((totalTip / numPeople).toFixed(2));

  // Calculate person total
  check.total = Number((check.subtotal + check.tax + check.tip).toFixed(2));

  return (
    <>
      <Typography variant="h5">
        {person.name}
      </Typography>

      {check.items.map((food, index) => (
        <Typography key={index} variant="body2" className="preserve-white-space">
          {food.name}:  ${food.price}
        </Typography>
      ))}
      <Typography variant="body2" className="preserve-white-space">
        Subtotal:  ${check.subtotal}
      </Typography>
      <Typography variant="body2" className="preserve-white-space">
        Calculated Tax:  ${check.tax}
      </Typography>
      <Typography variant="body2" className="preserve-white-space">
        Calculated Tip:  ${check.tip}
      </Typography>
      <Typography variant="body2" className="preserve-white-space">
        Total:  ${check.total}
      </Typography>
    </>
  )
}

export default PersonCheck