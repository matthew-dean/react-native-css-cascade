import React from 'react'
import type { TextStyle, StyleProp } from 'react-native'

import { StyleContext, useStyles } from './styleContext'

export type ExpandStyle<T> = Omit<T, 'style'> & {
  style?: StyleProp<TextStyle>
}

type GetParameters<T> =
  T extends React.ComponentClass<any>
    ? ExpandStyle<ConstructorParameters<T>[0]>
    : T extends React.ForwardRefExoticComponent<any>
      ? ExpandStyle<Parameters<T>[0]>
      : never

export const wrapContext = <
  T extends React.ComponentClass<any> | React.ForwardRefExoticComponent<any>
>(
  Component: T
) => {
  if (!Component) {
    return undefined
  }
  return ({ style, ...props }: GetParameters<T>) => {
    const [finalStyle, newContext] = useStyles(style)
    // @ts-ignore - not sure how to properly type this
    const JSX = <Component style={finalStyle} {...props} />
    if (newContext) {
      return (
        <StyleContext.Provider value={newContext}>{JSX}</StyleContext.Provider>
      )
    }
    return JSX
  }
}
