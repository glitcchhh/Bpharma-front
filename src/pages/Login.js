import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  TextField,
  Link,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../contexts/AuthProvider";
import { useLogin } from "../hooks/useLogin";

const names = ["emp_code", "user_password"];

export default function Login() {
  const { setUser, setToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { saveLogin } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginData = {
      [names[0]]: data.get(names[0]),
      [names[1]]: data.get(names[1]),
    };

    try {
      const response = await saveLogin(loginData);
      console.log({ response });

      if (response.data.status !== "OK") return;
      const user = response.data.data.userData;
      const auth_token = response.data.data.auth_token;

      setUser(user);
      setToken(auth_token);
      sessionStorage.setItem("site", auth_token);

      navigate("/dashboard");
      return;
    } catch (error) {
      const errorMessage = error.response.data.error.message;
      const email = errorMessage.find(({ field }) => field == names[0]);
      const password = errorMessage.find(({ field }) => field == names[1]);

      setError(() => {
        return {
          email,
          password,
        };
      });
      return;
    }
  };

  const mailError = error?.email;
  const passwordError = error?.password;

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={false}
        lg={6}
        sx={{
          position: "relative",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          overflow: "hidden",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/login.png`}
          alt="Login"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // paddingTop: "35%",
            paddingBottom: 6,
            paddingX: {
              xs: 2,
              sm: 16,
              md: 16,
              lg: 16,
              xl: 16,
            },

            paddingY: {
              xs: "40%",
              sm: "40%",
              md: 6,
              lg: 6,
              xl: 6,
            },
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="BBMS Logo"
            style={{ height: "30px", objectFit: "contain" }}
          />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit} // Use handleSubmit on form submission
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id={names[0]}
              label="Email Address"
              name={names[0]}
              autoComplete={names[0]}
              autoFocus
              error={!!mailError?.field}
              helperText={mailError?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name={names[1]}
              label="password"
              type={names[1]}
              id={names[1]}
              autoComplete="current-password"
              error={!!passwordError?.field}
              helperText={passwordError?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit" // This button triggers the form submit event
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid
              container
              marginTop={{
                xs: 3,
                sm: 0,
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                textAlign={{
                  xs: "start",
                }}
              >
                <Link href="#" variant="body2">
                  Forgot your password?
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                textAlign={{
                  xs: "start",
                  sm: "end",
                }}
              >
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
