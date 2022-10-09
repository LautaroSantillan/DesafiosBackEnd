const server = io().connect();

const renderLogout = nameUser => {
    console.log('entrando');
    console.log(nameUser);
    let logout = document.getElementById('avisologout');        
    fetch('/partials/logout.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data);
            const html = template({
                nameUser: nameUser
            })
            logout.innerHTML = html; 
    });
}

server.on('mensaje-servidor', (productos , messages, compresion, nameUser) =>{
    renderLogout (nameUser);
})


