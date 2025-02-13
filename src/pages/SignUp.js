import React, { useContext, useEffect, useState } from "react";
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
import Grid from "@mui/material/Grid2";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../contexts/AuthProvider";
import { useLogin } from "../hooks/useLogin";

const names = ["emp_code", "user_password", "phone"];

export default function SignUp() {
  const { setUser, setToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { saveLogin } = useLogin();

  // when this page is loaded token must be cleared
  useEffect(() => {
    setToken("");
    sessionStorage.removeItem("site");
  }, []);

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
    <Grid
      container
      component="main"
      sx={{
        marginTop: {
          xs: "7em",
          sm: 0,
        },
        padding: 0,
        height: {
          xs: "auto",
          sm: "90vh",
        },
      }}
      sm={12}
    >
      <CssBaseline />
      <Grid
        container
        display={{
          xs: "none",
          md: "block",
        }}
        size={6}
        item
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            paddingBottom: 6,
            paddingX: {
              xs: 2,
              sm: 16,
              md: 16,
              lg: 6,
              xl: 8,
            },

            paddingY: {
              md: 6,
              lg: 6,
              xl: 6,
            },
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/login.png`}
            alt="Login"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "scale-down",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        square
        sx={{
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        container
        size={{
          xs: 12,
          sm: 12,
          md: 6,
        }}
      >
        <Box
          sx={{
            paddingBottom: 6,
            paddingX: {
              xs: 2,
              sm: 4,
              md: 8,
              lg: 12,
              xl: 16,
            },

            paddingY: 6,
          }}
          width={{
            xs: "100%",
            sm: "80%",
            md: "100%",
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
              type={"password"}
              id={names[1]}
              autoComplete={names[1]}
              error={!!passwordError?.field}
              helperText={passwordError?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name={names[2]}
              label="phone"
              type={"tel"}
              id={names[2]}
              autoComplete={names[2]}
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
              Sign Up
            </Button>
            <Grid
              container
              size={12}
              marginTop={{
                xs: 3,
                sm: 0,
              }}
            >
              <Grid
                item
                size={{
                  xs: 12,
                  sm: 4,
                  md: 12,
                  lg: 4,
                }}
                textAlign={{
                  xs: "start",
                }}
                marginTop="5px"
              >
                <Link href="/forgot-password" variant="body2">
                  Forgot your password?
                </Link>
              </Grid>
              <Grid
                item
                marginTop="5px"
                size={{
                  xs: 12,
                  sm: 8,
                  md: 12,
                  lg: 8,
                }}
              >
                <Link
                  href="/login"
                  variant="body2"
                  sx={{
                    float: {
                      xs: "left",
                      sm: "right",
                      md: "left",
                      lg: "right",
                    },
                  }}
                >
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
