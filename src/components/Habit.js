import { CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// prop: days: 0 = non active day, 1 = active but not logged, 2 = logged
// prop: tite = habit title
export default function Habit({ title, days, id }) {
  const [progress, setProgress] = React.useState(0);
  let navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/habit/${id}`);
  }

  const calcProgress = () => {
    let logged = 0;
    let active = 0;
    for (const day in days) {
      if (days[day] == 1) {
        active++;
      }
      if (days[day] == 2) {
        active++;
        logged++;
      }
    }
    setProgress((logged/active)*100);
  }

  React.useEffect(calcProgress, []);

  return(
    <Paper onClick={clickHandler} elevation={2} sx={{ width: '100%' }} >
      <Grid container alignItems='center' padding='10px' marginTop='5px'>
        <Grid item xs >
          <Stack spacing={2} direction='row' alignItems='center' >
            <CircularProgress key='progress' size={30} variant='determinate' value={progress} />
            <Typography key='title' variant='body1' >{title}</Typography>
          </Stack>
        </Grid>
        <Grid item xs >
          <Stack spacing={0.25} direction='row' alignItems='center' justifyContent='flex-end' >
            {days.map((day, i) => {
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