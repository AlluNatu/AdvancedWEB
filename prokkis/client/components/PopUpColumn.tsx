import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ************************************************************
// EVERYTHING HERE IS THE SAME AS ON ./POPUP CHECK THERE
// ************************************************************

import { useTranslation } from 'react-i18next';

interface popUpProps {
  addColumn: (column: { name:string}) => void;
}

const PopUpColumn: React.FC<popUpProps> = ({addColumn}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button id='addColumn' variant="outlined" onClick={handleClickOpen}>
        {t("Add Column")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData).entries());
              console.log(formJson);
              
              const newColumn = {
                name: formJson.columnName as string,
              };

              addColumn(newColumn);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>{t("Add new column")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t("Add column")}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="columName"
            label={t("Name")}
            name='columnName'
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button id='addButton' type="submit">{t("Add")}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PopUpColumn