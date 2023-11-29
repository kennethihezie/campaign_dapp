import { ChangeEvent } from "react"

interface IInputProp {
    hint: string
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
    required: boolean
    type: string
}

const Input = ({hint, required, type, onChange}: IInputProp) => {
    return (
        <input onChange={ onChange } type={ type } className="border border-blue-300 rounded-md px-3 py-2 w-full" placeholder={ hint} required={ required } />
    )
}

export default Input