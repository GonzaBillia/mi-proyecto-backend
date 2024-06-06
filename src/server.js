import express from "express"
import path from "./utils/path.js"
import chatRouter from "./routes/chat.router.js"
import serverSocket from "./config/socket.config.js"
import handlebarsConfig from "./config/handlebars.config.js"

const PORT = 8080
const HOST = "127.0.0.1" // localhost
const server = express()

server.use("/api/public", express.static(path.public))
server.use("/chat", chatRouter)

handlebarsConfig.config(server)

server.use('*', (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL a la que intentas acceder no existe</h3>")
})

server.use((err, req, res) => {
    res.status(500).send("<h1>Error 500</h1><h3>Hubo un error en el servidor</h3>")
})

const serverHTTP = server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
})

serverSocket.config(serverHTTP)
