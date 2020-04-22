import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { login } from "../actions/Login";
import * as yup from "yup";

import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import { green, orange } from "@material-ui/core/colors";
import { palette } from "@material-ui/system";

let SignupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

const AccountTextFields = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#828282",
        borderWidth: "1px",
        borderRadius: "4px",


      },
      // '&:hover fieldset': {
      //   borderColor: 'yellow',
      // },
      "&.Mui-focused fieldset": {
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderRadius: "4px",


      },
      "&.Mui-error fieldset": {
        borderColor: "#EB5757",
        borderWidth: "1px",
        borderRadius: "4px",
      },
    },
    // "& input:valid + fieldset": {
    //   borderColor: "#E0E0E0",
    //   borderWidth: 2,
    // },
    // "& input:invalid:focus + fieldset": {
    //   borderColor: green[500],
    //   borderWidth: "5px",
    //   borderRadius: "4px",
    // },

    "& input:valid:focus + fieldset": {
      borderColor: "#828282",
      backgroundColor: "",
    },
    "& input:focus + fieldset": {
      borderColor: "#FFFFFF",
    },
    "& error": {
      borderColor: green[500],
      borderWidth: "8px",
      borderRadius: "4px",
    },
  },
})(TextField);

// const theme = createMuiTheme({
//   pallete: {
//     error: {
//       main: green[500],
//     },
//   },
//   overrides: {
//     MuiOutlinedInput: {
//       //     root: {
//       //       // '& $notchedOutline': {
//       //       //   border: '5px solid #4A90E2'
//       //       // },
//       //       '&$error': {
//       //           border: '5px solid #4A90E2'
//       //       }
//       // }
//     },
//     MuiTextField: {
//       root: {
//         "& $notchedOutline": {
//           border: "5px solid #4A90E2",
//         },
//         "&$error": {
//           border: "5px solid #4A90E2",
//         },
//       },
//     },
//   },
// });

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: 0,
    padding: 0,
  },
  inputText: {
    margin: "1% 0 3% 0",
  },
  inputErrorText: {
    // border: "#EB5757 1px solid",
    borderRadius: "4px",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  //the submit handler in formik, takes two parameters: the values (banana term), and formik bag
  function submitHandler(values, { resetForm }) {
    props.login(values);
    resetForm();
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={submitHandler}
      >
        {({ errors, handleChange, touched, values }) => (
          <Form className={classes.container} noValidate autoComplete="off" style={{marginTop: "10%"}}>
            <InputLabel style={{ color: "#4F4F4F", fontSize: "1.2rem", fontWeight:"600"}} htmlFor="email">
              Email
            </InputLabel>
            <AccountTextFields
              className={classes.inputText}
              variant="outlined"
              name="email"
              type="email"
              onChange={handleChange}
              id="email"
              fullWidth
              InputLabelProps={{ shrink: false }}
              InputProps={{style: {fontSize: "1.2rem"}}}
              name="email"
              autoComplete="off"
              // helperText={
              //   errors.email && touched.email ? errors.email : null
              // }
              placeholder="Yourname@email.com"
              error={errors.email && touched.email}
            />

            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <InputLabel style={{ color: "#4F4F4F", fontSize: "1.2rem", fontWeight:"600" }} htmlFor="password">
              Password
            </InputLabel>
            <AccountTextFields
              className={classes.inputText}
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
              id="password"
              fullWidth
              InputLabelProps={{ shrink: false }}
              placeholder="password"
              autoComplete="off"
              error={errors.password && touched.password}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            {values.email && values.password ? (
              <Button variant="contained" type="submit" style={{backgroundColor:"#f6bf00", boxShadow: "none", marginTop: "10%"}}>
                Login
              </Button>
            ) : (
              <Button variant="contained" type="submit" disabled>
                Login
              </Button>
            )}
          </Form>
        )}
      </Formik>

      <div className="separator" style={{color: "#4F4F4F"}}>or</div>
      <p style={{color: "#4F4F4F", fontSize: "1.4rem", lineHeight:"1.7rem"}}>Log in using social media</p>
    </div>
  );
};

export default connect(null, { login })(Login);
