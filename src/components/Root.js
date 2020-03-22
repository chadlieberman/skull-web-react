import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import App from './App'

import { moveCard, flipCard, addPlayer, removePlayer, setName } from '../actions'

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
            moveCard: (card_id, to_position) => dispatch(moveCard(card_id, to_position)),
            flipCard: (card_id) => dispatch(flipCard(card_id)),
            addPlayer: (player_number, name) => dispatch(addPlayer(player_number, name)),
            removePlayer: (player_number) => dispatch(removePlayer(player_number)),
            setName: (name) => dispatch(setName(name))
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
