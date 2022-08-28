const socket = io();

socket.on('from-server-messages', (data) => {
    console.log("Mensajes:", data);
    render(data);
});

function render(data) {
    const cuerpoChatHTML = data.map((msg) => {
        return`
        <div>
            <em class="text-primary fw-bold">${msg.author}</em>
            [<em class="text-danger">${msg.time}</em>]: <em class="text-success fst-italic">${msg.text}</em>
        </div>;
        `}).join('<br>');

        document.querySelector('#messages').innerHTML = cuerpoChatHTML;
}

function newMessage(){
    const inputUser = document.querySelector('#username');
    const inputText = document.querySelector('#text');

    const message = {
        author: inputUser.value,
        text: inputText.value
    }

    socket.emit('from-client-messages', message);
}