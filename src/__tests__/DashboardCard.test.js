// back end and front end have been refactored, and tests have yet to be refactored

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardCard from "../components/Dashboard/DashboardCard";

test("renders DashboardCard without crashing", () => {
  render(<DashboardCard />);
});

test("A - E appears on dashboard", () => {
  const { getByText } = render(<DashboardCard />);
  const aToE = getByText(/a - e/i);

  expect(aToE).toBeInTheDocument();
  expect(getByText(/a - e/i)).toHaveTextContent(/a - e/i);
});