const initial_state = {
    name: null,
    player_number: null,
}

const me = (state = initial_state, action) => {
    const { name, player_number } = action
    switch (action.type) {
        case 'SET_NAME':
            return Object.assign({}, state, { name })
        case 'ADD_PLAYER':
            if (name === state.name) {
                return Object.assign({}, state, { player_number })
            }
            return state
        case 'REMOVE_PLAYER':
            if (player_number === state.player_number) {
                return Object.assign({}, state, { player_number: null })
            }
            return state
        case 'REPLACE':
            return Object.assign({}, state, { player_number: null })
        default:
            return state
    }
}

export default me
