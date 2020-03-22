// Me
export const setName = (name) => ({
    type: 'SET_NAME',
    name
})

// Player
export const addPlayer = (player_number, name) => ({
    type: 'ADD_PLAYER',
    player_number,
    name
})

export const removePlayer = (player_number) => ({
    type: 'REMOVE_PLAYER',
    player_number
})

// Card

export const flipCard = (card_id) => ({
    type: 'FLIP_CARD',
    card_id
})

export const moveCard = (card_id, to_position) => ({
    type: 'MOVE_CARD',
    card_id,
    to_position
})

// Mat
export const flipMat = (mat_id) => ({
    type: 'FLIP_MAT',
    mat_id
})


