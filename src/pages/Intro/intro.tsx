import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import onLogin from "../../main/store/stores/user/login.store.on-login"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useGetUser from "../../main/hooks/useGetUser";


const Intro: FC = () => {

  const theme = createTheme({
    palette: {
      background: {
        default: "#e4f0e2"
      }
    }
  })


  const [email, setemail] = useState(null)
  const [password, setPassword] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = () => {
    dispatch(onLogin({ email, password }));
    if (user) {
      console.log(user.isDoctor);

      if (user.isDoctor) {
        navigate('/dashboard')
      } else {
        navigate('/dashboard-user')
      }
    }
  }

  const handleButtonClick = () => {
    navigate("/Register", { replace: true });
  }

  const user = useGetUser()


  useEffect(() => {

  }, [user])



  return (
    <ThemeProvider theme={theme} >
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
          <Box >
            <TextField
              onChange={(e) => setemail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button onClick={() => {
              handleSubmit()
              if (handleSubmit) {
                // notify()
              }
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => { handleButtonClick() }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Intro;
