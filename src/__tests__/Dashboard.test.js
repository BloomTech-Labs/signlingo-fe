// back end and front end have been refactored, and tests have yet to be refactored

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../components/Dashboard/Dashboard";

test("renders Dashboard without crashing", () => {
  render(<Dashboard />);
});

test("Logout button appears on screen", () => {
  const { getByText } = render(<Dashboard />);
  const logout = getByText(/logout/i);

  expect(logout).toBeInTheDocument();
  expect(getByText(/logout/i)).toHaveTextContent(/logout/i);
});
