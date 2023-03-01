import React from "react";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { isEmail, isEmpty } from "../../utils/validators";
import Typography from "@mui/material/Typography";
import {
  Button,
  CircularProgress,
  TextField,
  Select,
  Link,
} from "@mui/material";
import Logo from "../../components/Logo";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { signup } from "./api";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [response, setResponse] = useState({});
  const { token } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // access check
  useEffect(() => {
    if (token) {
      if (token.status === 200) {
        router.push({ pathname: "/" });
      }
    }
  });

  useEffect(() => {
    if (response["status"] === 200) {
      router.push({ pathname: "/login" });
    }
    setLoading(false);
  }, [response, router]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    // console.log(data , 'data')

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
      console.log("testx", e, errors);
      return;
    }
    // setErrors({});
    setLoading(true);

    const res = await signup(data.email, data.password);
    console.log("res", res);
    if (res && res.success) {
      router.push({ pathname: "/login" });
      setResponse(res.data);
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
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography color="#546e7a" variant="h6">
            Create new Account
          </Typography>

          <Link component={Button} href="/login">
            already have account?
          </Link>
        </Box>
        <Box>
          <Stack alignItems="stretch" mb={2} spacing={2}>
            <TextField
              type="email"
              label="Email"
              value={data.email}
              onChange={handle}
              name="email"
              size={"medium"}
              margin="dense"
              error={errors.email}
              helperText={errors.email}
              fullWidth
            />
            <TextField
              type="password"
              label="Password"
              value={data.password}
              onChange={handle}
              name="password"
              size={"medium"}
              margin="dense"
              error={errors.password}
              helperText={errors.password}
              fullWidth
            />
          </Stack>

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

          <Stack spacing={1}>
            <Button
              startIcon={loading ? <CircularProgress size={14} /> : undefined}
              disabled={loading}
              type="submit"
              variant="contained"
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
              disableElevation
            >
              Create Account
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
