import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { signup } from "../actions/Signup";
import * as yup from "yup";

import facebookF from "../images/icons/facebook_icon.png";
import googleG from "../images/icons/google_icon.png";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import { green } from "@material-ui/core/colors";

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

    "& .MuiTypography-root": {
      "& fieldset": {
        fontWeight: "600",
        fontFamily: "Inter, sans-serif",
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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: 0,
    padding: 0,
    fontWeight: "600",
    fontFamily: "Inter, sans-serif",
  },
  inputText: {
    margin: "1% 0 3% 0",
    fontFamily: "Inter, sans-serif",
  },
  inputErrorText: {
    // border: "#EB5757 1px solid",
    borderRadius: "4px",
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
          <Form
            className={classes.container}
            noValidate
            autoComplete="off"
            style={{ marginTop: "10%" }}
          >
            <InputLabel
              style={{
                color: "#4F4F4F",
                fontSize: "1.2rem",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
              }}
              htmlFor="email"
            >
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
              // helperText={
              //   errors.email && touched.email ? errors.email : null
              // }
              placeholder="Yourname@email.com"
              error={errors.email && touched.email}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <InputLabel
              style={{
                color: "#4F4F4F",
                fontSize: "1.2rem",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
              }}
              htmlFor="password"
            >
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

            <InputLabel
              style={{
                color: "#4F4F4F",
                fontSize: "1.2rem",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
              }}
              htmlFor="confirm"
            >
              Confirm
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
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "#f6bf00",
                  boxShadow: "none",
                  marginTop: "10%",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.2rem",
                }}
              >
                Sign up
              </Button>
            ) : (
              <Button variant="contained" type="submit" disabled>
                Sign up
              </Button>
            )}
          </Form>
        )}
      </Formik>

      <div className="separator" style={{ color: "#4F4F4F" }}>
        or
      </div>
      <p style={{ color: "#4F4F4F", fontSize: "1.4rem", lineHeight: "1.7rem" }}>
        Join using social media
      </p>

      <section className="socialBtns">
        <a href="www.facebook.com" target="_blank" className="facebookBtn">
          <img src={facebookF} alt="facebook letter f" id="fImage" /> Facebook
        </a>
        <a href="www.google.com" target="_blank" className="googleBtn">
          <img src={googleG} alt="google letter g" id="gImage" /> Google
        </a>
      </section>
    </div>
  );
};

export default connect(null, { signup })(Signup);
