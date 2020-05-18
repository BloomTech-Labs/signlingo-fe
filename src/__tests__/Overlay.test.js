import react from "react";
import { render } from "@testing-library/react";
import Overlay from "../components/Quiz/Overlay";

test("renders Overlay without crashing", () => {
  render(<Overlay />);
});
