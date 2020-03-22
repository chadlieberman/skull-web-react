import React from 'react';
import { Card, CardsContainer } from './Card'

const Discards = ({ discards, moveCard }) => {
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
                    <Card card={card} position={`discard-${idx}`} moveCard={moveCard} key={idx} />
                ))}
            </div>
        </div>
    )
}

const Hand = ({ hand_position, cards, moveCard }) => {
    return (
        <div className='hand'>
            {cards.map((card, idx) => (
                <Card card={card} position={`player-${hand_position}-hand-${idx}`} moveCard={moveCard} key={idx} />
            ))}
        </div>
    )
}

let App = ({game, moveCard}) => {
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
    return (
        <div id='app'>
            <div className='main'>
                <div id='hands-container'>
                    <h2>Hands</h2>
                    <div id='hands'>
                        {hands.map((hand, idx) => (
                            <Hand cards={hand} moveCard={moveCard} hand_position={idx} key={idx} />
                        ))}
                    </div>
                </div>
            </div>
            <Discards discards={discards} moveCard={moveCard} />
        </div>
    )
}

export default App
