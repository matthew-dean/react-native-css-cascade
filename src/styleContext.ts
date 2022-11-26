/**
 * This set of utilities + context allows React Native components to inherit
 * styles in the same way CSS does.
 */
import { createContext, useContext } from 'react'
import { StyleSheet } from 'react-native'
import type { StyleProp, TextStyle } from 'react-native'

/**
 * This should be the intersection of CSS properties defined
 * as inherited and React Native text styles that are
 * defined on the `TextStyle` type.
 *
 * @see https://www.sitepoint.com/css-inheritance-introduction/
 */
export const inheritedStyles = [
  'color',
  'direction',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textDecorationColor',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform'
] as const satisfies Readonly<Array<keyof TextStyle>>

interface HasColor {
  color: string
}

type ContextStyle = {
  [K in typeof inheritedStyles[number]]?: TextStyle[K]
} & HasColor

type AllStyles = TextStyle & HasColor

/**
 * For now, the only root style / property guaranteed is the `color` prop
 */
const rootStyles = {
  color: 'black'
}

export const StyleContext = createContext<ContextStyle>(rootStyles)

type StyleEntry = [keyof TextStyle, TextStyle[keyof TextStyle]]
type ContextEntry = [keyof ContextStyle, ContextStyle[keyof ContextStyle]]

export const useStyles = (
  style?: StyleProp<TextStyle>
): [AllStyles, ContextStyle | undefined] => {
  const inherited = useContext(StyleContext)
  if (!style) {
    return [inherited, undefined]
  }
  let newContext: ContextEntry[] | undefined

  const newStyles = Object.entries(StyleSheet.flatten(style)).filter(
    ([_, value]) => value !== undefined
  ) as StyleEntry[]

  const hasInheritedStyles = newStyles.find(([key]) =>
    inheritedStyles.includes(key as keyof ContextStyle)
  )
  if (hasInheritedStyles) {
    newContext = []
  }
  const finalStyleEntries = newStyles.concat(
    Object.entries(inherited) as StyleEntry[]
  )

  let finalStyle = Object.fromEntries(finalStyleEntries) as unknown as AllStyles

  finalStyle = Object.fromEntries(
    finalStyleEntries.map(([key, value]) => {
      if (typeof value === 'string') {
        value = value.replace(/currentColor/g, finalStyle.color)
      }
      const finalValue = [key as keyof AllStyles, value]
      if (
        hasInheritedStyles &&
        inheritedStyles.includes(key as keyof ContextStyle)
      ) {
        newContext!.push(finalValue as ContextEntry)
      }
      return finalValue
    })
  ) as unknown as AllStyles

  return [
    finalStyle,
    hasInheritedStyles
      ? (Object.fromEntries(newContext!) as unknown as ContextStyle)
      : undefined
  ]
}
