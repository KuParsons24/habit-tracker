import { Paper } from "@mui/material";
import * as React from "react";
import Calendar from "react-calendar";
import '../Calendar.css';

export default function BasicCalendar ({ calDate, habit }) {

  const setTileClassName = ({date}) => {
    let calenderDaysSinceStart = habit.calcDaysSinceStart(date);
    // check frequency
    if (habit.frequency[date.getDay()] === true){
      if (habit.days.length > calenderDaysSinceStart && calenderDaysSinceStart >= 0){
        if (habit.days[calenderDaysSinceStart] === true){
          return 'checked';
        } else {
          return 'unchecked';
        }
      }
    } else {
      return 'unchecked';
    }
  }

  return(
    <Paper elevation={4}>
      <Calendar calendarType="US" 
      showNeighboringMonth={false} 
      showNavigation={false} 
      tileDisabled={() => true} 
      tileClassName={setTileClassName}   
      activeStartDate={calDate}
      />
    </Paper>
  );
}