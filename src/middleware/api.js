import request from 'superagent'

const API_URL = '/api'

// Using stub api when running through webpack dev server
if (process.env.NODE_ENV === 'development') {
    const config = require('./api-stub.js')
    require('superagent-mock')(request, config)
}

export function postPerson(email, firstName, lastName) {
    return request.post(`${API_URL}/persons`).send({ email, firstName, lastName })
}

export function getPerson(email) {
    return request.get(`${API_URL}/persons`).query({ email })
}

export function getPersonsFromTeam(teamId) {
    return request.get(`${API_URL}/teams/${teamId}`)
}

export function getTasks() {
    return request.get(`${API_URL}/tasks`)
}

export function postTask(personId, taskId) {
    return request.post(`${API_URL}/tasks`).query({ personId, taskId })
}

export function getTeams() {
    return request.get(`${API_URL}/teams`)
}
