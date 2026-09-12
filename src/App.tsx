import './App.css'
import Result from './Result'
import DecimalInput from './DecimalInput';
import { useSearchParams, type SetURLSearchParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';

const DEFAULTS: Form = {
  currentValue: "0",
  targetValue: "123e9",
  ratePerSecond: "1",
};

// use `Type` not `Interface`!
type Form = {
  currentValue: string;
  targetValue: string;
  ratePerSecond: string;
};

const useUrlParam = (sp: [URLSearchParams, SetURLSearchParams], key: keyof Form): [string, (val: string) => void] => {
  const [spValues, spSetters] = sp;
  // Initialize state to URL-params value
  const [value, setter] = useState(() => spValues.get(key) || DEFAULTS[key])
  const valueRef = useRef(value);
  useEffect(() => {
    if (value !== valueRef.current) {
      // Keep URL-params value in sync with state
      spSetters(params => {
        params.set(key, value);
        return params;
      })
      valueRef.current = value;
    }
  }, [key, value, valueRef, spSetters])
  return [value, setter];
}

function App() {
  const params = useSearchParams(DEFAULTS);
  const [targetValue, setTargetValue] = useUrlParam(params, 'targetValue');
  const [ratePerSecond, setRatePerSecond] = useUrlParam(params, 'ratePerSecond');
  const [currentValue, setCurrentValue] = useUrlParam(params, 'currentValue');

  console.log('search params', params);
  
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h1>Idle Rate Calculator</h1>
      <section id="center" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
      }}>
        <div>
          <h2>Inputs</h2>
          <DecimalInput name="Desired Amount" value={targetValue} setter={setTargetValue} />
          <DecimalInput name="Rate Per Second" value={ratePerSecond} setter={setRatePerSecond} />
          <DecimalInput name="Current Amount" value={currentValue} setter={setCurrentValue} />
        </div>
        <div>
          <Result current={currentValue} desired={targetValue} ratePerSecond={ratePerSecond} />
        </div>
      </section>
    </section>
  )
}

export default App
