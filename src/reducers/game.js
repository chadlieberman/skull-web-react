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
    discards: Array(24).fill(null),
    players: Array(6).fill(null),
    cards: cards,
    hands: Array(6).fill(Array(4).fill(null)),
    mats: mats,
    stacks: Array(6).fill([])
}

const removeCard = (card_id) => (card) => {
    return card.id == card_id ? null : card
}

const STACK_RE = /player-(?<player_number>\d)-stack/gi
const HAND_RE = /player-(?<player_number>\d)-hand-(?<hand_position>\d)/gi

const game = (state = initial_state, action) => {
    let discards, hands, stacks, first_open_pos, found, players
    const { type, player_number, name, card_id, to_position, mat_id } = action
    switch (action.type) {

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
            return Object.assign({}, state, {
                cards: cards.map(card => {
                    if (card.id === card_id) {
                        card.is_flipped = !card.is_flipped
                    }
                    return card
                })
            })

        case 'MOVE_CARD':
            // Remove the card from where it is now
            discards = state.discards.map(removeCard(card_id))
            hands = state.hands.map(removeCard(card_id))
            stacks = state.stacks.map(removeCard(card_id))
            // Put the card in it's to_position
            if (to_position.contains('discard')) {
                first_open_pos = discards.find(el => el === null)
                discards[first_open_pos] = card_id
            } else if (to_position.contains('stack')) {
                found = to_position.match(STACK_RE)
                let { player_number } = found
                let stack = stacks[player_number]
                first_open_pos = stack.find(el => el === null)
                stack[first_open_pos] = card_id
                stacks[player_number] = stack
            } else if (to_position.contains('hand')) {
                found = to_position.match(STACK_RE)
                let { player_number, hand_position } = found
                hands[player_number][hand_position] = card_id
            } else {
                console.error(`Could not move card ${card_id} to ${to_position}`)
            }
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
