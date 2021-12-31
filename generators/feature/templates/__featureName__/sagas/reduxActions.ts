import { createAction } from '@reduxjs/toolkit'

import { FEATURE_PREFIX } from '../prefix'

export const todo = createAction(`${FEATURE_PREFIX}.Todo`)
