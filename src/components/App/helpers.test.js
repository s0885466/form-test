import {validateName, validatePassword, validateEmail} from "./helpers";

describe('validateEmail', () => {
    it('Check normal email', () => {
        expect(validateEmail('0885466@gmail.com')).toBe('');
    });
    it('Check fail email', () => {
        expect(validateEmail('0885466gmail.com')).toBe('Email is invalid');
    });
});