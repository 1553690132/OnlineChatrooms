import io from 'socket.io-client'

const socket = io('http://localhost:3007', {
    query: {},
    transports: ['websocket', 'polling']
})

export default socket