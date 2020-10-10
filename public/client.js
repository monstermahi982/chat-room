const socket = io()

let messageArea = document.querySelector('.message__area')
let name;
let textarea = document.querySelector('#textarea')
do{
    name = prompt('please enter your name')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollbottom()

    //send to server
    socket.emit('message',msg)



}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
 
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p> 
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}


//recive

socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    scrollbottom( )
})


function scrollbottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}