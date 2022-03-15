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

let id = 0;

function App() {

  const habitInitialState = new LinkedList();

  const habitReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        const addHabit = new Habit(id, action.name, action.frequency);
        state.add(addHabit);
        console.log(state);
        id++;
        return state;

      case 'edit':
        const ePrevHabit = state.findElementById(action.habitId);
        const editHabit = new Habit(ePrevHabit.id, action.name, action.frequency, ePrevHabit.startDate, ePrevHabit.days);
        state.replaceElement(ePrevHabit, editHabit);
        return state;

      case 'markToday':
        const mPrevHabit = state.findElementById(action.habitId);
        mPrevHabit.markTodayComplete();
        const markHabit = new Habit(mPrevHabit.id, mPrevHabit.title, mPrevHabit.frequency, mPrevHabit.startDate, mPrevHabit.days);
        state.replaceElement(mPrevHabit, markHabit);
        return state;

      case 'delete':
        const dPrevHabit = state.findElementById(action.habitId);
        state.removeElement(dPrevHabit);
        return state;
    }
  }

  // All habit Data to be contained at App level.
  const [habits, setHabits] = React.useState(new LinkedList());
  const [habitss, habitsDispatch] = React.useReducer(habitReducer, habitInitialState);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage habits={habitss} setHabits={setHabits} habitsDispatch={habitsDispatch} />} />    
        <Route path='habit/:id' element={<HabitDetails habits={habitss} setHabits={setHabits} habitsDispatch={habitsDispatch} /> } />
        <Route path='profile' element={<ProfilePage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
