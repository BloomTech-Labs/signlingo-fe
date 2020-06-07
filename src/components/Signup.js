import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { signup } from "../actions/Signup";
import * as yup from "yup";
// import SocialButtons from "./SocialButtons";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

// validation scheme
let SignupSchema = yup.object().shape({
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .min(6, "Password is too short")
    .max(20, "Password is too long")
    .required("This field is required"),
  confirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const AccountTextFields = withStyles({
  root: {
    // styles the outline of the text field
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E0E0",
        borderWidth: "1px",
        borderRadius: "4px",
        fontFamily: "Inter, sans-serif",
      },
      // styles textfield box when it is in focus (clicked on)
      "&.Mui-focused fieldset": {
        borderColor: "#828282",
        borderWidth: "1px",
        borderRadius: "4px",
      },
      //styles the outline of the text field with proper error color and border size
      "&.Mui-error fieldset": {
        borderColor: "#EB5757",
        borderWidth: "1px",
        borderRadius: "4px",
      },
    },
    // styles insure the on typography
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

const Signup = ({signup},props) => {
  const classes = useStyles();
  const history = useHistory();

  //the submit handler in formik, takes two parameters: the values (banana term), and formik bag
  const submitHandler = async (values) => {
    // sanitizing the data so backend doesn't receive confirmation field
    const newValues = {
      email: values.email,
      password: values.password,
    };
    await signup(newValues);
    
    history.push("/dashboard");

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
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password must be 8 characters"
              error={errors.password && touched.password}
              InputLabelProps={{ shrink: false }}
              InputProps={{
                classes: { root: classes.inputPropsStyling },
              }}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
              FormHelperTextProps={{
                classes: { root: classes.formHelperTextRoot },
              }}
            />

            <InputLabel
              data-testid="confirmSignUp"
              className={classes.inputLabel}
              htmlFor="confirm"
            >
              Confirm password
            </InputLabel>
            <AccountTextFields
              className={classes.inputText}
              variant="outlined"
              name="confirm"
              type="password"
              onChange={handleChange}
              placeholder="Passwords must match"
              error={errors.confirm && touched.confirm}
              InputLabelProps={{ shrink: false }}
              InputProps={{
                classes: { root: classes.inputPropsStyling },
              }}
              helperText={
                errors.confirm && touched.confirm ? errors.confirm : null
              }
              FormHelperTextProps={{
                classes: { root: classes.formHelperTextRoot },
              }}
            />

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
      {/* Below is where SocialButtons.js was before we decided to rescope our release canvas to not include it.
      it remains in the code base in case another team figures out the functionality and wants to add an additional
      means of signing up for the app */}
      {/* <div className="separator">or</div>
      <p className="socialText">Join using social media</p>
      <SocialButtons /> */}
    </div>
  );
};

export default connect(null, { signup })(Signup);
