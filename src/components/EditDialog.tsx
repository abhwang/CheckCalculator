import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';

interface Props {
  open: boolean;
  textItems: TextItem[];
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
}

interface TextItem {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditDialog = ({ open, textItems, onClose, onSubmit, onDelete }: Props) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          {textItems.map((item, index) => (
            <TextField
              key={index}
              margin="dense"
              label={item.label}
              type="text"
              fullWidth
              variant="outlined"
              onChange={item.onChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete}>Delete</Button>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialog