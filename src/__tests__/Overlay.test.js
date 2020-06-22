// back end and front end have been refactored, and tests have yet to be refactored

import React from "react";
import { render } from "@testing-library/react";
import Overlay from "../components/Quiz/Overlay";
import * as handTrack from "handtrackjs";
import "@testing-library/jest-dom";

test("renders Overlay without crashing", () => {
  render(<Overlay />);
});

test("placeholder appears", () => {
  const { getByText } = render(<Overlay />);
  const placeholder = getByText(
    /This is a placeholder for the overlay component/i
  );
  expect(placeholder).toBeInTheDocument();
});
