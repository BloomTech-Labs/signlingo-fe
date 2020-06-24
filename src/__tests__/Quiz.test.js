// back end and front end have been refactored, and tests have yet to be refactored

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Quiz from "../components/Quiz/Quiz";

import * as handTrack from "handtrackjs";

test("renders Quiz without crashing", () => {
  render(<Quiz />);
});

test("Sign A text appears on screen", () => {
  const { getByText } = render(<Quiz />);
  const signA = getByText(/sign/i);

  expect(signA).toBeInTheDocument();
  expect(getByText(/sign "a"/i)).toHaveTextContent(/sign "a"/i);
});

test("clickable image button turns on camera", () => {
  const { getByAltText } = render(<Quiz />);

  const imgButton = getByAltText(/turns camera on/i);
  fireEvent.click(imgButton);

  //here could go a possible assertion for turnVideoOn .toBeTruthy()
});

test("next button works without errors", () => {
  const { getByText } = render(<Quiz />);

  const nextButton = getByText(/next/i);
  fireEvent.click(nextButton);

  //next button doesn't do anything yet so no assertion for now
});
