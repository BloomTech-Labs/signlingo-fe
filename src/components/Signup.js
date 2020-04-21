import React from "react";
import { Formik, Form, Field } from "formik";
import { signup } from "../actions/Signup";
import { connect } from "react-redux";
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
    .required("This field is required."),
  confirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

const Signup = props => {
  //the submit handler in formik, takes two parameters: the values (banana term), and formik bag
  function submitHandler(values, { resetForm }) {
    // sanitizing the data so backend doesn't receive confirmation field
    const newValues = {
      email: values.email,
      password: values.password
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
          confirm: ""
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

            <Field
              name="confirm"
              type="password"
              onChange={handleChange}
              placeholder="confirm password"
            />
            {errors.confirm && touched.confirm ? (
              <div>{errors.confirm}</div>
            ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { signup })(Signup);
