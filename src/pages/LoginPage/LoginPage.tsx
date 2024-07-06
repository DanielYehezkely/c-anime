import React, { useState } from "react";

import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { useAuthForm } from "../../services/firebase/useAuthForm";
import { Loader } from "../../components";
import { a11yProps, AnimeImage, ControlTabsSection, PasswordResetDialog, SignIn, SignUp, TabPanel } from "./components";

const theme = createTheme();

const LoginPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const {
    errors,
    error,
    loading,
    handleSubmit,
    handleGoogleSignIn,
    setErrors,
  } = useAuthForm({ tabValue, setTabValue });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setErrors({ email: "", password: "", confirmPassword: "" });
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
        <AnimeImage />
        <CssBaseline />
        <ControlTabsSection
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          a11yProps={a11yProps}
        >
          <TabPanel value={tabValue} index={0}>
            <SignIn
              handleSubmit={handleSubmit}
              handleGoogleSignIn={handleGoogleSignIn}
              handleResetDialogOpen={handleResetDialogOpen}
              errors={errors}
              error={error}
              setTabValue={setTabValue}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SignUp
              handleSubmit={handleSubmit}
              handleGoogleSignIn={handleGoogleSignIn}
              errors={errors}
              error={error}
              setTabValue={setTabValue}
            />
          </TabPanel>
        </ControlTabsSection>
        <PasswordResetDialog
          open={openResetDialog}
          handleClose={handleResetDialogClose}
        />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
