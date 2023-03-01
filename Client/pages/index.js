import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";

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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

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

function Homepage(props) {
  const { userData, getUserData } = props;
  const [prediction, setPrediction] = React.useState("");

  const [localStorageScore, setLocalStoarageScore] = React.useState();

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
  });

  React.useEffect(() => {
    const localStorageS = localStorage.getItem("score");
    setLocalStoarageScore(localStorageS);
  }, []);

  const onSubmit = async (e) => {
    await insert(data, token);

    const prediction = await predict(data, token);

    localStorage.setItem("score", prediction.prediction);

    setPrediction(prediction.prediction);
    getUserData();
  };

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

            {localStorageScore && (
              <CoursesForm token={token} score={localStorageScore} />
            )}
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
                    size="small"
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
                        size="small"
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
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        label="12th Mark"
                        id="standard-size-small"
                        sx={{ pl: 1 }}
                        variant="outlined"
                        type="number"
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
                    size="small"
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
                    size="small"
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
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Study time</FormLabel>
                    <FormGroup row>
                      {[
                        ["studyAnytime", "Anytime"],
                        ["studyMorning", "In the morning"],
                        ["studyNight", "At night"],
                      ].map(([name, label]) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data[name] === 1}
                              defaultChecked
                              onChange={(event) => {
                                setData({
                                  ...data,
                                  [name]: event.target.checked ? 1 : 0,
                                });
                              }}
                              name={name}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Hoppies</FormLabel>
                    <FormGroup row>
                      {[
                        ["videoGames", "Video games"],
                        ["hobbiesCinema", "Cinema"],
                        ["hobbiesSports", "Sports"],
                      ].map(([name, label]) => (
                        <FormControlLabel
                          key={name}
                          control={
                            <Checkbox
                              checked={data[name] === 1}
                              defaultChecked
                              onChange={(event) => {
                                setData({
                                  ...data,
                                  [name]: event.target.checked ? 1 : 0,
                                });
                              }}
                              name={name}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">
                      Check the following questions
                    </FormLabel>
                    <FormGroup>
                      {[
                        ["travellingTime", "I travel alot"],
                        ["stressLevel", "I've high stress Level"],
                        ["financialStatus", "I'm in good financial status"],
                        ["Department_B_ISM", "Department_B_ISM"],
                        [
                          "pursueCareer",
                          "Willing to pursue a career based on my degree",
                        ],
                      ].map(([name, label]) => (
                        <FormControlLabel
                          key={name}
                          control={
                            <Checkbox
                              checked={data[name] === 1}
                              defaultChecked
                              onChange={(event) => {
                                setData({
                                  ...data,
                                  [name]: event.target.checked ? 1 : 0,
                                });
                              }}
                              name={label}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue="1"
                    name="radio-buttons-group"
                    onChange={(event) => {
                      setData({ ...data, gender: event.target.value });
                    }}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>

                  <Box>
                    {prediction && (
                      <Alert
                        sx={{ fontSize: 18, fontWeight: "500" }}
                        severity="success"
                      >
                        Your predicted garade is {prediction}
                      </Alert>
                    )}
                  </Box>

                  <Button
                    sx={{
                      p: 1,
                      background: "rgb(232, 164, 115)",
                      "&:hover": { background: "rgb(232, 148, 115)" },
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

Homepage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Homepage;
