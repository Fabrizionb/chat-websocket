const socket = io();

let user;
const chatBox = document.querySelector("#chatBox");

Swal.fire({
  title: "Identificate",
  text: "Quien sos?",
  input: "text",
  icon: "question",
  inputValidator: (value) => {
    return !value && "Necesitas escribir tu nombre";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("new_user", user);
});

socket.on("messageLogs", (data) => {
  const log = document.querySelector("#messageLogs");
  const messages = data
    .map(
      (message) =>
        `<p class="user">${message.user} dice: <span class="message">${message.message}</span></p>`
    )
    .join("");
  log.innerHTML = messages;
});

socket.on('user_connected', (data)=>{
    Swal.fire({
        title: `${data} se acaba de conectar`,
        toast: true,
        position: "top-right",
      }); 
})

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});


