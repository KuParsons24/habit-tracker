import logo from './logo.svg';
import './App.css';
import BottomNav from './components/BottomNav';
import NavBar from './components/NavBar';
import { Toolbar } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HabitDetails from './components/HabitDetails';
import HomePage from './components/HomePage';
import * as React from "react";
import { Habit } from './classes/classHabit';
import { LinkedList } from './classes/LinkedList';
import RequireAuth from './authorization/components/RequireAuth';
import ProfilePage from './components/ProfilePage';

function App() {

  // All habit Data to be contained at App level.
  const [habits, setHabits] = React.useState(new LinkedList());

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage habits={habits} setHabits={setHabits} />} />    
        <Route path='habit/:id' element={<HabitDetails habits={habits} setHabits={setHabits} /> } />
        <Route path='profile' element={<ProfilePage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
