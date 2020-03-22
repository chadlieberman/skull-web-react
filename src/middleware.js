import socket from './socket'

export const logger = store => next => action => {
    //console.log('logging action =', action)
    let result = next(action)
    return result
}

export const sendAction = store => next => action => {
    //console.log('emitting action =', action)
    socket.emit('action', action)
    let result = next(action)
    return result
}
