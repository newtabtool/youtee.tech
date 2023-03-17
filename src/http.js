import app from './app.js'
import { Server } from 'socket.io'
import http from 'http'

const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

export { serverHttp, io}



