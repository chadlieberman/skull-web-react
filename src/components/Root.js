import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import App from './App'

import { moveCard, flipCard, flipMat, addPlayer, removePlayer, setName, shuffleHand } from '../actions'

const Header = () => (
    <div id='header'>
        <p>Skull is a fun game of betting and bluffing. I did not invent it. I just put it online. You can read the rules <a target='_blank' rel="noopener noreferrer" href='https://www.ultraboardgames.com/skull-and-roses/game-rules.php'>here</a>. You can buy the real game <a target='_blank' rel="noopener noreferrer" href='https://www.amazon.com/Asmodee-SKR01-Skull/dp/B00GYDLY8E'>here</a>.</p>
    </div>
)

class Container extends React.Component {

    componentDidMount() {
        console.log('Container.componentDidMount')
    }

    render() {
        return (
            <div>
                <Header />
                <App {...this.props} />
            </div>
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
            setName: (name) => dispatch(setName(name)),
            flipMat: (mat_id) => dispatch(flipMat(mat_id)),
            shuffleHand: (player_number) => dispatch(shuffleHand(player_number)),
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
