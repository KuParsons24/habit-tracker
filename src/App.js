import logo from './logo.svg';
import './App.css';
import BottomNav from './components/BottomNav';
import NavBar from './components/NavBar';
import Habit from './components/Habit';
import { Stack, Toolbar, Typography } from '@mui/material';

const days=['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

function App() {
  return (
    <div>
      <NavBar />
      <Toolbar />
      <Stack spacing={0.25} direction='row' alignItems='center' justifyContent='flex-end' padding='10px' >
        {days.map((day, i) => <Typography key={i} variant='body2' component='div' width='24px' align='center' >{day}</Typography>)}
      </Stack>
      {habits.map((habit) => <Habit key={habit.title} title={habit.title} days={habit.days} />)}
      <BottomNav />
    </div>
  );
}

export default App;
