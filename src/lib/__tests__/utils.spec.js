import { describe, it, expect } from 'vitest'
import { truncateString  } from '../utils'

describe('truncateString', () => {
  it('truncates string when it is too long', () => {
    const testString = 'Test string'
    const truncated = truncateString(testString, 7)
    expect(truncated).toEqual('Test...')
  })
  it('does not truncate string when it is short', () => {
    const testString = 'Test'
    const truncated = truncateString(testString, 5)
    expect(truncated).toEqual('Test')
  })
})
