import react from "react";
import { render } from "@testing-library/react";
import Quiz from "../components/Quiz/Quiz";

test("renders Quiz without crashing", () => {
  render(<Quiz />);
});
