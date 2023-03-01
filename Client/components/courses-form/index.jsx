import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Description } from "@mui/icons-material";
import { Divider, MenuItem, TextField } from "@mui/material";
import XLSX from "xlsx";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { useFieldArray, useForm } from "react-hook-form";
import {
  getCourseDifficulty,
  getCourses,
  insertCourse,
} from "../../api/insert";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    // backgroundColor:
    //   theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export function CoursesForm({ token , score }) {
  const [progress, setProgress] = React.useState();
  const { register, control, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      courses: [{ course: "", credit: "" }],
    },
  });
  const [success, setSuccess] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [hide, setHide] = React.useState(false);

  courses;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const onSubmitCourses = async (data) => {
    data = {...data , score}
    const diff = await getCourseDifficulty(data, token);
    setProgress(diff);
    setSuccess(true);
    setHide(!hide);
  };

  const tryAgain = () => {
    setHide(!hide);
    setProgress([]);
    setSuccess(false);
  };

  React.useEffect(() => {
    const fetch = async () => {
      const courses = await getCourses();
      setCourses(courses);
    };

    fetch();
  }, []);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: "#FA6F6F",
          display: "flex",
          alignItems: "center",
          fontWeight: "300",
          fontSize: 24,
          my: 2,
          pl: 2,
        }}
      >
        <Description sx={{ mr: 1 }} />
        Enter Your Courses
      </Typography>
      <Box
        sx={{
          p: 2,
          mt: 2,
          background: "#fff",
          borderRadius: "16px",
        }}
      >
        {!hide && (
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitCourses)}
            sx={{
              m: 1,
              p: 1,
            }}
          >
            {fields.map((field, index) => {
              const fieldName = `courses[${index}]`;
              return (
                <FormControl
                  key={`${fieldName}.${field.id}`}
                  sx={{ display: "flex", direction: "coulmn" }}
                >
                  <TextField
                    label="Course Name"
                    type="text"
                    name={`courses[${index}].course`}
                    {...register(`courses.${index}.course`, {
                      required: true,
                    })}
                    sx={{
                      m: 1,
                      width: "50%",
                    }}
                    select
                  >
                    {courses &&
                      courses.map((option) => (
                        <MenuItem key={option.course} value={option.course}>
                          {option.course} (credit: {option.credit})
                        </MenuItem>
                      ))}
                  </TextField>

                  <Box>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        sx={{
                          m: 1,
                        }}
                        color="error"
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                  {index < fields.length - 1 && (
                    <Divider
                      sx={{
                        mx: -2,
                        mb: 4,
                      }}
                    />
                  )}
                </FormControl>
              );
            })}

            {/* <Divider
            sx={{
              mx: -2,
            }}
          /> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                pt: 3,
                pb: 1,
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  width: "50%",
                  p: 1.5,
                  background: "rgb(232, 164, 115)",
                  color: "#fff",

                  border: "0",
                }}
                type="submit"
              >
                Submit
              </Button>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      course: "",
                      credit: "",
                    })
                  }
                >
                  Add Course
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    reset({
                      courses: [
                        {
                          course: "",
                        },
                      ],
                    });
                  }}
                >
                  Clear courses
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {success && (
          <Alert
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "400",
              fontSize: 20,
              paddingY: 2,
              marginY: 2,
            }}
            severity="info"
          >
            Your Courses Difficulties
          </Alert>
        )}
        {!!progress &&
          progress.map((field) => {
            return (
              <Box sx={{ position: "relative", mb: 2, p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#404040",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "400",
                    fontSize: 24,
                    background: "#fff",
                    borderRadius: "16px",
                  }}
                >
                  {field.course} : {field.difficulty}
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#D60000",
                      }}
                    >
                      Harder
                    </Typography>
                    <Typography sx={{ color: "#00B50F" }}>Easier</Typography>
                  </Box>

                  <BorderLinearProgress
                    variant="determinate"
                    value={field.difficulty}
                    color={field.difficulty > 80 ? "success" : "error"}
                  />
                </Box>
              </Box>
            );
          })}
        {hide && (
          <Box sx={{ mt: 2 }}>
            <Button
              size="large"
              variant="contained"
              type="button"
              onClick={tryAgain}
            >
              Try Again
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
