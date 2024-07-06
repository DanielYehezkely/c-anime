import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { ErrorComp } from "..";
import { AuthFormProps } from "./AuthForm.types";

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  handleSubmit,
  handleGoogleSignIn,
  handleResetDialogOpen,
  errors,
  error,
}) => {
  const isSignUp = formType === "SignUp";

  return (
    <>
      <Typography component="h1" variant="h5">
        {isSignUp ? "Sign Up" : "Sign In"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          autoComplete={isSignUp ? "new-password" : "current-password"}
          error={!!errors.password}
          helperText={errors.password}
        />
        {isSignUp && (
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
        )}
        {!isSignUp && (
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        )}
        {error && <ErrorComp message={error} />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          startIcon={<FcGoogle />}
          fullWidth
          variant="outlined"
          onClick={handleGoogleSignIn}
          sx={{ mt: 1, mb: 2 }}
        >
          {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
        </Button>
        <Grid container>
          {!isSignUp && (
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handleResetDialogOpen}>
                Forgot password?
              </Link>
            </Grid>
          )}
          <Grid item>
            <Link href="#" variant="body2">
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AuthForm;
