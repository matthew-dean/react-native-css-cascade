import {
  Button as RNButton,
  FlatList as RNFlatList,
  ImageBackground as RNImageBackground,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Modal as RNModal,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  SectionList as RNSectionList,
  Text as RNText,
  TouchableHighlight as RNTouchableHighlight,
  TouchableOpacity as RNTouchableOpacity,
  TouchableWithoutFeedback as RNTouchableWithoutFeedback,
  View as RNView,
  VirtualizedList as RNVirtualizedList
} from 'react-native'

import { wrapContext } from './wrapContext'

/**
 * These are asserted as not `undefined` for testing,
 * but they may be undefined at runtime if the underlying
 * React Native component is undefined at export time.
 */
export const Button = wrapContext(RNButton)!
export const FlatList = wrapContext(RNFlatList)!
export const ImageBackground = wrapContext(RNImageBackground)!
export const KeyboardAvoidingView = wrapContext(RNKeyboardAvoidingView)!
export const Modal = wrapContext(RNModal)!
export const Pressable = wrapContext(RNPressable)!
export const ScrollView = wrapContext(RNScrollView)!
export const SectionList = wrapContext(RNSectionList)!
export const Text = wrapContext(RNText)!
export const TouchableHighlight = wrapContext(RNTouchableHighlight)!
export const TouchableOpacity = wrapContext(RNTouchableOpacity)!
export const TouchableWithoutFeedback = wrapContext(RNTouchableWithoutFeedback)!
export const View = wrapContext(RNView)!
export const VirtualizedList = wrapContext(RNVirtualizedList)!
