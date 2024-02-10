// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 9, b: 1, action: Action.Subtract, expected: 8 },
  { a: 7, b: 4, action: Action.Subtract, expected: 3 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 3, action: 'invalid_action' as any, expected: null },
  { a: '1', b: 2, action: Action.Add as any, expected: null },
  { a: 4, b: '7', action: Action.Add as any, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given %p as arguments, returns %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
