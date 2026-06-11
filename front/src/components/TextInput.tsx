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
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />
    )
} 