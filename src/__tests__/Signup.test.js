// back end and front end have been refactored, and tests have yet to be refactored

import React from 'react'
import { createStore } from 'redux'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../utils/login-test-utils'
import '@testing-library/jest-dom/extend-expect'
// import { createMount } from '@material-ui/core/test-utils'

import Signup from "../components/Signup";

// describe('defines user form fields', () => {
//   it('renders user name field', () => {
//     const { container } = render(<Login />)

//     //const emailField = wrapper.find('[name="email"]');
//     // const emailField = container.querySelector('AccountTextFields[name="email"]')
//     // expect(emailField.prop('type')).toBe('email');
//     // expect(emailField.prop('placeholder')).toBe('Yourname@email.com');
//   });
// })

it('submits correct values', () => {
  const { container } = render(<Signup />)

  const email = container.querySelector('AccountTextFields[name="email"]')
//   const password = container.querySelector('AccountTextFields[name="password"]')

//   const submit = container.querySelector('Button[type="submit"]')



  // await waitFor(() => {
    // fireEvent.change(email, {
    //   target: {
    //     value: "mock@email.com"
    //   }
    // })


  // })

//   await waitFor(() => {
//     fireEvent.change(password, {
//       target: {
//         value: "mockname"
//       }
//     })
//   })



//   await waitFor(() => {
//     fireEvent.click(submit)
//   })

})


test('Join text renders on Signup component tab', () =>{
  // const mockEpisodes = jest.fn();
  // const { } = render(
  //   <Episodes episodes={episodes}/>
  // );
  const { getByText } = render(
    <Signup />  
  )

  getByText(/Join /i);





})