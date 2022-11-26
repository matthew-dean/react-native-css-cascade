/**
 * This set of utilities + context allows React Native components to inherit
 * styles in the same way CSS does.
 */
import { createContext, useContext } from 'react'
import { StyleSheet } from 'react-native'
import type { StyleProp, TextStyle } from 'react-native'

export const inheritedStyles = [
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'color',
  'textAlign'
] as const satisfies Readonly<Array<keyof TextStyle>>

interface HasColor {
  color: string
}

type Spread<Type> = { [Key in keyof Type]: Type[Key] }

type ContextStyle = {
  [K in typeof inheritedStyles[number]]?: TextStyle[K]
} & HasColor

type AllStyles = Spread<TextStyle & HasColor>

export const StyleContext = createContext<ContextStyle>({
  color: 'black'
})

type StyleEntry = [keyof TextStyle, TextStyle[keyof TextStyle]]
type ContextEntry = [keyof ContextStyle, ContextStyle[keyof ContextStyle]]

export const useStyles = (style?: StyleProp<TextStyle>): [AllStyles, ContextStyle | undefined] => {
const inherited = useContext(StyleContext)
  if (!style) {
    return [inherited, undefined]
  }
  let newContext: ContextEntry[] | undefined = undefined

  const newStyles = Object.entries(StyleSheet.flatten(style))
    .filter(([_, value]) => value !== undefined) as StyleEntry[]

  const hasInheritedStyles = newStyles.find(([key]) => inheritedStyles.includes(key as keyof ContextStyle))
  if (hasInheritedStyles) {
    newContext = []
  }
  const finalStyleEntries = newStyles.concat(Object.entries(inherited) as StyleEntry[])

  let finalStyle = Object.fromEntries(finalStyleEntries) as unknown as AllStyles

  finalStyle = Object.fromEntries(
    finalStyleEntries.map(
      ([key, value]) => {
        let finalValue: [keyof AllStyles, AllStyles[keyof AllStyles]]
        if (typeof value === 'string') {
          value = value.replace(/currentColor/g, finalStyle.color)
        }
        finalValue = [key as keyof AllStyles, value]
        if (hasInheritedStyles && inheritedStyles.includes(key as keyof ContextStyle)) {
          newContext!.push(finalValue as ContextEntry)
        }
        return finalValue
      }
    )
  )as unknown as AllStyles

  return [
    finalStyle,
    hasInheritedStyles ? Object.fromEntries(newContext!) as unknown as ContextStyle : undefined
  ]
}
