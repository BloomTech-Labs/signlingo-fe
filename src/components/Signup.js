import React from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { signup } from "../actions/Signup";
import * as yup from "yup";

import SocialButtons from "./SocialButtons";

import facebookF from "../images/icons/facebook_icon.png";
import googleG from "../images/icons/google_icon.png";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

let SignupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
  confirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const AccountTextFields = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#828282",
        borderWidth: "1px",
        borderRadius: "4px",
        fontFamily: "Inter, sans-serif",
      },
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

    "& .MuiTypography-root": {
      "& fieldset": {
        fontWeight: "600",
        fontFamily: "Inter, sans-serif",
      },
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
    fontWeight: "600",
    fontFamily: "Inter, sans-serif",
    marginTop: "10%",
  },
  //Styling for the input text ie:textfield

  inputText: {
    margin: "1% 0 3% 0",
  },
  //Styling for the input label ie: Email, Password
  inputLabel: {
    color: "#4F4F4F",
    fontSize: "1.2rem",
    fontWeight: "600",
    fontFamily: "Inter, sans-serif",
  },
  //Styling for the active button after fields have inputs
  activeSubmitButton: {
    backgroundColor: "#f6bf00",
    boxShadow: "none",
    marginTop: "10%",
    fontFamily: "Inter, sans-serif",
    "&:hover": {
      background: "transparent",
      boxShadow: "none",
      backgroundColor: "#f6bf00",
    },
  },
  //Styling for the active button after fields have inputs
  disabledSubmitButton: {
    boxShadow: "none",
    marginTop: "10%",
    fontFamily: "Inter, sans-serif",
  },
}));

const Signup = (props) => {
  const classes = useStyles();

  //the submit handler in formik, takes two parameters: the values (banana term), and formik bag
  function submitHandler(values, { resetForm }) {
    // sanitizing the data so backend doesn't receive confirmation field
    const newValues = {
      email: values.email,
      password: values.password,
    };
    props.signup(newValues);
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
            <InputLabel className={classes.inputLabel} htmlFor="email">
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
              InputProps={{ style: { fontSize: "1.2rem" } }}
              name="email"
              autoComplete="off"
              placeholder="Yourname@email.com"
              error={errors.email && touched.email}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <InputLabel className={classes.inputLabel} htmlFor="password">
              Password
            </InputLabel>
            <AccountTextFields
              className={classes.inputText}
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="password"
              error={errors.password && touched.password}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <InputLabel className={classes.inputLabel} htmlFor="confirm">
              Confirm password
            </InputLabel>
            <AccountTextFields
              className={classes.inputText}
              variant="outlined"
              name="confirm"
              type="password"
              onChange={handleChange}
              placeholder="confirm password"
              error={errors.confirm && touched.confirm}
            />
            {errors.confirm && touched.confirm ? (
              <div>{errors.confirm}</div>
            ) : null}

            {values.email && values.password && values.confirm ? (
              <Button
                className={classes.activeSubmitButton}
                variant="contained"
                type="submit"
              >
                Sign up
              </Button>
            ) : (
              <Button
                className={classes.disabledSubmitButton}
                variant="contained"
                type="submit"
                disabled
              >
                Sign up
              </Button>
            )}
          </Form>
        )}
      </Formik>

      <div className="separator">or</div>

      <p className="socialText">Join using social media</p>
      <SocialButtons />
    </div>
  );
};

export default connect(null, { signup })(Signup);
