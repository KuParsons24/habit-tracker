import logo from './logo.svg';
import './App.css';
import BottomNav from './components/BottomNav';
import NavBar from './components/NavBar';
import { Toolbar } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HabitDetails from './components/HabitDetails';
import HomePage from './components/HomePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />    
          <Route path='habit/:id' element={<HabitDetails /> } />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
