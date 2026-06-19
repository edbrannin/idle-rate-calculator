import type { FC } from "react";

type InputProps = {
    name: string;
    value: string;
    setter: (v: string) => void;
}

const DecimalInput: FC<InputProps> = ({ name, value, setter }) => (
    <div style={{
        marginTop: '1em',
    }}>
        <h3 style={{
            marginBottom: 0,
        }}>{name}</h3>
        <input
            name={name}
            style={{
                fontSize: '2em',
                width: '7em',
            }}
            value={value}
            onChange={e => setter(e.target.value)}
        />
    </div>
)

export default DecimalInput;