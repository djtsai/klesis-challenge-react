import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
})

let storeEnhancer
if (process.env.NODE_ENV === 'development') {
    storeEnhancer = applyMiddleware(thunkMiddleware, loggerMiddleware)
} else {
    storeEnhancer = applyMiddleware(thunkMiddleware)
}

const createStoreWithMiddleware = storeEnhancer(createStore)

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    /* eslint-disable */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index')
            store.replaceReducer(nextRootReducer)
        })
    }
    /* eslint-enable */

    return store
}
