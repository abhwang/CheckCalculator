import { Card, CardContent, Grid } from "@mui/material";
import { Person } from "../models/Person";
import { Food } from "../models/Food";
import PersonCheck from "./PersonCheck";

interface Props {
  people: Person[];
  foods: Food[];
  tax: number;
  tip: number;
}

const SummaryList = ({ people, foods, tax, tip }: Props) => {
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