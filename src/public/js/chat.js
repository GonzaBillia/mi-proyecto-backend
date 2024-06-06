const socket = io()
let user = null
const userName = document.getElementById("user")
const chatText = document.getElementById("message")
const chatLogs = document.getElementById("message-logs")

Swal.fire({
    title: "Identificate",
    input: "text",
    confirmButtonText: "Ingresar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "Debes identificarte"
    },
}).then(result => {
    user = {name: result.value}
    userName.innerText = user.name
    socket.emit("authenticated", user)
})

socket.on("authenticated", (data) => {
    console.log("Te has autenticado", data);
})

socket.on("disconnect", () => {
    console.log("Se ha desconectado el server");
})

chatText.onkeyup = (event) => {
    const content = chatText.value.trim()
    if (event.key === "Enter" && content.length > 0) {
        socket.emit("message", {user, message: chatText.value})
        chatText.value = ""
    }
}

socket.on("message-logs", (data) => {
    chatLogs.innerHTML = ""
    data.messages.forEach(message => {
        const li = document.createElement("li")
        li.innerHTML = `<strong>${message.user.name}:</strong> ${message.message}`
        chatLogs.append(li)
    })
})

socket.on("new-user", (data) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: `${data.name} se ha unido al chat!`,
        icon: "success",
    })
})

