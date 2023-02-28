import { io } from 'socket.io-client'

import { BASE_API_ } from './middleware/base_url.config'

let socket

export const initSocketConnection = () => {
    socket = io(BASE_API_, { transports: ['websocket'], upgrade: false })
    return socket
}
