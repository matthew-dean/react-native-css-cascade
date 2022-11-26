import React from 'react'
import * as library from '../'
import { render, screen, fireEvent } from '@testing-library/react-native'

const { Button } = library

test('Button', async () => {
  render(<Button title='Button' testID='test' />)
  const result = await screen.findByTestId('test')
  expect(result).toHaveStyle({ color: 'black' })
})
