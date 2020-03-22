import React from 'react';
import { Card } from './Card'

const COLORS = ['red', 'orange', 'blue', 'green', 'purple', 'yellow']

const Discards = ({ discards, moveCard, flipCard }) => {
    const onDrop = (e) => {
        e.preventDefault()
        const card_id = e.dataTransfer.getData('draggable_id')
        moveCard(card_id, 'discard')
    }
    return (
        <div id='discards-container'>
            <h2>Discards</h2>
            <div id='discards'
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {discards.map((card, idx) => (
                    <Card card={card} key={idx}
                        position={`discard-${idx}`}
                        moveCard={moveCard}
                        flipCard={flipCard}
                    />
                ))}
            </div>
        </div>
    )
}

const Hand = ({ player_number, cards, moveCard, flipCard, is_me }) => {
    return (
        <div className='hand'>
            {cards.map((card, idx) => (
                <Card card={card} key={idx}
                    position={`player-${player_number}-hand-${idx}`}
                    moveCard={moveCard}
                    flipCard={flipCard}
                    is_me={is_me}
                    in_hand={true}
                />
            ))}
        </div>
    )
}

const Stack = ({ player_number, cards, moveCard, flipCard }) => {
    const onDrop = (e) => {
        e.preventDefault()
        const card_id = e.dataTransfer.getData('draggable_id')
        const position = `player-${player_number}-stack`
        console.log('move card', card_id, 'to', position)
        moveCard(card_id, position)
    }
    return (
        <div className='stack'
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            {cards.map((card, idx) => (
                <Card card={card} key={idx}
                    position={`player-${player_number}-stack`}
                    moveCard={moveCard}
                    flipCard={flipCard}
                />
            ))}
        </div>
    )
}

const Seat = (props) => {
    if (props.player === null) {
        return <NullPlayer {...props} />
    } else {
        return <NonNullPlayer {...props} />
    }
}

const NullPlayer = ({ player_number, player, me, addPlayer }) => {
    const sitDown = () => {
        if (me.name === null) return
        console.log('Sitting down at position', player_number)
        addPlayer(player_number, me.name)
    }
    return (
        <div id={`player-${player_number}`} className='player-section'>
            <div className={`player ${COLORS[player_number]}`} />
            <div className='buttons'>
                {me.name !== null && me.player_number === null &&
                    <button onClick={sitDown}>
                        Sit Down
                    </button>
                }
            </div>
        </div>
    )
}

const NonNullPlayer = ({ player_number, player, me, removePlayer }) => {
    const standUp = () => {
        console.log('Stand up from position', player_number)
        removePlayer(player_number)
    }
    return (
        <div id={`player-${player_number}`} className='player-section'>
            <div className={`player ${COLORS[player_number]}`}>
                {player.name}
            </div>
            <div className='buttons'>
                {me.player_number !== null && player_number === me.player_number &&
                    <button onClick={standUp}>
                        Stand Up
                    </button>
                }
            </div>
        </div>
    )
}

class GetName extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this)
        this.enterGame = this.enterGame.bind(this)
        this.state = {
            name: '',
            error: null
        }
    }

    componentDidMount() {
        console.log('GetName.componentDidMount()')
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    enterGame() {
        const { name } = this.state
        if (name.length > 10) {
            this.setState({
                error: 'Name cannot be more than ten characters'
            })
            return
        }
        if (name.length < 2) {
            this.setState({
                error: 'Name must be at least two characters'
            })
            return
        }
        if (!(/[a-z]+$/.test(name))) {
            this.setState({
                error: 'Name must be only [a-z] characters'
            })
            return
        }
        this.props.setName(name)
    }

    render() {
        const { setName } = this.props
        const { name, error } = this.state
        return (
            <div>
                <h1>Skull</h1>
                <h3>It is always a skull</h3>
                <div id='set-name'>
                    <p>Enter your name (only use [a-z])</p>
                    <input type='text' value={name} onChange={this.onChangeName} />
                    <button onClick={this.enterGame}>
                        Enter
                    </button>
                    {error && (
                        <div className='error'>{error}</div>
                    )}
                </div>
            </div>
        )
    }
}

const PlayerSection = ({ player_section, is_me, me, addPlayer, removePlayer, player_number, flipCard, moveCard }) => {
    const { player, hand, stack } = player_section
    return (
        <div className='player-section'>
            <Stack
                player_number={player_number}
                cards={stack}
                moveCard={moveCard}
                flipCard={flipCard}
            />
            <Seat
                player={player}
                me={me}
                addPlayer={addPlayer}
                removePlayer={removePlayer}
                player_number={player_number}
            />
            <Hand
                player_number={player_number}
                cards={hand}
                moveCard={moveCard}
                flipCard={flipCard}
                is_me={is_me}
            />
        </div>
    )
}

let App = ({me, room, game, moveCard, flipCard, addPlayer, removePlayer, setName}) => {
    if (me.name === null) {
        return (
            <GetName setName={setName} />
        )
    }
    let {discards, players, cards, hands, mats, stacks} = game
    discards = discards.map(card_id => {
        return card_id === null ? null : cards[card_id]
    })
    hands = hands.map(hand => {
        hand = hand.map(card_id => {
            return card_id === null ? null : cards[card_id]
        })
        return hand
    })
    stacks = stacks.map(stack => {
        stack = stack.map(card_id => {
            return card_id === null ? null : cards[card_id]
        })
        return stack
    })
    const player_sections = game.players.map((player, idx) => {
        return {
            player,
            hand: hands[idx],
            stack: stacks[idx]
        }
    })
    return (
        <div id='app'>
            <div id='main'>
                {player_sections.map((player_section, player_number) => {
                    const is_me = me.player_number === player_number
                    return <PlayerSection player_section={player_section} is_me={is_me} me={me} addPlayer={addPlayer} removePlayer={removePlayer} player_number={player_number} key={player_number} moveCard={moveCard} flipCard={flipCard} />
                })}
            </div>
            <div id='sidebar'>
                <Discards discards={discards} moveCard={moveCard} flipCard={flipCard} />
                <div id='room-container'>
                    <h2>Room</h2>
                    <ul id='members'>
                        {room.members.map((member) => (
                            <li>
                                <img src={'/static/img/fa-user.png'} /><span>{member}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default App
