// back end and front end have been refactored, and tests have yet to be refactored

// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { initialState as reducerInitialState, loginReducer as reducer } from '../reducers/LoginReducer'

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }