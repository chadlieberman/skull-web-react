import io from 'socket.io-client'
import store from './index'

import { removePlayer } from './actions'

// Setup socket
const socket = io(window.location.href)
socket.on('message', data => {
    console.log('got message')
    console.log(data)
})
socket.on('action', action => {
    console.log('received action', action)
    store.dispatch(action)
})

window.onbeforeunload = () => {
    const state = store.getState()
    const { me } = state
    const { player_number } = me
    if (player_number !== null) {
        store.dispatch(removePlayer(player_number))
    }
    socket.disconnect()
}

export default socket
