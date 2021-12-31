import { Paper } from "@mui/material";
import * as React from "react";
import Calendar from "react-calendar";
import '../Calendar.css';

export default function BasicCalendar () {

  return(
    <Paper elevation={4}>
      <Calendar calendarType="US" 
      showNeighboringMonth={false} 
      showNavigation={false} 
      tileDisabled={() => true} 
      tileClassName={({date}) => date.getDate() === 2 ? 'checked' : null}   
      />
    </Paper>
  );
}