import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Tabs,
  Tab,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TabPanelProps } from "./LoginPage.types";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { Loader } from "../../components";
import { useNavigate } from "react-router";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const {
    loginWithEmail,
    user,
    signUpWithEmail,
    loading,
    loginWithGoogle,
  } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email || !password) {
      console.error("Email and password are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      console.error("Email format is invalid.");
      return;
    }

    if (password.length < 6) {
      console.error("Password should be at least 6 characters long.");
      return;
    }

    try {
      if (tabValue === 0) {
        await loginWithEmail(email, password, () => navigate("/"));
      } else if (tabValue === 1) {
        await signUpWithEmail(email, password, () => setTabValue(0));
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle(() => navigate("/"));
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loader actionLabel="Authenticating..." />}
      <Container component="main" maxWidth="xs" >
        <Box
          position="absolute"
          component="img"
          src="/assets/images/Naruto-Akatsuki-PNG-Transparent-Image.png"
          sx={{
            width: "20rem",
            top: "40%",
            right: "10%",
          }}
        />
        <Box
          position="absolute"
          component="img"
          src="/assets/images/Naruto-Akatsuki-PNG-Transparent-Image.png"
          sx={{
            width: "20rem",
            top: "20%",
            left: "10%",
          }}
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="sign in and sign up tabs"
          >
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                startIcon={<FcGoogle />}
                fullWidth
                variant="outlined"
                onClick={handleGoogleSignIn}
                sx={{ mt: 1, mb: 2 }}
              >
                Sign In with Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="signup-email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="signup-password"
                autoComplete="new-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="new-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Button
                startIcon={<FcGoogle />}
                fullWidth
                variant="outlined"
                onClick={handleGoogleSignIn}
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up with Google
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
