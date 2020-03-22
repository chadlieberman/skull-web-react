import io from 'socket.io-client'
import store from './index'
// Setup sockets
const socket = io(window.location.href)
socket.on('message', data => {
    console.log('got message')
    console.log(data)
})
socket.on('action', action => {
    console.log('received action', action)
    store.dispatch(action)
})

socket.emit('action', {this: 1})

export default socket
