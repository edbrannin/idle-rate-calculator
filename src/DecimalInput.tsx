import type { FC } from "react";

type InputProps = {
    name: string;
    value: string;
    setter: (v: string) => void;
}

const DecimalInput: FC<InputProps> = ({ name, value, setter }) => (
    <div>
        <h2>{name}</h2>
        <input
            style={{
                fontSize: '2em',
            }}
            value={value}
            onChange={e => setter(e.target.value)}
        />
    </div>
)

export default DecimalInput;