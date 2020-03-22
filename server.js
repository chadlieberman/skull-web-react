import express from 'express'
import http from 'http'
import path from 'path'
import socketIO from 'socket.io'

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


const handleDisconnect = (socket_id) => () => {
    console.log('disconnection', socket_id)
    delete connections[socket_id]
}

const handleAction = (socket_id) => (action) => {
    console.log(`[${socket_id}]:`, action)
    switch (action.type) {
        case 'SET_NAME':
            connections[socket_id].name = action.name
    }
    //store.dispatch(action)
}

const handleConnect = (socket) => {
    console.log('new connection', socket.id)
    connections[socket.id] = { socket, name: null }
    socket.on('disconnect', handleDisconnect(socket.id))
    socket.on('action', handleAction(socket.id))
}

io.on('connection', handleConnect)

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    let counter = 0
    setInterval(() => {
        console.log(`emitting message ${counter}`)
        console.log('connections =', Object.entries(connections).map(([k,v]) => {
            return [k, v.name]
        }))
        io.sockets.emit('message', 'hi!')
        counter += 1
    }, 1000)
})

