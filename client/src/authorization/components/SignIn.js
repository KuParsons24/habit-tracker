import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MessageSnackbar from '../../components/MessageSnackBar';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from "../context/AuthContext";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [resMessage, setResMessage] = React.useState('');
  const { login, authed, isLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('username'),
    //   password: data.get('password'),
    // });
    login(data.get('username'), data.get('password'))
      .then(res => {
        if (res.severity === 'success') {
          navigate('/');
        } else {
          setResMessage(res);
          setSnackbarOpen(true);
        }
      });
    // const auth = async () => {
    //   try {
    //     const res = await axios.get('/authenticate', { auth: { username: data.get('username'), password: data.get('password') } });
    //     console.log(res.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // auth();
  };
  if(!isLoading) {
    if(!authed){
      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
          <MessageSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} severity={resMessage.severity}>
            {resMessage.message}
          </MessageSnackbar>
        </ThemeProvider>
      );
    } else {
      return <Navigate to='/' state={{ from: location }} replace />;
    }
  } else {
    return null;
  }

}