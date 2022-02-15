import { Paper } from "@mui/material";
import * as React from "react";
import Calendar from "react-calendar";
import '../Calendar.css';

export default function BasicCalendar ({ calDate, habit }) {

  const setTileClassName = ({date}) => {
    let calenderDaysSinceStart = habit.calcDaysSinceStart(date);
    // console.log(`days since start: ${calenderDaysSinceStart}`)
    // console.log(`Date: ${date}`)
    // console.log(`habit start Date: ${habit.startDate}`);
    // check frequency
    if (habit.frequency[date.getDay()] === true){
      if (habit.days.length > calenderDaysSinceStart && calenderDaysSinceStart >= 0){
        // console.log('is valid length');
        if (habit.days[calenderDaysSinceStart] === true){
          // console.log(date.getDate());
          // console.log('is checked');
          return 'checked';
        } else {
          // console.log(date.getDate());
          // console.log('is unchecked');
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