import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { BarChart, Description } from "@mui/icons-material";
import { FormLabel, Grid, Stack, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Logo } from "../components/logo";
import dynamic from "next/dynamic";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "./hooks/useAuth";
import { insert, predict } from "../api/insert";
import Alert from "@mui/material/Alert";
import { CoursesForm } from "../components/courses-form";
import { Container } from "@mui/system";

const Chart = dynamic(
  () => import("../components/chart").then((c) => c.Chart),
  {
    ssr: false,
  }
);

const drawerWidth = 240;
const green = "#e8a473";
const ColorButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(green),
  backgroundColor: green,
  "&:hover": {
    backgroundColor: green,
  },
  borderRadius: "50%",
}));

function ResponsiveDrawer(props) {
  const { window, userData,getUserData } = props;
  const [prediction, setPrediction] = React.useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const[score , setScore] = React.useState()
  // const [email, setEmail] = React.useState("");

  const { logout, token } = useAuth();

  const [data, setData] = React.useState({
    financialStatus: "1",
    travellingTime: "1",
    socialMedia: "",
    dailystudingtime: "",
    studyAnytime: "1",
    studyMorning: "1",
    studyNight: "1",
    gender: "1",
    tenthMark: "",
    twelfthMark: "",
    hobbiesCinema: "1",
    hobbiesSports: "1",
    stressLevel: "1",
    pursueCareer: "1",
    Department_B_ISM: "1",
    studyAnytime:"1",
  });


  const onSubmit = async (e) => {
    const res = await insert(data, token);
    const prediction = await predict(data, token);

    if (res.status === 200) setSuccess(true);
    localStorage.setItem("score", prediction.prediction);
    setScore(score)
    setPrediction(prediction.prediction);
    getUserData()
  };

  const nominal = [
    {
      label: "Yes",
      value: "1",
    },
    {
      label: "No",
      value: "0",
    },
  ];

  const departments = [
    {
      label: "Yes",
      value: "1",
    },
    {
      label: "No",
      value: "0",
    },
  ];

  const pursueCareer = [
    {
      label: "100%",
      value: "0",
    },
    {
      label: "75%",
      value: "1",
    },
    {
      label: "50%",
      value: "2",
    },
    {
      label: "25%",
      value: "3",
    },
    {
      label: "0%",
      value: "4",
    },
  ];

  const travellingTime = [
    {
      label: "0 - 30 minute",
      value: "0",
    },
    {
      label: "30 - 60 minute",
      value: "1",
    },
    {
      label: "1 - 1.30 hour",
      value: "2",
    },
    {
      label: "1.30 - 2 hour",
      value: "3",
    },
    {
      label: "2 - 2.30 hour",
      value: "4",
    },
    {
      label: "2.30 - 3 hour",
      value: "5",
    },
    {
      label: "more than 3 hour",
      value: "6",
    },
    {
      label: "More Than 4 hour",
      value: "7",
    },
  ];

  const gender = [
    {
      label: "Male",
      value: "0",
    },
    {
      label: "Female",
      value: "1",
    },
  ];
  const financial = [
    {
      label: "Fabulous",
      value: "0",
    },
    {
      label: "Good",
      value: "1",
    },
    {
      label: "Bad",
      value: "2",
    },
    {
      label: "Awful",
      value: "3",
    },
  ];

  const stress = [
    {
      label: "Fabulous",
      value: "0",
    },
    {
      label: "Good",
      value: "1",
    },
    {
      label: "Bad",
      value: "2",
    },
    {
      label: "Awful",
      value: "3",
    },
  ];

  const navItems = [
    {
      label: "Dashboard",
      link: "",
      icon: DashboardIcon,
    },
    {
      label: "Analytics",
      link: "",
      icon: AnalyticsIcon,
    },
    {
      label: "task list",
      link: "",
      icon: ListAltIcon,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        sx={{
          background: "#e8a473",
        }}
        position="static"
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ mr: 2 }}>
            <Logo />
          </Box>

          <List
            sx={{
              display: "flex",
            }}
          >
            {/* <ListItem>
              <Box
                borderRadius={4}
                sx={{
                  background: "#eaedef",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    color: "black",
                    whiteSpace: "nowrap",
                    mr: 2,
                  }}
                >
                  Create New Task
                </Box>

                <ColorButton size="small">
                  <AddIcon sx={{ color: "#fff" }} />
                </ColorButton>
              </Box>
            </ListItem> */}
            {navItems.map((nav, index) => (
              <ListItem key={nav.label} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <nav.icon />
                  </ListItemIcon>
                  <ListItemText primary={nav.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <Avatar src="/public/person.png" sx={{ width: 32, height: 32 }} />

            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          </Box>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          background: "#f6f7fb",
          fontWeight: "500",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography
              variant="h6"
              sx={{
                color: "#FA6F6F",
                display: "flex",
                alignItems: "center",
                fontWeight: "300",
                fontSize: 24,
                mb: 2,
                pl: 2,
              }}
            >
              <BarChart sx={{ mr: 2 }} />
              Goal Evaluator
            </Typography>
            <Box>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "14px",
                }}
              >
                <Chart userData={userData} chartType={"category"} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#FA6F6F",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                  fontSize: 20,
                  mb: 2,
                  pt: 2,
                }}
              >
                <BarChart sx={{ mr: 2 }} />
                User Inputs Timeseries Chart
              </Typography>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: "14px",
                }}
              >
                <Chart userData={userData} chartType={"Timeseries"} />
              </Box>
            </Box>
{score && 
            <CoursesForm token={token} score={score} />
}
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="h6"
              sx={{
                color: "#FA6F6F",
                display: "flex",
                alignItems: "center",
                fontWeight: "300",
                fontSize: 24,
                mb: 2,
                pl: 2,
              }}
            >
              {/* 11 */}
              <Description sx={{ mr: 1 }} />
              Enter Your Data
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                p: 2,
                m: 1,
                background: "#fff",
                borderRadius: "16px",
              }}
            >
              {/* {success && (
                <Alert sx={{ mb: 2 }} severity="success">
                  User data updated successfully !
                </Alert>
              )} */}

              <Box
                component="form"
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                <Stack spacing={2}>
                  <TextField
                    label="Daily studing time"
                    id="standard-size-small"
                    variant="outlined"
                    type="number"
                    onChange={(event) => {
                      setData({
                        ...data,
                        dailystudingtime: event.target.value,
                      });
                    }}
                    InputProps={{
                      inputProps: { min: 1, max: 6 },
                      endAdornment: (
                        <InputAdornment position="end">
                          1-6 Hours
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    required
                  />

                  <Grid container>
                    <Grid item xs={6}>
                      <TextField
                        label="10th Mark"
                        id="standard-size-small"
                        variant="outlined"
                        type="number"
                        onChange={(event) => {
                          setData({ ...data, tenthMark: event.target.value });
                        }}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        fullWidth
                        required
                        sx={{ pr: 0.5 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="12th Mark"
                        id="standard-size-small"
                        variant="outlined"
                        type="number"
                        sx={{ pl: 0.5 }}
                        onChange={(event) => {
                          setData({ ...data, twelfthMark: event.target.value });
                        }}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Social media & video"
                    id="standard-size-small"
                    variant="outlined"
                    type="number"
                    onChange={(event) => {
                      setData({ ...data, socialMedia: event.target.value });
                    }}
                    InputProps={{
                      inputProps: { min: 1, max: 6 },
                      endAdornment: (
                        <InputAdornment position="end">
                          1-6 Hours
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    required
                  />

                  <TextField
                    label="Travelling Time"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, travellingTime: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {travellingTime.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined-select-Stress Level"
                    select
                    label="Stress Level"
                    onChange={(event) => {
                      setData({ ...data, stressLevel: event.target.value });
                    }}
                    defaultValue="1"
                    required
                  >
                    {stress.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined-select-Financial Status"
                    select
                    label="Financial Status"
                    onChange={(event) => {
                      setData({ ...data, financialStatus: event.target.value });
                    }}
                    defaultValue="1"
                    required
                  >
                    {financial.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Department_B_ISM"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({
                        ...data,
                        Department_B_ISM: event.target.value,
                      });
                    }}
                    fullWidth
                    required
                  >
                    {departments.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Willingness to pursue a career based on their degree "
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, pursueCareer: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {pursueCareer.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Prefer to study in anytime"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, studyAnytime: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {nominal.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Prefer to study in morning"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, studyMorning: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {nominal.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Prefer to study at Night"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, studyNight: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {nominal.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Gender Female"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, gender: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {gender.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Hobbies Video Games"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, videoGames: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {nominal.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="hobbies Cinema"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, hobbiesCinema: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {nominal.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="hobbiesSports"
                    select
                    id="standard-size-small"
                    defaultValue="1"
                    onChange={(event) => {
                      setData({ ...data, hobbiesSports: event.target.value });
                    }}
                    fullWidth
                    required
                  >
                    {nominal.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box>
                    {
                      prediction && (
                        // <Typography
                        //   variant="h6"
                        //   sx={{
                        //     color: "#FA6F6F",
                        //     display: "flex",
                        //     alignItems: "center",
                        //     fontWeight: "300",
                        //     fontSize: 24,
                        //     background: "#fff",
                        //     borderRadius: "16px",
                        //   }}
                        // >
                        <Alert
                          sx={{ fontSize: 18, fontWeight: "500" }}
                          severity="success"
                        >
                          Your predicted garade is {prediction}
                        </Alert>
                      )
                      // </Typography>
                    }
                  </Box>

                  {/* <TextField
                    label="Final grade"
                    id="standard-size-small"
                    variant="outlined"
                    fullWidth
                    onChange={(event) => {
                      setData({ ...data, finalGrade: event.target.value });
                    }}
                    type="number"
                  /> */}

                  <Button
                    variant="outlined"
                    sx={{
                      // width: "32ch",
                      p: 1,
                      background: "rgb(232, 164, 115)",
                      color: "#fff",
                      m: 1,
                      height: "6.5ch",
                      border: "0",
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

// const mark = {
//   "10th Mark ": "85",
//   "12th Mark   ": "74",
//   "willingness to pursue a career based on their degree": "4",
//   "Financial Status": "3",
//   "Stress Level": " 1",
//   "daily studing time ": " 1",
//   "social medai & video": "1",
//   "prefer to study in_Night": " 0",
//   "Travelling Time": "7",
//   Gender_Female: " 1",
//   hobbies_Cinema: " 1",
//   "prefer to study in_Anytime": "1",
//   "Department_B.com ISM": "0",
//   hobbies_Sports: "0",
//   "prefer to study in_Morning": "0",
// };
