import './App.css';
import BottomNav from './components/BottomNav';
import { Route, Routes } from 'react-router-dom';
import HabitDetails from './components/HabitDetails';
import HomePage from './components/HomePage';
import * as React from "react";
import { Habit } from './classes/classHabit';
import { LinkedList } from './classes/LinkedList';
import ProfilePage from './components/ProfilePage';

let id = 0;

function dataFetcher(path, method, body) {
  const url = window.location.protocol + '//' + window.location.hostname + '/habit-tracker' + path;

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: body ? JSON.stringify(body) : null
  }

  return fetch(url, options);
}

function App() {

  const habitInitState = (payload) => {
    return payload;
  }

  const habitInitialState = new LinkedList();

  const habitReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        const addHabit = new Habit(id, action.name, action.frequency);
        state.add(addHabit);
        // console.log(state);
        id++;
        dataFetcher('/api/habits', 'POST', addHabit)
          .then(res => res.json())
          .then(res => console.log(res));
        return state;

      case 'edit':
        const ePrevHabit = state.findElementById(action.habitId);
        const editHabit = new Habit(ePrevHabit.id, action.name, action.frequency, ePrevHabit.startDate, ePrevHabit.days);
        state.replaceElement(ePrevHabit, editHabit);
        dataFetcher('/api/habits', 'PUT', editHabit)
          .then(res => res.json())
          .then(res => console.log(res));
        return state;

      case 'markToday':
        const mPrevHabit = state.findElementById(action.habitId);
        mPrevHabit.markTodayComplete();
        const markHabit = new Habit(mPrevHabit.id, mPrevHabit.title, mPrevHabit.frequency, mPrevHabit.startDate, mPrevHabit.days);
        state.replaceElement(mPrevHabit, markHabit);
        dataFetcher('/api/habits', 'PUT', markHabit)
          .then(res => res.json())
          .then(res => console.log(res));
        return state;

      case 'delete':
        const dPrevHabit = state.findElementById(action.habitId);
        state.removeElement(dPrevHabit);
        dataFetcher('/api/habits', 'DELETE', dPrevHabit)
          .then(res => res.json())
          .then(res => console.log(res));
        return state;

      case 'init':
        return habitInitState(action.payload);
    }
  }

  // All habit Data to be contained at App level.
  const [habits, habitsDispatch] = React.useReducer(habitReducer, habitInitialState, habitInitState);
  const [loaded, setLoaded] = React.useState(false);

  // At app startup fetch the users habits.
  React.useEffect(() => {
    dataFetcher('/api/habits', 'GET')
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      const habitList = new LinkedList();
      res.map((habit) => {
        const tempHabit = new Habit(habit.habitId, habit.title, habit.frequency, habit.startDate, habit.days);
        habitList.add(tempHabit);
      });
      // Set id of next created habit.
      id = res[res.length - 1].habitId + 1;
      habitsDispatch({ type: 'init', payload: habitList });
      setLoaded(true);
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage habits={habits} habitsDispatch={habitsDispatch} />} />    
        <Route path='habit/:id' element={<HabitDetails habits={habits} habitsDispatch={habitsDispatch} loaded={loaded} /> } />
        <Route path='profile' element={<ProfilePage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
