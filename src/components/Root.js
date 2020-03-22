import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import App from './App'

import { moveCard } from '../actions'

class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('Container.componentDidMount')
    }

    render() {
        console.log('Container props=', this.props)
        return (
            <App {...this.props} />
        )
    }
}

Container = connect(
    state => {
        return state
    },
    dispatch => {
        return {
            moveCard: (card_id, to_position) => dispatch(moveCard(card_id, to_position))
        }
    }
)(Container)

const Root = ({ store }) => (
    <Provider store={store}>
        <Container />
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export {
    Root,
}
