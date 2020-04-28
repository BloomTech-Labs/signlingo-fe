import React from 'react'
import { createStore } from 'redux'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../utils/app-test-utils'
import App from "../App";
import '@testing-library/jest-dom'
import { useHistory } from 'react-router-dom';


test("renders SignLingo on home page loading", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Signlingo/i);
  expect(linkElement).toBeInTheDocument();
});
