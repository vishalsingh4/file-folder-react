import React from 'react'

export const Input = ({
    type = 'text',
    value = '',
    className = '',
    placeholder = 'Please enter value',
    onChange = () => { },
    onKeyDown = () => { },
    ...restProps
}) => {
    return (
        <input
            type={type}
            value={value}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            {...restProps}
        />
    )
}

export default Input;
