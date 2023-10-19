import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';

interface DialogProps {
  open: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  textItems: TextItem[];
}

interface TextItem {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DialogWindow(props: DialogProps) {

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogContent>
          {props.textItems.map((item, index) => {
            return (
              <TextField
                key={index}
                autoFocus
                margin="dense"
                name={item.name}
                id={item.name}
                label={item.label}
                type="text"
                fullWidth
                variant="outlined"
                onChange={item.onChange}
              />
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={props.onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}