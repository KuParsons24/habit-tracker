import { CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HabitBar({ habit, id }) {
  const [progress, setProgress] = React.useState(0);
  let navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/habit/${id}`);
  }

  // Sets the progress bar on the left side of the habit container.
  const calcProgress = () => {
    let week = habit.getWeekData();
    let logged = 0;
    let active = 0;
    for (let day in week) {
      if (week[day] === 1) {
        active++;
      } else if (week[day] === 2){
        logged++;
        active++;
      }
    }
    setProgress((logged/active)*100);
  }

  React.useEffect(calcProgress, [habit]);

  return(
    <Paper onClick={clickHandler} elevation={2} sx={{ width: '100%' }} >
      <Grid container alignItems='center' padding='10px' marginTop='5px'>
        <Grid item xs >
          <Stack spacing={2} direction='row' alignItems='center' >
            <CircularProgress key='progress' size={30} variant='determinate' value={progress} />
            <Typography key='title' variant='body1' sx={{ overflowWrap: 'break-word', hyphens: 'auto' }} >{habit.title}</Typography>
          </Stack>
        </Grid>
        <Grid item xs >
          <Stack spacing={0.25} direction='row' alignItems='center' justifyContent='flex-end' >
            {habit.getWeekData().map((day, i) => {
              switch (day) {
                case 0:
                  return <CloseIcon key={i} sx={{ height: '10px', color: 'lightgray' }} />;
                case 1:
                  return <CircleIcon key={i} sx={{ height: '10px', color: 'lightgray' }} />;
                case 2:
                  return <CheckIcon key={i} sx={{ height: '10px' }} />;
                default:
                  return <CloseIcon key={i} sx={{ height: '10px', color: 'lightgray' }} />;
              };
            })}
          </Stack>  
        </Grid>        
      </Grid>
    </Paper>
  );
};