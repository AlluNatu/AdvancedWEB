import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IColumn {
  name: string;
  _id: string
}

interface popUpProps {
  columns: IColumn[]
  addNote: (note: { title: string; content: string; status: string }) => void;
}

const PopUp: React.FC<popUpProps> = ({addNote, columns}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

  // Handles change in the selector that user uses to select given status
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  // Handles that the popup is opened. Sets it true for it can render popup
  const handleClickOpen = () => {
    console.log(columns);
    
    setOpen(true);
  };
// Handles popup closing so it does not render anymore
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button id='addNote' variant="outlined" onClick={handleClickOpen}>
        {t("Add Note")}
      </Button>
      {/* MUI popup dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            // When clicking button on popup submits data forward to addNote function in ./home
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData).entries());
              formJson.column = status;
              
              const newNote = {
                title: formJson.title as string,
                content: formJson.content as string,
                status: status,
                
              };

              addNote(newNote);
              handleClose();
            },
          },
        }}
      >
        {/* All the text inputs in popup */}
        <DialogTitle>{t("Add new note")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t("Add note")}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label={t("Title")}
            name='title'
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            label={t("Content")}
            name='content'
            fullWidth
            variant="standard"
          />
          <Box sx={{ maxWidth: 120}}>
          <FormControl fullWidth>
            {/* Selector in popup
                Uses MUI also
               */}
        <InputLabel id="demo-simple-select-label">{t("Status")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label={t("Status")}
          onChange={handleChange}
        >
          {/* Check if there is any columns on user.
               If yes renders them in selector
               If not renders No columns available*/}
          {columns.length > 0 ? (
            columns.map((column: IColumn) => (
              <MenuItem key={column._id} value={column.name}> {column.name} </MenuItem>
              ))) : (
              <MenuItem disabled>No columns available</MenuItem>
          )}
        </Select>
      </FormControl>
      </Box>
        </DialogContent>
        <DialogActions>
          {/* Button to cancel, calls handleClose */}
          <Button onClick={handleClose}>Cancel</Button>
          {/* And submit, calls the form submit */}
          <Button type="submit">{t("Add")}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PopUp