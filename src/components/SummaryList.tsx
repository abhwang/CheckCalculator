import { Card, CardContent, Grid } from "@mui/material";
import { Person } from "../models/Person";
import { Food } from "../models/Food";
import PersonCheck from "./PersonCheck";

class Check {
  items: {
    name: string;
    price: number;
  }[] = [];
  tax: number = 0;
  tip: number = 0;
  total: number = 0;
}

interface Props {
  people: Person[];
  foods: Food[];
  tax: number;
  tip: number;
}

const SummaryList = ({ people, foods, tax, tip }: Props) => {
  const subtotal = foods.reduce((sum, num) => sum + Number(num.price), 0);

  const calculatePersonCheck = (foods: Food[], person: Person, totalTax: number, totalTip: number) => {
    let personSubtotal = 0;
    let check = new Check;

    foods.map(food => {
      food.members.forEach(memberName => {
        const numPeople = food.members.length;
        const pricePerPerson = Number((Math.round(food.price / numPeople * 100) / 100).toFixed(2));

        // Check to see if food item contains person
        if (memberName === person.id) {
          // Add food item and cost to check
          check.items.push({ name: food.name, price: pricePerPerson });

          personSubtotal += pricePerPerson;
        }
      })
    })

    // Calculate tax in %
    check.tax = Number(((totalTax / subtotal) * personSubtotal).toFixed(2));

    // Divide tip evenly
    check.tip = (totalTip / people.length);

    // Calculate person total
    check.total = Number((personSubtotal + check.tax + check.tip).toFixed(2));

    return check;
  }

  return (
    <Grid container className="grid">
      {people.map((person, index) => (
        <Card key={index} sx={{ minWidth: 300 }}>
          <CardContent>
            <PersonCheck
              foods={foods}
              person={person}
              totalTax={tax}
              totalTip={tip}
              numPeople={people.length}
            />
          </CardContent>
        </Card>
      ))}


    </Grid>
  );
}

export default SummaryList