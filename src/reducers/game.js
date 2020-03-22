const COLORS = ['red', 'orange', 'blue', 'green', 'purple', 'yellow']
const CARD_TYPES = ['rose', 'skull']

let cards = [...Array(24).keys()].map(num => ({
    id: `card_${num}`,
    color: COLORS[Math.floor(num / 4)],
    type: CARD_TYPES[(num % 4 === 0) ? 1 : 0],
    is_flipped: false
}))

let mats = [...Array(6).keys()].map(num => ({
    id: `mat_${num}`,
    color: COLORS[num],
    is_flipped: false
}))

// Sample card positions
// first position of player 3's hand
// position = 'player-3-hand-0'
// player 2's stack
// position = 'player-2-stack'
// discard pile
// position = 'discard'

const initial_state = {
    discards: [],
    players: [
        null,
        null,
        {
            name: 'Test Name',
            color: COLORS[2]
        },
        null,
        null,
        null], //Array(6).fill(null),
    cards: cards.reduce((curr, next) => {
        return Object.assign({}, curr, {
            [next.id]: next
        })
    }, {}),
    hands: [
        cards.slice(0, 4).map(card => card.id),
        cards.slice(4, 8).map(card => card.id),
        cards.slice(8, 12).map(card => card.id),
        cards.slice(12, 16).map(card => card.id),
        cards.slice(16, 20).map(card => card.id),
        cards.slice(20, 24).map(card => card.id)],
    mats: mats.reduce((curr, next) => {
        return Object.assign({}, curr, {
            [next.id]: next
        })
    }, {}),
    stacks: Array(6).fill([])
}

const removeCard = (removed_card_id) => (card_id) => {
    if (card_id === null){ return null }
    return card_id === removed_card_id ? null : card_id
}

const filterOutCard = (removed_card_id) => (card_id) => {
    return card_id !== removed_card_id
}

const STACK_RE = /player-(?<player_number>\d)-stack/
const HAND_RE = /player-(?<player_number>\d)-hand-(?<hand_position>\d)/

const game = (state = initial_state, action) => {
    let discards, hands, stacks, first_open_pos, found, players
    const { player_number, name, card_id, to_position, mat_id } = action
    switch (action.type) {

        case 'REPLACE':
            return Object.assign({}, state, {...action.game})

        case 'ADD_PLAYER':
            players = state.players
            players[player_number] = {
                name,
                color: COLORS[player_number]
            }
            return Object.assign({}, state, {
                players
            })

        case 'REMOVE_PLAYER':
            players = state.players
            players[player_number] = null
            return Object.assign({}, state, {
                players
            })

        case 'FLIP_CARD':
            let new_cards = state.cards
            new_cards[card_id].is_flipped = !new_cards[card_id].is_flipped
            return Object.assign({}, state, {
                cards: new_cards
            })

        case 'MOVE_CARD':
            console.log('MOVE_CARD', card_id, 'to', to_position)
            // Remove the card from where it is now
            discards = state.discards.filter(filterOutCard(card_id))
            hands = state.hands.map(hand => {
                return hand.map(removeCard(card_id))
            })
            stacks = state.stacks.map(stack => {
                return stack.filter(filterOutCard(card_id))
            })
            // Put the card in it's to_position
            if (to_position.includes('discard')) {
                first_open_pos = discards.findIndex(el => el === null)
                discards.push(card_id)
            } else if (to_position.includes('stack')) {
                found = to_position.match(STACK_RE)
                let { player_number } = found.groups
                console.log('player_number', player_number)
                stacks[player_number].push(card_id)
            } else if (to_position.includes('hand')) {
                found = to_position.match(HAND_RE)
                let { player_number, hand_position } = found.groups
                hands[player_number][hand_position] = card_id
            } else {
                console.error(`Could not move card ${card_id} to ${to_position}`)
            }
            console.log('stacks =', stacks)
            return Object.assign({}, state, {
                discards,
                hands,
                stacks
            })

        case 'FLIP_MAT':
            return Object.assign({}, state, {
                mats: mats.map(mat => {
                    if (mat.id === mat_id) {
                        mat.is_flipped = !mat.is_flipped
                    }
                    return mat
                })
            })

        default:
            return state
    }
}

export default game
