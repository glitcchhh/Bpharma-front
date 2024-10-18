import React from "react";
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
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Add your form validation or login logic here
    console.log({ email, password });

    // After successful login, navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 16,
            mx: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              type="submit" // This button triggers the form submit event
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot your password?
                </Link>
              </Grid>
              <Grid item>
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
