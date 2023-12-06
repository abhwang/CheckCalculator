import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import SummaryList from '../components/SummaryList'
import { Person } from '../models/Person';
import { Food } from '../models/Food';

interface Props {
  people: Person[];
  foods: Food[];
  tax: number;
  tip: number;
  setTax: (tax: number) => void;
  setTip: (tip: number) => void;
}

const SummaryNavContent = ({ people, foods, tax, tip, setTax, setTip }: Props) => {
  return (
    <>
      <FormControl sx={{ m: 1 }}>
        <InputLabel>Tax</InputLabel>
        <OutlinedInput
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Tax"
          defaultValue={tax === 0 ? "" : tax}
          onChange={(value) => setTax(Number(value.target.value))}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Tip</InputLabel>
        <OutlinedInput
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Tip"
          defaultValue={tip === 0 ? "" : tip}
          onChange={(value) => setTip(Number(value.target.value))}
        />
      </FormControl>
      <SummaryList
        people={people}
        foods={foods}
        tax={tax}
        tip={tip}
      />
    </>
  )
}

export default SummaryNavContent