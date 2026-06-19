import { type FC } from 'react'
import './App.css'
import Decimal from 'break_eternity.js'

type ResultProps = {
  desired: string;
  current?: string;
  ratePerSecond: string;
}

export const divideAndRemainder = (dividend: Decimal, divisor: Decimal | number | string): [Decimal, Decimal] => {
  const quotient = dividend.divideBy(divisor).trunc();
  const remainder = dividend.mod(divisor);
  return [quotient, remainder];
}

export const calculateResult = ({ desired, current, ratePerSecond }: ResultProps) => {
  const target = new Decimal(desired).subtract(current || 0);
  const dRatePerSecond = new Decimal(ratePerSecond);

  const [minutesRaw, seconds] = divideAndRemainder(target.divideBy(dRatePerSecond), 60);
  const [hoursRaw, minutes] = divideAndRemainder(minutesRaw, 60);
  const [daysRaw, hours] = divideAndRemainder(hoursRaw, 24);
  const [weeksRaw, days] = divideAndRemainder(daysRaw, 7);
  const [years, weeks] = divideAndRemainder(weeksRaw, 52)

  return {
    target,
    seconds,
    minutes,
    hours,
    days,
    weeks,
    years,
  };
}

type ResultRowProps = {
  name: string;
  value: Decimal;
}

const formatResultNumber = (value: Decimal) => {
  if (value.exponent >= 6) {
    return value.toExponential(3);
  }
  return value.round().toNumber();
}

const ResultRow: FC<ResultRowProps> = ({ name, value }) => {
  if (value.toNumber() === 0) {
    return null;
  }
  const formattedNumber = formatResultNumber(value);
  return (
    <tr>
      <td style={{
        textAlign: 'right',
        fontSize: '2em',
        verticalAlign: 'baseline',
      }}>{formattedNumber}</td>
      <th style={{
        textAlign: 'left',
        verticalAlign: 'baseline',
      }}>{name}</th>
    </tr>
  )
}

const Result: FC<ResultProps> = ({ desired, current, ratePerSecond }) => {
  const {
    target,
    seconds,
    minutes,
    hours,
    days,
    weeks,
    years,
  } = calculateResult({ desired, current, ratePerSecond });

  if (years.isNan()) {
    return "Never"
  }

  return (
    <div>
      <h2>Result</h2>
      <p>Target: {target.toExponential(3)}</p>
      <table>
        <tbody>
          <ResultRow name="Years" value={years} />
          <ResultRow name="Weeks" value={weeks} />
          <ResultRow name="Days" value={days} />
          <ResultRow name="Hours" value={hours} />
          <ResultRow name="Minutes" value={minutes} />
          <ResultRow name="Seconds" value={seconds} />
        </tbody>
      </table>
    </div>
  )
}

export default Result
