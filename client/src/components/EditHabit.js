import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography, Checkbox } from "@mui/material";
import * as React from "react";

export default function EditHabit({ open, setOpen, habit, habitsDispatch }) {
  const [frequency, setFrequency] = React.useState(habit.frequency);
  const [name, setName] = React.useState(habit.title);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
 

  const handleCancel = () => {
    setFrequency(habit.frequency);
    setName(habit.title);
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = (e) => {
    setFrequency((prev) => {
      const arr = [...prev];
      if (prev[e.target.id] === false){
        arr[e.target.id] = true;
      } else {
        arr[e.target.id] = false;
      }
      return arr;
    })
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    habitsDispatch({
      type: 'edit',
      name: name,
      frequency: frequency,
      habitId: habit.id,
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
              <form id="editTitle" autoComplete="off" onSubmit={handleEdit}>
                <TextField
                  autoFocus
                  required
                  autoComplete='off'
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
                {days.map((day, i) => <Checkbox key={i} id={`${i}`} checked={frequency[i]} onChange={handleCheck} />)}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit" form='editTitle'>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}