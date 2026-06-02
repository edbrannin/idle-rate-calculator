import { useState } from 'react'
import './App.css'
import Result from './Result'
import DecimalInput from './DecimalInput';

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [targetValue, setTargetValue] = useState("123e9");
  const [ratePerSecond, setRatePerSecond] = useState("1");

  return (
    <>
      <section id="center" style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div>
          <DecimalInput name="Desired Amount" value={targetValue.toString()} setter={setTargetValue} />
          <DecimalInput name="Rate Per Second" value={ratePerSecond.toString()} setter={setRatePerSecond} />
          <DecimalInput name="Current Amount" value={currentValue.toString()} setter={setCurrentValue} />
        </div>
        <div>
          <Result current={currentValue} desired={targetValue} ratePerSecond={ratePerSecond} />
        </div>
      </section>


      <section id="spacer"></section>
    </>
  )
}

export default App
