import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FEATURE_PREFIX } from '../../prefix'
import { UiState } from './UiState'

const uiSlice = createSlice({
  name: `${FEATURE_PREFIX}.Ui`,
  initialState: { todo: 'todo' } as UiState,
  reducers: {
    updateUi(state, action: PayloadAction<UiState>) {
      return { ...state, ...action.payload }
    },
  },
})

const { actions, reducer } = uiSlice

export const { updateUi } = actions

export default reducer
