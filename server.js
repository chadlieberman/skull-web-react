import express from 'express'
import http from 'http'
import path from 'path'
import socketIO from 'socket.io'
import { combineReducers, createStore } from 'redux'
import game from './src/reducers/game'
import room from './src/reducers/room'

let app = express()
const server = http.Server(app)
let io = socketIO(server)


let connections = {}

const PORT = process.env.PORT || 5000

app.set('port', PORT)

app.use('/static', express.static(__dirname + '/build/static'))

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'build/index.html'))
})

const store = createStore(
    combineReducers({ game, room })
)

const handleDisconnect = (socket) => () => {
    console.log('disconnection', socket.id)
    const member_action = {
        type: 'REMOVE_MEMBER',
        name: connections[socket.id].name
    }
    store.dispatch(member_action)
    socket.broadcast.emit('action', member_action)
    delete connections[socket.id]
}

const handleAction = (socket) => (action) => {
    console.log(`[${socket.id}]:`, action)
    switch (action.type) {
        case 'SET_NAME':
            connections[socket.id].name = action.name
            const member_action = {
                type: 'ADD_MEMBER',
                name: action.name
            }
            store.dispatch(member_action)
            socket.broadcast.emit('action', member_action)
            return
        default:
            store.dispatch(action)
            console.log('sending action', action, 'to others')
            socket.broadcast.emit('action', action)
    }
}

const handleConnect = (socket) => {
    connections[socket.id] = { socket, name: null }
    socket.on('disconnect', handleDisconnect(socket))
    socket.on('action', handleAction(socket))
    const state = store.getState()
    socket.emit('action', {
        type: 'REPLACE',
        game: state.game,
        room: state.room,
    })
}

io.on('connection', handleConnect)

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

