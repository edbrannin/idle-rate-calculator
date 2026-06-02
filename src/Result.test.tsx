import {test, describe, expect} from 'vitest'
import Decimal from 'break_eternity.js';
import { calculateResult, divideAndRemainder } from './Result';

describe('divideAndRemainder', () => {
  test('divideAndRemainder should turn 90s into 1m, 30s', () => {
    const [quo, rem] = divideAndRemainder(new Decimal(90), 60);
    expect(quo.toNumber()).toBe(1);
    expect(rem.toNumber()).toBe(30);
  })
})
