// back end and front end have been refactored, and tests have yet to be refactored

import React from "react";
import { render } from "@testing-library/react";
import App from "App";

test("renders App without crashing", () => {
    render(<App />);
});