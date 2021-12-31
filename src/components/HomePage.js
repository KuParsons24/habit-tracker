import * as React from 'react';
import { Stack, Toolbar, Typography } from "@mui/material";
import Habit from "./Habit";
import NavBar from './NavBar';

export default function HomePage() {

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const habits = [
    {
      title: 'Habit 1',
      days: [0, 1, 2, 0, 2, 1, 0],
    },
    {
      title: 'Habit 2',
      days: [2, 1, 1, 0, 1, 1, 0],
    },
  ];

  return (
    <div id='homepage'>
      <NavBar title={'Habits'} />
      <Toolbar />
      <Stack spacing={0.25} direction='row' alignItems='center' justifyContent='flex-end' padding='10px' >
        {days.map((day, i) => <Typography key={i} variant='body2' component='div' width='24px' align='center' >{day}</Typography>)}
      </Stack>
      { habits.map((habit, i) => <Habit key={i} id={i} title={habit.title} days={habit.days} />) }
    </div>
  );
}