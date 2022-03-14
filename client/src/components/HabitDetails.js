import { Button, Container, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasicCalendar from './BasicCalendar';
import NavBar from './NavBar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import reactDom from 'react-dom';
import { Habit } from '../classes/classHabit';
import EditHabit from './EditHabit';

export default function HabitDetails ({ habits, setHabits }) {
  const [date, setDate] = React.useState(new Date());
  const [editOpen, setEditOpen] = React.useState(false);
  let { id } = useParams();
  id = parseInt(id);
  const [habit, setHabit] = React.useState(habits.findElementById(id));
  const navigate = useNavigate();

  //let date = new Date();
  const checkDate = () => {
    console.log(date.getMonth());
    date.setMonth(date.getMonth() + 1);
    setDate(new Date(date));
  };

  const handleForwardArrowClick = () => {
    date.setMonth(date.getMonth() + 1);
    setDate(new Date(date));
  }

  const handleBackwardArrowClick = () => {
    date.setMonth(date.getMonth() - 1);
    setDate(new Date(date));
  }

  const handleMarkTodayClick = () => {
    setHabit((prev) => {
      const setHabit = new Habit(prev.id, prev.title, prev.frequency, prev.startDate, prev.days);
      setHabit.markTodayComplete();
      return setHabit;
    });
  }

  const handleDeleteClick = () => {
    setHabits((prev) => {
      prev.removeElement(habit);
      return prev;
    });
    navigate(-1);
  }

  const handleEditClick = () => {
    setEditOpen(true);
  }

  return(
    <Container id={'HabitDetails'} maxWidth='sm'>
      <NavBar title={habit.title} backButton />
      <Toolbar />
      <Grid container marginTop='10px' spacing={1}>
      <Grid item container xs={3} justifyContent='center'>
          <IconButton id='backward' onClick={handleBackwardArrowClick}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid item container xs={6} justifyContent='center' alignContent='center' >
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              views={['month', 'year']}
              // label="Year and Month"
              minDate={new Date('2012-03-01')}
              maxDate={new Date('2023-06-01')}
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} helperText={null} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item container xs={3} justifyContent='center' >
          <IconButton onClick={handleForwardArrowClick} >
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
        <Grid container item xs={12} justifyContent='center' >
          <BasicCalendar calDate={date} habit={habit} />
        </Grid>
        <Grid container item xs={12} justifyContent='center'>
          <Button variant='contained' onClick={handleMarkTodayClick} >Mark Today Complete</Button>
        </Grid>
        <Grid container item xs={12} justifyContent='center'>
          <Button variant='contained' onClick={handleDeleteClick} >Delete Habit!</Button>
        </Grid>
        <Grid container item xs={12} justifyContent='center'>
          <Button variant='contained' onClick={handleEditClick} >Edit Habit</Button>
        </Grid>
      </Grid>
      <Toolbar />
      <EditHabit habit={habit} open={editOpen} setOpen={setEditOpen} setHabits={setHabits} setHabit={setHabit} />
    </Container>
  );
}