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

describe('calculateResult', () => {
  test('Should calculate small numbers', () => {
    const answer = calculateResult({
      desired: '60',
      ratePerSecond: '5',
      current: '30',
    })
    expect(answer.seconds.toNumber()).toBe(6);
    expect(answer.minutes.toNumber()).toBe(0);
    expect(answer.hours.toNumber()).toBe(0);
    expect(answer.days.toNumber()).toBe(0);
    expect(answer.weeks.toNumber()).toBe(0);
    expect(answer.years.toNumber()).toBe(0);
  })
})
