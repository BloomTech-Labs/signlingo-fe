// back end and front end have been refactored, and tests have yet to be refactored

import React from "react";
import { createStore } from "redux";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import {
  cleanup,
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../utils/app-test-utils";
import App from "../App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Account from "../components/Account";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { createMemoryHistory, createBrowserHistory } from "history";
import { Router } from "react-router";
import { signup } from "../actions/Signup";
// afterEach(cleanup);

describe("App", () => {
  it("renders Account Component", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Account />
      </Router>
    );

    //Check correct page content showed up
    expect(document.body.textContent).toContain("Account");
  });

  it("renders account component with signup tab open when clicking signup button on Landing Page", async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    // Interact with page
    act(() => {
      // Find the link (perhaps using the text content)
      const goSignUp = getByTestId("signupLP");
      // Click it
      goSignUp.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).toContain("Join using social media");
  });

  it("renders login component when login tab is clicked", async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    // Interact with page
    act(() => {
      // Find the link (perhaps using the text content)
      const loginTab = getByTestId("accountLoginTab");
      // Click it
      loginTab.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).toContain("Log in using social media");
  });

  it("renders the signup component when signup tab on the account route is clicked", async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    // Interact with page
    act(() => {
      // Find the link (perhaps using the text content)
      const goSignUp = getByTestId("accountSignupTab");
      // Click it
      goSignUp.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).toContain("Join using social media");
  });

  it("renders the landing page from by clicking back button", async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    // Interact with page
    act(() => {
      // Find the link (perhaps using the text content)
      const goLandingPage = getByTestId("backLandingPage");
      // Click it
      goLandingPage.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).toContain("SignLingo");
  });
});
