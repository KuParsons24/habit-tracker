import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography, Checkbox } from "@mui/material";
import * as React from "react";

export default function AddHabit({ open, setOpen, habitsDispatch }) {
  const [frequency, setFrequency] = React.useState([true, true, true, true, true, true, true]);
  const [name, setName] = React.useState('');

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
 

  const handleClose = () => {
    setOpen(false);
    setFrequency([true, true, true, true, true, true, true]);
    setName('');
  };

  const handleCheck = (e) => {
    setFrequency((prev) => {
      if (prev[e.target.id] === false){
        prev[e.target.id] = true;
      } else {
        prev[e.target.id] = false;
      }
      return prev;
    })
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    habitsDispatch({
      type: 'add',
      name: name,
      frequency: frequency,
    });
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add a habit</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
          </DialogContentText> */}
          <Grid container spacing={2} >
            <Grid item xs={12} >
              <form id="title" autoComplete="off" onSubmit={handleAdd}>
                <TextField
                  autoFocus
                  autoComplete='off'
                  required
                  margin="dense"
                  id="name"
                  label="Name"
                  type='text'
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={handleNameChange}
                />
              </form>
            </Grid>
            <Grid item xs={12} >
              <Typography variant='subtitle1' fontWeight='bold' >Frequency</Typography>
            </Grid>
            <Grid container item justifyContent='center' xs={12} >
              <Stack spacing={2.5} direction='row' alignItems='center' justifyContent='flex-end' >
                {days.map((day, i) => <Typography key={i} variant='body2' component='div' width='24px' align='center' >{day}</Typography>)}
              </Stack>
            </Grid>
            <Grid container item justifyContent='center' xs={12} >
              <Stack spacing={0.25} direction='row' alignItems='center' justifyContent='flex-end' >
                {days.map((day, i) => <Checkbox key={i} id={`${i}`} defaultChecked onChange={handleCheck} />)}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form='title' >Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}