# react-native-css-cascade

> Finally, inheritable styles in React Native

React Native's docs say they don't support CSS-style inheritance because [they think strong isolation is better](https://reactnative.dev/docs/text#limited-style-inheritance).
That's all good and fine, but for a React developer migrating to React Native, this violates the [Principle of Least Surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment). React Native's styling system was specifically designed to mimic and behave like CSS, yet ~in their vainglorious hubris~ for some reason, React Native's designers decided to break CSS's long-established and understood model of inheritance.

So, swap these components in for React Native ones and get the same styles cascading through your React tree that you would expect in CSS.

[![NPM](https://img.shields.io/npm/v/react-native-css-cascade.svg)](https://www.npmjs.com/package/react-native-css-cascade) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-native-css-cascade
```

## Usage

```tsx
import { View } from 'react-native-css-cascade'

export const Card = ({ selected, ...props }) => {
  const textColor = selected ? { color: 'green' } : { color: 'black' }
  // All <Text> nodes anywhere in the sub-tree
  // will inherit a color of green when this card is selected
  <View style={textColor} {...props} />
}
```

## License

MIT © [matthew-dean](https://github.com/matthew-dean)
