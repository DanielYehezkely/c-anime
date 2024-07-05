import React, { useState } from "react";
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
import PasswordResetDialog from "./PasswordReset/PasswordResetDialog";

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
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const { loginWithEmail, signUpWithEmail, loading, loginWithGoogle, error } =
    useAuth();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setErrors({ email: "", password: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        if (tabValue === 0) {
          await loginWithEmail(email, password, () => navigate("/"));
        } else if (tabValue === 1) {
          await signUpWithEmail(email, password, () => setTabValue(0));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle(() => navigate("/"));
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleResetDialogOpen = () => {
    setOpenResetDialog(true);
  };

  const handleResetDialogClose = () => {
    setOpenResetDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loader actionLabel="Authenticating..." />}
      <Container component="main" maxWidth="xs">
        <Box
          position="absolute"
          component="img"
          src="/assets/images/pngwing.com.png"
          sx={{
            width: "30rem",
            height: "50rem",
            bottom: "0",
            right: "10%",
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
                error={!!errors.email}
                helperText={errors.email}
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
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
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
                  <Link
                    href="#"
                    variant="body2"
                    onClick={handleResetDialogOpen}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setTabValue(1)}>
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
                error={!!errors.email}
                helperText={errors.email}
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
                error={!!errors.password}
                helperText={errors.password}
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
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
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
        <PasswordResetDialog
          open={openResetDialog}
          handleClose={handleResetDialogClose}
        />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
