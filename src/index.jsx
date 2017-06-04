import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import configureStore from './configureStore'
import KlesisChallenge from './containers/KlesisChallenge'
import { render } from 'react-dom'

const store = configureStore()

class App extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path="/" component={KlesisChallenge}/>
                </BrowserRouter>
            </Provider>
        )
    }
}

render(<App/>, document.getElementById('app'))
