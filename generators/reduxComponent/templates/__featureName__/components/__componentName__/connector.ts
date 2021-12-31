import { connect, ConnectedProps } from 'react-redux'

import type { RootState } from '../../store/root/RootState'

const mapState = (state: RootState) => ({})

const mapDispatch = {}

export const connector = connect(mapState, mapDispatch)
export type PropsFromRedux = ConnectedProps<typeof connector>
