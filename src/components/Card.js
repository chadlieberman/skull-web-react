import React from 'react'
import { connect } from 'react-redux'

const Card = ({ id, color, type }) => (
    <div className='card' id={id} type={type}>
        card
    </div>
)

const Cards = ({ cards }) => (
    <div className='cards'>
        {cards.map(card => (
            <Card {...card} key={card.id} />
        ))}
    </div>
)

class CardsContainer extends React.Component {
    componentDidMount() {
        console.log('CardsContainer.componentDidMount')
    }

    render() {
        const { cards } = this.props
        console.log('cards =', cards)
        return (
            <Cards cards={cards} />
        )
    }
}

CardsContainer = connect(
    state => {
        const { items, item_ids} = state.cards
        const cards = [...item_ids].map(id => items[id])
        return {cards}
    }
)(CardsContainer)

export {
    Card,
    Cards,
    CardsContainer,
}
