import validator from 'validator'

export function validateEmail(email) {
    if (email.length === 0) {
        return null
    }

    return validator.isEmail(email) ? 'success' : 'error'
}
