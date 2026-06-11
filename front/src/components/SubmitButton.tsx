import type { ButtonHTMLAttributes,ReactNode } from 'react'

type SubmitButtonProps = {
    children: ReactNode
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    disabled?: boolean
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export function SubmitButton({
    children, 
    type='submit',
    disabled = false,
    onClick, 
}:SubmitButtonProps)
{
    return (
        <button 
            type={type} 
            disabled={disabled}
            onClick={onClick}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {children}
        </button>
    )
}
