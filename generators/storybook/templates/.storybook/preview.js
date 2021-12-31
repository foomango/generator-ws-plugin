import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

addDecorator(
  withInfo({
    maxPropObjectKeys: 50,
    maxPropStringLength: 500,
    styles: {
      button: {
        topRight: {
          top: 'auto',
          bottom: 0,
          borderRadius: '5px 0 0 0',
        },
      },
    },
  })
)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
