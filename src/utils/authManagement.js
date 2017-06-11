const personId = 'grow-together-personId'
const personEmail = 'grow-together-personEmail'

export function login(id, email) {
    sessionStorage.setItem(personId, id)
    sessionStorage.setItem(personEmail, email)
}

export function isLoggedIn() {
    return sessionStorage.getItem(personId)
}

export function logout() {
    sessionStorage.removeItem(personId)
    sessionStorage.removeItem(personEmail)
}
