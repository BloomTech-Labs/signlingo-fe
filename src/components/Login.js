import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { login } from "../actions/Login";
import * as yup from "yup";

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

const Login = props => {
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
          <Form>
            <Field
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="email"
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
