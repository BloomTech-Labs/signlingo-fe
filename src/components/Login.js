import React from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import * as yup from "yup";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

// validation scheme
let SignupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .min(6, "Password is too short")
    .max(20, "Password is too long")
    .required("This field is required"),
});

// Material UI Textfield modification
const AccountTextFields = withStyles({
  root: {
    // styles the outline of the text field
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderRadius: "4px",
      },
      // styles textfield box when it is in focus (clicked on)
      "&.Mui-focused fieldset": {
        borderColor: "#828282",
        borderWidth: "1px",
        borderRadius: "4px",
      },
      // styles the outline of the text field with proper error color and border size
      "&.Mui-error fieldset": {
        borderColor: "#EB5757",
        borderWidth: "1px",
        borderRadius: "4px",
      },
    },
    // styles insure the font on typography
    "& .MuiTypography-root": {
      "& fieldset": {
        fontWeight: "600",
        fontFamily: "Inter, sans-serif",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  //style for the Form container that holds the input fields
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
    fontSize: "2.5rem",
    "&:hover": {
      background: "transparent",
      boxShadow: "none",
      backgroundColor: "#f6bf00",
    },
  },
  // Styling for the disabled button
  disabledSubmitButton: {
    fontSize: "2.5rem",
    boxShadow: "none",
    marginTop: "10%",
    fontFamily: "Inter, sans-serif",
  },
  //styling for error message
  formHelperTextRoot: {
    fontSize: "1.2rem",
    color: "#EB5757",
    padding: 0,
    margin: 0,
  },
  //styling for placeholder
  inputPropsStyling: {
    fontSize: "1.4rem",
  },
}));

const Login = ({login}, props) => {
  const classes = useStyles();
  const history = useHistory();

  //the submit handler in formik, takes two parameters: the values (banana term), and formik bag
  const submitHandler = async (values) => {
    await login(values, history);
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
              InputProps={{
                classes: { root: classes.inputPropsStyling },
              }}
              autoComplete="off"
              placeholder="Yourname@email.com"
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : null}
              FormHelperTextProps={{
                classes: { root: classes.formHelperTextRoot },
              }}
            />

            <InputLabel className={classes.inputLabel} htmlFor="password">
              Password
            </InputLabel>
            <AccountTextFields
              className={classes.inputText}
              InputLabelProps={{ shrink: false }}
              InputProps={{
                classes: { root: classes.inputPropsStyling },
              }}
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password must be 8 characters"
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
              FormHelperTextProps={{
                classes: { root: classes.formHelperTextRoot },
              }}
            />

            {values.email && values.password ? (
              <Button
                variant="contained"
                type="submit"
                className={classes.activeSubmitButton}
              >
                Log in
              </Button>
            ) : (
              <Button
                className={classes.disabledSubmitButton}
                variant="contained"
                type="submit"
                disabled
              >
                Log in
              </Button>
            )}
          </Form>
        )}
      </Formik>

      {/* Below is where Okta.js was before we decided to rescrope our release canvas to not include it.
      it remains in the code base in case another team figures out the functionality and wants to add an additional
      means of signing up for the app */}
      {/* <div className="separator">or</div>
      <p className="socialText">Log in more securely using Okta</p> */}
    </div>
  );
};

export default connect(null, { login })(Login);
