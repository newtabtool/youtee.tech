import app from './app.js'
import { Server } from 'socket.io'
import http from 'http'

const serverHttp = app.listen(3000)
const io = new Server(serverHttp)

export { serverHttp, io}



