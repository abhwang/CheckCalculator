import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';

interface Props {
  open: boolean;
  label: string;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DialogWindow({ open, label, onClose, onSubmit, onChange }: Props) {

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={label}
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}