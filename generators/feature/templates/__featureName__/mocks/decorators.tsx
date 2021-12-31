import React from 'react'
import { Provider } from 'react-redux'

import { createStore } from './create-store'

export const ReduxDecorator = (story: () => any) => {
  const store: any = createStore()
  return <Provider store={store}>{story()}</Provider>
}
