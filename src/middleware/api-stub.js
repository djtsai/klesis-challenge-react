import { person } from './fixtures/persons-fixture'
import { tasks } from './fixtures/tasks-fixture'

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

        throwError(405, 'Invalid route!')
    },

    get(match, data) {
        return { body: data }
    },

    post(match) {
        switch (match[1]) {
            case 'persons':
                return {
                    body: { response: 'Successfully registered!' }
                }
            default:
                throwError(500, 'Could not post to endpoint!')
        }
    },

    put(match) {
        throwError(405, 'Method not allowed for this endpoint!')
    },

    delete(match) {
        throwError(405, 'Method not allowed for this endpoint!')
    }
}]
