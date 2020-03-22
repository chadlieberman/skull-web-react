import React from 'react';
import { Card, CardsContainer } from './Card'

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

const Stack = ({ player_number, stack, moveCard, flipCard }) => {
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
            {stack.map((card, idx) => (
                <Card card={card} key={idx}
                    position={`player-${player_number}-stack`}
                    moveCard={moveCard}
                    flipCard={flipCard}
                />
            ))}
        </div>
    )
}

let App = ({game, moveCard, flipCard}) => {
    let {discards, players, cards, hands, mats, stacks} = game
    discards = discards.map(card_id => {
        return card_id === null ? null : cards[card_id]
    })
    const card = cards['card_0']
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
                            <Stack stack={stack} moveCard={moveCard} flipCard={flipCard} player_number={idx} key={idx} />
                        ))}
                    </div>
                </div>
            </div>
            <Discards discards={discards} moveCard={moveCard} flipCard={flipCard} />
        </div>
    )
}

export default App
