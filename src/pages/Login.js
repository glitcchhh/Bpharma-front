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
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { setUser, setToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { saveLogin, loading } = useLogin();

  // Clear token on load
  useEffect(() => {
    setToken("");
    sessionStorage.removeItem("site");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
  }, [setToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const remember = data.get("remember-me");

    const loginData = {
      email: data.get("emp_code"),
      password: data.get("user_password"),
    };

    try {
      const response = await saveLogin(loginData);

      if (response.status !== "OK") {
        setError({ message: response.message || "Login failed" });
        return;
      }

      const user = response.data.userData;
      const auth_token = response.data.auth_token;

      setUser(user);
      setToken(auth_token);

      if (remember) {
        localStorage.setItem("site", auth_token);
      } else {
        sessionStorage.setItem("site", auth_token);
      }

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/Product/claim");  // ✅ goes to Claim.js page
 // ✅ Navigate after successful login
    } catch (err) {
      console.error("Login error:", err);
      setError({ message: "Server error. Please try again." });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      {/* Left image */}
      <Grid item xs={false} sm={6} md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ height: "100%" }}>
          <img src={`${process.env.PUBLIC_URL}/login.png`} alt="Login" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      </Grid>
      {/* Right form */}
      <Grid item xs={12} sm={6} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: { xs: 3, sm: 6 } }}>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ height: "30px", objectFit: "contain", marginBottom: "20px" }} />
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {error?.message && <Typography color="error" variant="body2" sx={{ mb: 2 }}>{error.message}</Typography>}

            <TextField margin="normal" required fullWidth id="emp_code" label="Email Address" name="emp_code" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth id="user_password" name="user_password" label="Password" type="password" autoComplete="current-password" />

            <FormControlLabel control={<Checkbox name="remember-me" value={true} color="primary" />} label="Remember me" />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <>Please wait <CircularProgress size={14} sx={{ color: "white", ml: 1 }} /></> : "Sign In"}
            </Button>

            <Grid container>
              <Grid item xs={6}><Link href="/forgot-password" variant="body2">Forgot password?</Link></Grid>
              <Grid item xs={6} textAlign="right"><Link href="/sign-up" variant="body2">Don't have an account? Sign Up</Link></Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
