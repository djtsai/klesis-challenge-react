import { person } from './fixtures/persons-fixture'
import { tasks } from './fixtures/tasks-fixture'
import { teams } from './fixtures/teams-fixture'

const throwError = (statusCode, errorMessage) => {
    const error = new Error(errorMessage)
    error.status = statusCode
    error.response = { text: `{"errors":[{"detail":"${errorMessage}"}]}` }
    throw error
}

module.exports = [{
    pattern: `api/(.*)`,

    fixtures(match) {
        if (match[1].match(/persons/)) {
            return person
        }
        if (match[1].match(/tasks/)) {
            return tasks
        }
        if (match[1].match(/teams$/)) {
            return teams
        }
        if (match[1].match(/teams\/(\d)/)) {
            return [ person, person ]
        }

        throwError(405, 'Invalid route!')
    },

    get(match, data) {
        return { body: data }
    },

    post(match) {
        if (match[1].match(/persons/)) {
            return {
                body: { response: 'Successfully registered!' }
            }
        }
        if (match[1].match(/tasks/)) {
            return null
        }

        throwError(405, 'Could not post to endpoint!')
    },

    put(match) {
        throwError(405, 'Method not allowed for this endpoint!')
    },

    delete(match) {
        throwError(405, 'Method not allowed for this endpoint!')
    }
}]
