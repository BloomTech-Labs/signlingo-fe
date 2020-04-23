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
} from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';









let SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required.")
});

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign:'left',
    margin: 0,
    padding: 0

  },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   // width: 100
  // },
  // dense: {
  //   marginTop: theme.spacing(2),
  // },
  // menu: {
  //   // width: 100,
  // },
}));


// const useStyles = makeStyles(theme => ({
//   "@global": {
//     body: {
//       backgroundColor: theme.palette.common.white
//     }
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     // alignItems: "center"
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%",
//     marginTop: theme.spacing(3)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   }
// }));

// const BootstrapInput = withStyles(theme => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: "#FFFFFF",
//     border: '1px solid #E0E0E0',
//     boxSizing: 'border-box',
//     fontSize: 16,
//     width: 'auto',
//     padding: '10px 12px',
//     // transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     // fontFamily: [
//     //   '-apple-system',
//     //   'BlinkMacSystemFont',
//     //   '"Segoe UI"',
//     //   'Roboto',
//     //   '"Helvetica Neue"',
//     //   'Arial',
//     //   'sans-serif',
//     //   '"Apple Color Emoji"',
//     //   '"Segoe UI Emoji"',
//     //   '"Segoe UI Symbol"',
//     // ].join(','),
//     // '&:focus': {
//     //   boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//     //   borderColor: theme.palette.primary.main,
//     // },
//   },
// }))(InputBase);

const Login = props => {
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
          password: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={submitHandler}
      >
        {({ errors, handleChange, touched }) => (
          <Form className={classes.container} noValidate autoComplete="off">
            <InputLabel style={{color: "#4F4F4F"}} htmlFor="email">
          Email
        </InputLabel>
            <TextField
              style={{width: "100%"}}
              // error={errors.email && touched.email}
              variant="outlined"
              name="email"
              type="email"
              onChange={handleChange}
              id="email"
              fullWidth
              InputLabelProps={{shrink: false}}
              

              name="email"
              autoComplete="off"
              // helperText={
              //   errors.email && touched.email ? errors.email : null
              // }
              placeholder="Yourname@email.com"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { login })(Login);
