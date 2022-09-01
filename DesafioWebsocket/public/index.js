const socket = io.connect();

socket.on("from-server-messages", (data) => {
  console.log("Mensajes:", data);
  render(data);
});

function render(data) {
  const cuerpoChatHTML = data.map((msg) => {
      return(
      `<div>
        <strong style="color: blue"> ${msg.author}: </strong>
        <span style="color: brown"> [${msg.time}] </span>
        <em style="color: green"> ${msg.text} </em>
      </div>`)
    })
    .join("<hr>");

  document.getElementById("messages").innerHTML = cuerpoChatHTML;
};

document.getElementById('sendBtn').addEventListener('click', () => {
    const inputUser = document.querySelector('#username');
    const inputText = document.querySelector('#text');
    let dateTime = new Date().toLocaleString('en-GB', {timezone: 'UTC'})

    const mensaje = {
        author: inputUser.value,
        text: inputText.value,
        datetime: dateTime
    }

    socket.emit('from-client-messages', mensaje);

});