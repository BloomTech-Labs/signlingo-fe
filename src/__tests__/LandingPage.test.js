import React from 'react'
import { createStore } from 'redux'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../utils/app-test-utils'
import App from "../App";
import '@testing-library/jest-dom'

import LandingPage from '../components/LandingPage'
import { mount } from 'enzyme';
import { MemoryRouter  } from 'react-router-dom';
import { act } from 'react-dom/test-utils';



import { createMemoryHistory } from "history";
import { Router } from "react-router";

test("renders landing page with default path /", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <LandingPage/>
    </Router>
  );
  expect(history.location.pathname).toBe("/");
});


test("redirects to login page", async () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <LandingPage/>
    </Router>
  );

  // Interact with page
  act(() => {
    // Find the link (perhaps using the text content)
    let goSignup = screen.getByTestId('signup');
    //Click it
    //goSignup.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // fireEvent(goSignup),new MouseEvent('click', {
    //   bubbles: true,
    //   cancelable:true
    // })
    fireEvent.click(getByTestId('signup'))
    

    
  });

  // Check correct page content showed up
 // await expect(document.body.textContent).toContain('Email');
});

test("Title of Landing Page renders", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <LandingPage/>
    </Router>
  );

  

  //Check correct page content showed up
  expect(document.body.textContent).toContain('SignLingo');
});



//  test("renders SignLingo", () => {
  

//   const { getByText } = render(<LandingPage />);
//   const linkElement = getByText(/Signlingo/i);
//   expect(linkElement).toBeInTheDocument();
// });


// it('...', () => {
//   const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

//   const wrapper = mount(
//     <Router history={historyMock}>
//       <LandingPage />
//     </Router>,
//   ).find('.selector').at(1);

//   const { onClick } = wrapper.props();
//   act(() => {
//     onClick();
//   });

//   expect(historyMock.push.mock.calls[0][0]).toEqual('/whatever');
//});