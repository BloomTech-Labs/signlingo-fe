// back end and front end have been refactored, and tests have yet to be refactored

import React from "react";
import { render } from "@testing-library/react";
import VideoAssessment from "../components/Quiz/VideoAssessment";
import "@testing-library/jest-dom";

test("renders VideoAssessment without crashing", () => {
  render(<VideoAssessment />);
});
