import type { ButtonHTMLAttributes } from 'react'

type SubmitButtonProps = {
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    disabled: boolean
}

export function SubmitButton
    ({disabled, type='submit'}:SubmitButtonProps)
{
    return (
        <button 
            disabled={disabled}
            type={type}
            >

        </button>
    )
}
