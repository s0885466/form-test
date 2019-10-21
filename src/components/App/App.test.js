import React from 'react';
import {shallow, mount, render} from 'enzyme';
import App from "./App";
import {validateConfirmPassword, validateEmail, validateName, validatePassword} from "./helpers";

describe('Testing snapshop <App/>', () => {
    it('App have rendered correctly', () => {
        const app = shallow(<App/>);
        expect(app).toMatchSnapshot();
    })
});

describe('Testing state types <App/>', () => {
    const app = shallow(<App/>);
    it('values should be an Object', () => {
        expect(app.state().values).toBeObject();
    });
    it('isSubmitDisables = true', () => {
        expect(app.state().isSubmitDisables).toBeTrue();
    })
});

describe('Testing handlers <App/>', () => {
    it('onChange name input', () => {
        const app = shallow(<App/>);
        const event = {target: {value: "spam"}};
        app.instance().onChange('name')(event);
        expect(app.state().values.name).toBe(event.target.value);
        expect(app.state().errors.name).toBe('Name must be more than 6 symbols')
    })
});

describe('testing submit button', () => {

    it('button must not be disabled', () => {
        const values = {
            name: 'alinovskiy',
            email: 'alinovskiy@mail.ru',
            password: '111111',
            confirmPassword: '111111',
        };
        const app = shallow(<App/>);
        app.state().values = values;
        app.instance().setSubmitDisabled();
        expect(app.state().isSubmitDisables).toBeFalse();
    });

    it('button must be disabled 1', () => {
        const values = {
            name: 'alinovskiy',
            email: 'alinovskiy@mail.ru',
            password: '111111',
            confirmPassword: '1',
        };
        const app = shallow(<App/>);
        app.state().values = values;
        app.instance().setSubmitDisabled();
        expect(app.state().isSubmitDisables).toBeTrue();
    });

    it('button must be disabled 2', () => {
        const values = {
            name: 'sss',
            email: 'alinovskiy@mail.ru',
            password: '111111',
            confirmPassword: '111111',
        };

        const app = shallow(<App/>);
        app.state().values = values;
        app.instance().setSubmitDisabled();
        expect(app.state().isSubmitDisables).toBeTrue();
    });
});
