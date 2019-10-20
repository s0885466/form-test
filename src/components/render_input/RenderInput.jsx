// @flow
import React from 'react';

type RenderInputProps = {
    type: string,
    name: string,
    label: string,
    placeholder: string,
    value: string,
    error: string,
    onChange: ()=>void,
}

function RenderInput({type, name, label, placeholder, value, onChange, error}: RenderInputProps) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input type={type}
                   onChange={onChange}
                   id={name}
                   name={name}
                   value={value}
                   placeholder={placeholder}
                   className={error && 'error'}
            />
            {error && <div className={'errors'}>{error}</div>}
        </div>
    )
}

export default RenderInput;