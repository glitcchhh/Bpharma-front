import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  TextField,
  Link,
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api"; // Your axios instance

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(event.currentTarget);

    const signupData = {
      email: data.get("emp_code"),       // map emp_code field to email
      password: data.get("user_password"),
      phone: data.get("phone") || null,
    };

    try {
      const response = await Api.post("/signup", signupData);

      if (response.data?.message) {
        // Signup successful
        navigate("/login"); // redirect to login page
      } else {
        setError({ message: "Signup failed. Please try again." });
      }
    } catch (err) {
      console.error("Signup error:", err);
      const msg =
        err.response?.data?.message || "Server error. Please try again.";
      setError({ message: msg });
    }

    setLoading(false);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      {/* Left image */}
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{ display: { xs: "none", md: "block" }, position: "relative" }}
      >
        <Box sx={{ height: "100%", position: "relative" }}>
          <img
            src={`${process.env.PUBLIC_URL}/login.png`}
            alt="Sign Up"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Grid>

      {/* Right form */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        component={Paper}
        elevation={0}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 6 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="BBMS Logo"
            style={{ height: "30px", objectFit: "contain", marginBottom: "20px" }}
          />
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {error?.message && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error.message}
              </Typography>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="emp_code"
              label="Email Address"
              name="emp_code"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="user_password"
              label="Password"
              type="password"
              id="user_password"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="Phone"
              type="tel"
              id="phone"
              autoComplete="tel"
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
              disabled={loading}
            >
              {loading ? (
                <>
                  Please wait
                  <CircularProgress
                    size={14}
                    sx={{ color: "white", ml: 1 }}
                  />
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
