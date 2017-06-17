import React from 'react'
import NavHeader from '../../components/NavHeader'
import { isLoggedIn } from '../../utils/authManagement'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!isLoggedIn()) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div className="home-container">
                <NavHeader/>
            </div>
        )
    }
}

export default Home
