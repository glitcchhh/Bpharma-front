import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  TextField,
  Link,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Use stable Grid
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useLogin } from "../hooks/useLogin";

const fieldNames = ["emp_code", "user_password"];

export default function Login() {
  const { setUser, setToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { saveLogin, loading } = useLogin();

  // Clear token on page load
  useEffect(() => {
    setToken("");
    sessionStorage.removeItem("site");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
  }, [setToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const data = new FormData(event.currentTarget);
    const remember = data.get("remember-me");

    const loginData = {
      email: data.get(fieldNames[0]), // map emp_code to email
      password: data.get(fieldNames[1]), // map user_password to password
    };

    try {
      const response = await saveLogin(loginData);
      console.log({ response });

      // Match backend response
      const user = response.user;
      const auth_token = response.auth_token || "dummy-token"; // placeholder if token not returned

      if (!user) {
        return navigate("/error");
      }

      user.user = "super-admin"; // optional

      setUser(user);
      setToken(auth_token);

      if (remember) {
        localStorage.setItem("site", auth_token);
      } else {
        sessionStorage.setItem("site", auth_token);
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.error?.message || [];
      const email = errorMessage.find(({ field }) => field === fieldNames[0]);
      const password = errorMessage.find(({ field }) => field === fieldNames[1]);
      setError({ email, password });
    }
  };

  const mailError = error?.email;
  const passwordError = error?.password;

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
            alt="Login"
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
              id={fieldNames[0]}
              label="Email Address"
              name={fieldNames[0]}
              autoComplete={fieldNames[0]}
              autoFocus
              error={!!mailError?.field}
              helperText={mailError?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name={fieldNames[1]}
              label="Password"
              type="password"
              id={fieldNames[1]}
              autoComplete={fieldNames[1]}
              error={!!passwordError?.field}
              helperText={passwordError?.message}
            />

            <FormControlLabel
              control={<Checkbox name="remember-me" value="true" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
                "Sign In"
              )}
            </Button>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Link href="/sign-up" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
