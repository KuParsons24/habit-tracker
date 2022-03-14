import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Typography, Checkbox } from "@mui/material";
import * as React from "react";
import { Habit } from "../classes/classHabit";

export default function EditHabit({ open, setOpen, setHabits, habit, setHabit }) {
  const [frequency, setFrequency] = React.useState(habit.frequency);
  const [name, setName] = React.useState(habit.title);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
 

  const handleCancel = () => {
    setFrequency(habit.frequency);
    setName(habit.title);
    handleClose();
  }

  const handleClose = () => {
    console.log(name);
    console.log(frequency);
    setOpen(false);
    //setFrequency(habit.frequency);
    //setName(habit.title);
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
    //console.log(frequency);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEdit = () => {
    // let days = [[],[],[],[],[],[],[],[],[],[],[],[]];
    // let month = date.getMonth();
    // date.setDate(1);
    // console.log(date.getDate());
    // for(let i = 0; i < date.getDate(); i++){
    //   days[month].push(frequency[date.getDay()]);
    //   date.setDate(date.getDate() + 1);
      // console.log(i % 7);
    // }
    setHabit((prev) => {
      const setHabit = new Habit(prev.id, name, frequency, prev.startDate, prev.days);
      return setHabit;
    });
    setHabits((prev) => {
      const nHabit = new Habit(habit.id, name, frequency, habit.startDate, habit.days);
      prev.replaceElement(habit, nHabit);
      console.log(prev);
      return prev;
    });
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add a habit</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <Grid container spacing={2} >
            <Grid item xs={12} >
              <TextField
                autoFocus
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
                {days.map((day, i) => <Checkbox key={i} id={i} checked={frequency[i]} onChange={handleCheck} />)}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}