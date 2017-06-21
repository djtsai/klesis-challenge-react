import validator from 'validator'

export function validateEmail(email) {
    if (email.length === 0) {
        return null
    }

    return validator.isEmail(email) ? 'success' : 'error'
}

export function validateName(name) {
    if (email.length === 0) {
        return null
    }

    return validator.isAlpha(name) ? 'success' : 'error'
}

export function escape(value) {
    return validator.escape(value)
}
