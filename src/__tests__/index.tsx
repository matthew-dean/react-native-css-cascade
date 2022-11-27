import React from 'react'
import * as library from '../'
import TestRenderer from 'react-test-renderer'

const {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  VirtualizedList
} = library

describe('inherits root style', () => {
  const testComponent = async (jsx: JSX.Element) => {
    const renderer = TestRenderer.create(jsx)
    expect((renderer.toJSON() as any)?.props?.style?.color).toBe('black')
  }

  test('FlatList', async () => {
    await testComponent(<FlatList data={[]} renderItem={() => null} testID='test' />)
  })

  test('ImageBackground', async () => {
    await testComponent(<ImageBackground testID='test' />)
  })

  test('KeyboardAvoidingView', async () => {
    await testComponent(<KeyboardAvoidingView testID='test' />)
  })

  test('Modal', async () => {
    await testComponent(<Modal testID='test' />)
  })

  test('Pressable', async () => {
    await testComponent(<Pressable testID='test' />)
  })

  test('ScrollView', async () => {
    await testComponent(<ScrollView testID='test' />)
  })

  test('SectionList', async () => {
    await testComponent(<SectionList sections={[]} testID='test' />)
  })

  test('Text', async () => {
    await testComponent(<Text testID='test' />)
  })

  test('TouchableHighlight', async () => {
    await testComponent(<TouchableHighlight testID='test'><Text /></TouchableHighlight>)
  })

  test('TouchableOpacity', async () => {
    await testComponent(<TouchableOpacity testID='test'><Text /></TouchableOpacity>)
  })

  test('TouchableWithoutFeedback', async () => {
    await testComponent(<TouchableWithoutFeedback testID='test'><Text /></TouchableWithoutFeedback>)
  })

  test('SafeAreaView', async () => {
    await testComponent(<SafeAreaView testID='test' />)
  })

  test('View', async () => {
    await testComponent(<View testID='test' />)
  })

  test('VirtualizedList', async () => {
    await testComponent(<VirtualizedList renderItem={() => null} getItemCount={() => 0} testID='test' />)
  })
})

describe('adds styles', () => {
  const testComponent = async (jsx: JSX.Element) => {
    const renderer = TestRenderer.create(jsx)
    expect((renderer.toJSON() as any)?.props?.style?.color).toBe('blue')
  }

  test('FlatList', async () => {
    await testComponent(<FlatList data={[]} renderItem={() => null} testID='test' style={{ color: 'blue' }} />)
  })

  test('ImageBackground', async () => {
    await testComponent(<ImageBackground testID='test' style={{ color: 'blue' }} />)
  })

  test('KeyboardAvoidingView', async () => {
    await testComponent(<KeyboardAvoidingView testID='test' style={{ color: 'blue' }} />)
  })

  test('Modal', async () => {
    await testComponent(<Modal testID='test' style={{ color: 'blue' }} />)
  })

  test('Pressable', async () => {
    await testComponent(<Pressable testID='test' style={{ color: 'blue' }} />)
  })

  test('ScrollView', async () => {
    await testComponent(<ScrollView testID='test' style={{ color: 'blue' }} />)
  })

  test('SectionList', async () => {
    await testComponent(<SectionList sections={[]} testID='test' style={{ color: 'blue' }} />)
  })

  test('Text', async () => {
    await testComponent(<Text testID='test' style={{ color: 'blue' }} />)
  })

  test('TouchableHighlight', async () => {
    await testComponent(<TouchableHighlight testID='test' style={{ color: 'blue' }} ><Text /></TouchableHighlight>)
  })

  test('TouchableOpacity', async () => {
    await testComponent(<TouchableOpacity testID='test' style={{ color: 'blue' }} ><Text /></TouchableOpacity>)
  })

  test('TouchableWithoutFeedback', async () => {
    await testComponent(<TouchableWithoutFeedback testID='test' style={{ color: 'blue' }} ><Text /></TouchableWithoutFeedback>)
  })

  test('SafeAreaView', async () => {
    await testComponent(<SafeAreaView testID='test' style={{ color: 'blue' }}  />)
  })

  test('View', async () => {
    await testComponent(<View testID='test' style={{ color: 'blue' }}  />)
  })

  test('VirtualizedList', async () => {
    await testComponent(<VirtualizedList renderItem={() => null} getItemCount={() => 0} testID='test' style={{ color: 'blue' }}  />)
  })
})

describe('passes on only inheritable styles', () => {
  test('View', async () => {
    const renderer = TestRenderer.create(
      <View style={{ color: 'blue', lineHeight: 1, backgroundColor: 'red' }}>
        <Text />
      </View>
    )
    const textNodeStyles = (renderer.toJSON() as any)?.children?.[0]?.props?.style
    expect(textNodeStyles.color).toBe('blue')
    expect(textNodeStyles.lineHeight).toBe(1)
    expect(textNodeStyles.backgroundColor).toBeUndefined()
  })

  test('Text', async () => {
    const renderer = TestRenderer.create(
      <View style={{ lineHeight: 1, backgroundColor: 'red' }}>
        <Text style={{ fontSize: 12 }}>
          <Text />
        </Text>
      </View>
    )
    let textNodeStyles = (renderer.toJSON() as any)?.children?.[0]?.props?.style
    expect(textNodeStyles.color).toBe('black')
    expect(textNodeStyles.lineHeight).toBe(1)
    expect(textNodeStyles.backgroundColor).toBeUndefined()
    expect(textNodeStyles.fontSize).toBe(12)
    textNodeStyles = (renderer.toJSON() as any)?.children?.[0]?.children?.[0]?.props?.style
    expect(textNodeStyles.color).toBe('black')
    expect(textNodeStyles.lineHeight).toBe(1)
    expect(textNodeStyles.backgroundColor).toBeUndefined()
    expect(textNodeStyles.fontSize).toBe(12)
  })
})