// @flow
import React from 'react';

type RenderInputProps = {
    type?: string,
    name: string,
    label: string,
    placeholder: string,
    value: string,
    error: string,
    onChange: Function,
    setInputRef?: Function
}

function RenderInput({type='text', name, label, placeholder, value, onChange, error, setInputRef}: RenderInputProps) {

    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input type={type}
                   ref={setInputRef}
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