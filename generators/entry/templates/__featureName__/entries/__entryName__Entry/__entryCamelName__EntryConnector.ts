import { connect, ConnectedProps } from 'react-redux'

import { updateUi } from '../../store/ui/uiSlice'
import { selectUi } from '../../store/ui/uiSelector'
import { RootState } from '../../store/root/RootState'

const mapStateToProps = (state: RootState) => ({
  ui: selectUi(state),
})
const mapDispatchToProps = { updateUi }

export const connector = connect(mapStateToProps, mapDispatchToProps)
export type PropsFromRedux = ConnectedProps<typeof connector>
