import React from 'react';
import { Card } from './Card'

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

const Hand = ({ player_number, cards, moveCard, flipCard }) => {
    return (
        <div className='hand'>
            {cards.map((card, idx) => (
                <Card card={card} key={idx}
                    position={`player-${player_number}-hand-${idx}`}
                    moveCard={moveCard}
                    flipCard={flipCard}
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

const Player = (props) => {
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
        <div id={`player-{$player_number}`} className={`player`}>
            {me.name && me.player_number === null &&
                <button onClick={sitDown}>
                    Sit Down
                </button>
            }
        </div>
    )
}

const NonNullPlayer = ({ player_number, player, me, removePlayer }) => {
    const standUp = () => {
        console.log('Stand up from position', player_number)
        removePlayer(player_number)
    }
    return (
        <div id={`player-{$player_number}`} className={`player ${player.color}`}>
            <div className='info'>
                {player.name}
            </div>
            {me.player_number && player_number === me.player_number &&
                <button onClick={standUp}>
                    Stand Up
                </button>
            }
        </div>
    )
}

let App = ({me, game, moveCard, flipCard, addPlayer, removePlayer}) => {
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
    return (
        <div id='app'>
            <div className='main'>
                <div id='players-container'>
                    <h2>Players</h2>
                    <div id='players'>
                        {players.map((player, idx) => (
                            <Player player={player} me={me} addPlayer={addPlayer} removePlayer={removePlayer} player_number={idx} key={idx} />
                        ))}
                    </div>
                </div>
                <div id='hands-container'>
                    <h2>Hands</h2>
                    <div id='hands'>
                        {hands.map((hand, idx) => (
                            <Hand cards={hand} moveCard={moveCard} flipCard={flipCard} player_number={idx} key={idx} />
                        ))}
                    </div>
                </div>
                <div id='stacks-container'>
                    <h2>Stacks</h2>
                    <div id='stacks'>
                        {stacks.map((stack, idx) => (
                            <Stack cards={stack} moveCard={moveCard} flipCard={flipCard} player_number={idx} key={idx} />
                        ))}
                    </div>
                </div>
            </div>
            <Discards discards={discards} moveCard={moveCard} flipCard={flipCard} />
        </div>
    )
}

export default App
