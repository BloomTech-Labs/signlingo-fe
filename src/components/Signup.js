import React from "react";
import { Formik, Form, Field } from "formik";
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

const Signup = props => {
  //the submit handler in formik, takes two parameters: the values (banana term), and formik bag
  function submitHandler(values, { resetForm }) {
    console.log("submitted", values);
    //action creator
    //reset the form?
    values = {
      email: "",
      password: ""
    };
    console.log("reset values", values);
  }

  return (
    <div>
      <h1>Sign Up</h1>
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

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
