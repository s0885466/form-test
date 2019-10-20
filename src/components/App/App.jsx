
import React, {Component} from 'react';
import './App.css';
import {validateEmail, validateName, validatePassword} from "./helpers";
import RenderInput from "../render_input/RenderInput";
class App extends Component<{}> {
    state = {
        values: {
            name: '',
            email: '',
            password: '',
        },
        errors: {
            name: '',
            email: '',
            password: '',
        },

        validators: {
            name: validateName,
            email: validateEmail,
            password: validatePassword
        },
        isSubmitDisables: true
    };

    submit = e => {
        e.preventDefault();
    };

    onChange = (type:string) => (e:KeyboardEvent) => {
        const {value} = e.target;
        const values = {...this.state.values};
        values[type] = value;
        this.onError(value, type);
        this.setState({values}, () => {
            this.setSubmitDisabled();
        });
    };

    onError = (value, type) => {
        const error = this.state.validators[type](value);
        const errors = {...this.state.errors};
        errors[type] = error;
        this.setState({errors});
    };

    setSubmitDisabled = () => {
        const {values, validators} = this.state;
        for (let key in values) {
            if (validators[key](values[key])) {
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
                        label={'Password'}
                        placeholder={'type password'}
                        value={values.password}
                        onChange={this.onChange('password')}
                        error={errors.password}
                    />

                    <button type='submit' disabled={isSubmitDisables}>Отправить</button>
                </form>
            </div>
        );
    }
}


export default App;