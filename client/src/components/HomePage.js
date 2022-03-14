import * as React from 'react';
import { Container, Stack, Toolbar, Typography } from "@mui/material";
import HabitBar from "./HabitBar";
import NavBar from './NavBar';
import AddHabit from './AddHabit';

export default function HomePage({ habits, setHabits }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const listHabits = () => {
    let curr = habits.head;
    let array = [];
    // walk down the habits list and create an array of components.
    while(curr){
      array.push(<HabitBar key={array.length} habit={curr.element} id={curr.element.id} />);
      curr = curr.next;
    }
    return array;
  }

  return (
    <Container id='homepage' maxWidth='md'>
      <NavBar title={'Habits'} setOpenDialog={setOpenDialog} addButton />
      <Toolbar />
      <Stack spacing={0.25} direction='row' alignItems='center' justifyContent='flex-end' padding='10px' >
        {days.map((day, i) => <Typography key={i} variant='body2' component='div' width='24px' align='center' >{day}</Typography>)}
      </Stack>
      { habits.isEmpty() ? <Typography>There are no habits to display! Create a new habit to get started.</Typography> : null }
      { listHabits() }
      <Toolbar />
      <AddHabit open={openDialog} setOpen={setOpenDialog} setHabits={setHabits} />
    </Container>
  );
}