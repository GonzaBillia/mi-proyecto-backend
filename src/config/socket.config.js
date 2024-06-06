import { Server } from "socket.io"

const users = []
const messages = []

const config = (serverHTTP) => {
    const io = new Server(serverHTTP)

    io.on("connection", (socket) => {
        const id = socket.client.id
        console.log("Se ha conectado un cliente ", id)

        socket.on("message", (data) => {
            const {user, message} = data
            messages.push({user, message})

            io.emit("message-logs", {messages})
        })

        socket.on("authenticated", (data) => {
            socket.broadcast.emit("new-user", data)
        })

        socket.on("disconnect", () => {
            console.log("Se ha desconectado un cliente ", id)
        })
    })
}

export default {config}