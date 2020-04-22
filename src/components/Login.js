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
import clsx from 'clsx';


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
    '& input:valid + fieldset': {
      borderColor: '#E0E0E0',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: '#EB5757',
      borderWidth: "1px",
      borderRadius:"4px"
    },

    '& input:valid:focus + fieldset': {
      borderColor: '#828282',

    },
    '&$error': {
      borderColor: '#EB5757',
      borderWidth: "1px",
      borderRadius:"4px"
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: 0,
    padding: 0,
  },
  inputText: {
    margin: "2% 0",



  },
  inputErrorText: {
    border: '#EB5757 1px solid',
    borderRadius: '4px'  },

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
          <Form className={classes.container} noValidate autoComplete="off">
            <InputLabel style={{ color: "#4F4F4F" }} htmlFor="email">
              Email
            </InputLabel>
            <AccountTextFields
              className={clsx(classes.inputText, {[classes.inputErrorText]: errors.email && touched.email  })}
              // error={errors.email && touched.email}
              variant="outlined"
              name="email"
              type="email"
              onChange={handleChange}
              id="email"
              fullWidth
              InputLabelProps={{ shrink: false }}
              name="email"
              autoComplete="off"
              // helperText={
              //   errors.email && touched.email ? errors.email : null
              // }
              placeholder="Yourname@email.com"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <InputLabel style={{ color: "#4F4F4F" }} htmlFor="password">
              Password
            </InputLabel>
            <AccountTextFields
              
              className={clsx(classes.inputText, {[classes.inputErrorText]: errors.password && touched.password  })}
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
              id="password"
              fullWidth
              InputLabelProps={{ shrink: false }}
              placeholder="password"
              autoComplete="off"
              color="#828282"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            {values.email && values.password ? (
              <Button variant="contained" type="submit">Login</Button>
            ) : <Button variant="contained" type="submit" disabled>Login</Button>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { login })(Login);
