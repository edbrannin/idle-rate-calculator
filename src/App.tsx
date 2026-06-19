import './App.css'
import Result from './Result'
import DecimalInput from './DecimalInput';
import { useSearchParams } from 'react-router';

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

function App() {
  const [sp, setSp] = useSearchParams(DEFAULTS);

  console.log('search params', sp);
  
  // const setter = (name: keyof Form) => (value: string) => setState(({ ...urlState, [name]: value }))

  const targetValue = sp.get('targetValue') || DEFAULTS.targetValue;
  const ratePerSecond = sp.get('ratePerSecond') || DEFAULTS.ratePerSecond;
  const currentValue = sp.get('currentValue') || DEFAULTS.currentValue;
  const setter = (name: keyof Form) => (value: string) => setSp(params => {
    params.set(name, value);
    return params;
  })

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
          <DecimalInput name="Desired Amount" value={targetValue} setter={setter('targetValue')} />
          <DecimalInput name="Rate Per Second" value={ratePerSecond} setter={setter('ratePerSecond')} />
          <DecimalInput name="Current Amount" value={currentValue} setter={setter('currentValue')} />
        </div>
        <div>
          <Result current={currentValue} desired={targetValue} ratePerSecond={ratePerSecond} />
        </div>
      </section>
    </section>
  )
}

export default App
