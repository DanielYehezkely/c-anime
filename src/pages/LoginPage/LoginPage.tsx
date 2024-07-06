import React, { useState } from "react";
import {
  Avatar,
  CssBaseline,
  Box,
  Tabs,
  Tab,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TabPanelProps } from "./LoginPage.types";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { Loader } from "../../components";
import { useNavigate } from "react-router";
import PasswordResetDialog from "./PasswordReset/PasswordResetDialog";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

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
            <SignIn
              handleSubmit={handleSubmit}
              handleGoogleSignIn={handleGoogleSignIn}
              handleResetDialogOpen={handleResetDialogOpen}
              errors={errors}
              error={error}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SignUp
              handleSubmit={handleSubmit}
              handleGoogleSignIn={handleGoogleSignIn}
              errors={errors}
              error={error}
            />
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
