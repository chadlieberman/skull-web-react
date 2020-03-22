import socket from '../socket'

// Me
export const setName = (name) => {
    return (dispatch) => {
        const action = {
            type: 'SET_NAME',
            name
        }
        socket.emit('action', action)
        dispatch(action)
        dispatch({
            type: 'ADD_MEMBER',
            name
        })
    }
}

// Player
export const addPlayer = (player_number, name) => {
    return (dispatch) => {
        const action = {
            type: 'ADD_PLAYER',
            player_number,
            name
        }
        socket.emit('action', action)
        dispatch(action)
    }
}

export const removePlayer = (player_number) => {
    return (dispatch) => {
        const action = {
            type: 'REMOVE_PLAYER',
            player_number
        }
        socket.emit('action', action)
        dispatch(action)
    }
}

// Card

export const flipCard = (card_id) => {
    return (dispatch) => {
        const action = {
            type: 'FLIP_CARD',
            card_id
        }
        socket.emit('action', action)
        dispatch(action)
    }
}

export const moveCard = (card_id, to_position) => {
    return (dispatch) => {
        const action = {
            type: 'MOVE_CARD',
            card_id,
            to_position
        }
        socket.emit('action', action)
        dispatch(action)
    }
}

// Mat
export const flipMat = (mat_id) => {
    return (dispatch) => {
        const action = {
            type: 'FLIP_MAT',
            mat_id
        }
        socket.emit('action', action)
        dispatch(action)
    }
}


