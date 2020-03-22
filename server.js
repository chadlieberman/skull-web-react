import express from 'express'
import http from 'http'
import path from 'path'
import socketIO from 'socket.io'
import { combineReducers, createStore } from 'redux'
import game from './src/reducers/game'

let app = express()
const server = http.Server(app)
let io = socketIO(server)


let connections = {}

const PORT = 5000

app.set('port', PORT)

app.use('/static', express.static(__dirname + '/build/static'))

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'build/index.html'))
})

const store = createStore(
    combineReducers({ game })
)

const handleDisconnect = (socket) => () => {
    console.log('disconnection', socket.id)
    delete connections[socket.id]
}

const handleAction = (socket) => (action) => {
    console.log(`[${socket.id}]:`, action)
    switch (action.type) {
        case 'SET_NAME':
            connections[socket.id].name = action.name
            return
        default:
            store.dispatch(action)
            console.log('sending action', action, 'to others')
            socket.broadcast.emit('action', action)
    }
}

const handleConnect = (socket) => {
    console.log('new connection', socket.id)
    connections[socket.id] = { socket, name: null }
    socket.on('disconnect', handleDisconnect(socket))
    socket.on('action', handleAction(socket))
    const state = store.getState()
    socket.emit('action', {
        type: 'REPLACE_GAME_STATE',
        game: state.game
    })
}

io.on('connection', handleConnect)

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
//    let counter = 0
    setInterval(() => {
//        console.log(`emitting message ${counter}`)
        console.log('connections =', Object.entries(connections).map(([k,v]) => {
            return [k, v.name]
        }))
        console.log('game =', store.getState())
//        io.sockets.emit('message', 'hi!')
//        counter += 1
    }, 3000)
})

