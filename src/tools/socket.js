import io from 'socket.io-client'

const socket = io('http://43.143.232.169:8890/', {
    query: {},
    transports: ['websocket', 'polling']
})

export default socket