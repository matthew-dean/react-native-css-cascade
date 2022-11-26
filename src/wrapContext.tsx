import React from 'react'
import type { TextStyle, StyleProp } from 'react-native'

import { StyleContext, useStyles } from './styleContext'

export type ViewStyleComponent = {
  style?: StyleProp<TextStyle>
}

export const wrapContext = <T extends React.ComponentClass<any> | React.ForwardRefExoticComponent<any>>(Component: T) => {
  if (!Component) {
    return undefined
  }
  return ({
    style,
    ...props
  }: ViewStyleComponent) => {
    const [finalStyle, newContext] = useStyles(style)
    // @ts-ignore - not sure how to properly type this
    const JSX = <Component style={finalStyle} {...props} />
    if (newContext) {
      return (
        <StyleContext.Provider value={newContext}>
          {JSX}
        </StyleContext.Provider>
      )
    }
    return JSX
  }
}
