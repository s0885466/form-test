export function validateName(name) {
    return name.length < 6
        ? 'Name must be more than 6 symbols'
        : ''
}

export function validateEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email) ? '' : 'Email is invalid';
}

export function validatePassword(password) {
    return password.length < 6
        ? 'Password must be more than 6 symbols'
        : ''
}