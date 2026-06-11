type TextInputProps = {
    value: string
    onChange: (value: string) => void
    placeholder: string
    type?: string
}

export function TextInput
    ({ value, onChange, placeholder, type='text'}: TextInputProps)
{
    return (
        <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            type={type}
        />
    )
} 