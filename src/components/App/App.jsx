// @flow
import React, {Component, createRef} from 'react';
import './App.css';
import {validateConfirmPassword, validateEmail, validateName, validatePassword} from "./helpers";
import RenderInput from "../render_input/RenderInput";

type values = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type errors = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type validators = {
    name: Function,
    email: Function,
    password: Function,
    confirmPassword: Function,
}

type AppState = {
    values: values,
    errors: errors,
    validators: validators,
    isSubmitDisables: boolean
}

class App extends Component<{}, AppState> {
    state = {
        values: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        errors: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validators: {
            name: validateName,
            email: validateEmail,
            password: validatePassword,
            confirmPassword: validateConfirmPassword,
        },
        isSubmitDisables: true
    };

    componentDidMount() {
        this.focusInput();
    }

    ref = null;

    setInputRef = (element: HTMLInputElement) => this.ref = element;

    focusInput = () => {
        if (this.ref) this.ref.focus();
    };

    submit = (e: SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        console.log(this.state);
    };

    onChange = (type: string) => (e: SyntheticInputEvent<EventTarget>): void => {
        const {value} = e.target;
        const values = {...this.state.values};
        values[type] = value;
        this.onError(value, type);
        this.setState({values}, () => {
            this.setSubmitDisabled();
        });
    };

    onError = (value: string, type: string): void => {
        const errors = {...this.state.errors};
        //для проверки подтверждения пароля при смене пароля
        if (type === 'password') {
            const error = this.state.validators.confirmPassword(value, this.state.values.confirmPassword);
            errors.confirmPassword = error;
            this.setState({errors});
        }
        const error = this.state.validators[type](value, this.state.values.password);
        errors[type] = error;
        this.setState({errors});
    };

    setSubmitDisabled = (): void => {
        const {values, validators} = this.state;
        for (let key in values) {
            if (validators[key](values[key], values.password)) {
                this.setState({isSubmitDisables: true});
                return;
            }
        }
        this.setState({isSubmitDisables: false});
    };

    render() {
        const {values, errors, isSubmitDisables} = this.state;
        return (
            <div>
                <form onSubmit={this.submit}>
                    <RenderInput
                        setInputRef={this.setInputRef}
                        name={'name'}
                        label={'Name'}
                        placeholder={'type name'}
                        value={values.name}
                        onChange={this.onChange('name')}
                        error={errors.name}
                    />
                    <RenderInput
                        name={'email'}
                        label={'Email'}
                        placeholder={'type email'}
                        value={values.email}
                        onChange={this.onChange('email')}
                        error={errors.email}
                    />
                    <RenderInput
                        name={'password'}
                        type={'password'}
                        label={'Password'}
                        placeholder={'type password'}
                        value={values.password}
                        onChange={this.onChange('password')}
                        error={errors.password}
                    />
                    <RenderInput
                        name={'confirmPassword'}
                        type={'password'}
                        label={'Confirm password'}
                        placeholder={'confirm password'}
                        value={values.confirmPassword}
                        onChange={this.onChange('confirmPassword')}
                        error={errors.confirmPassword}
                    />

                    <button type='submit' disabled={isSubmitDisables}>Отправить</button>
                </form>
            </div>
        );
    }
}


export default App;