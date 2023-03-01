import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { isEmail, isEmpty } from "../../utils/validators";
import { login } from "./api";
import Logo from "../../components/Logo";
import { Button, Container, TextField, Typography, Link } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
// import { buttonClasses } from "@mui/material/Button";
const LoginForm = () => {
  const router = useRouter();
  const [redirect, doRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      router.push({ pathname: "/" });
    }
  }, [redirect]);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (isEmpty(data.email)) {
      errors.email = "Email is required";
    } else if (!isEmail(data.email)) {
      errors.email = "Email is not valid";
    }

    if (isEmpty(data.password)) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    setErrors({});

    setLoading(true);
    const res = await login(data.email, data.password);
    if (res.success) {
      localStorage.setItem("token", res.data.token);
      setResponse(res.data);
      doRedirect(true);
    } else {
      console.log("errors", res.data);
      setErrors(res.data);
      setLoading(false);
    }
  };

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        m: 2,
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <Box width={500} p={1} m={1}>
        <Stack m={2}>
          {/* <Logo mb={1} /> */}
          <Typography color="#546e7a" variant="h6">
            Sign in to your account
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField
            type="email"
            value={data.email}
            onChange={handle}
            label="Email"
            size="medium"
            name="email"
            margin="dense"
            fullWidth
            error={errors.email}
            helperText={errors.email}
          />

          <TextField
            type="password"
            label="Password"
            size="medium"
            value={data.password}
            onChange={handle}
            name="password"
            margin="dense"
            error={errors.password}
            helperText={errors.password}
            fullWidth
          />

          {errors && errors["status"] === 400 && (
            <Box
              sx={{
                padding: 1.5,
                borderRadius: 1,
                color: "#dc2626",
                border: "solid 1px #fecaca",
                marginBottom: 2,
                fontSize: 14,
                background: "#fef2f2",
              }}
            >
              {errors["error"]}
            </Box>
          )}
        </Stack>
        <Stack m={2}>
          <Button
            sx={{
              margin: 1,
              borderRadius: 50,
              background: "#FA6F6F",
              "&:hover": {
                color: "#fff",
                background: "#fed3cd",
              },
            }}
            startIcon={loading ? <CircularProgress size={14} /> : undefined}
            disabled={loading}
            type="submit"
            variant="contained"
            disableElevation
            fullWidth
          >
            Sign In
          </Button>

          <Link
            component={Button}
            variant="contained"
            underline="none"
            sx={{
              borderRadius: 50,
              color: "#fff",
              background: "#FA6F6F",
              margin: 1,
              "&:hover": {
                color: "#fff",
                background: "#fed3cd",
                textDecoration: "underline none",
              },
            }}
            href="/signup"
            disableElevation
            fullWidth
          >
            Create Account
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginForm;
