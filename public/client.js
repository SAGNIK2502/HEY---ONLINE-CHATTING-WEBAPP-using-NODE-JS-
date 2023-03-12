const socket = io()
let na;
let textarea =document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
   na = prompt('enter ur name to join:')
}while(!na)
textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})
function sendMessage(message){
    let msg = {
        user: na,
        message: message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()
    socket.emit('message',msg)
}
function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup =`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
`
mainDiv.innerHTML= markup
messageArea.appendChild(mainDiv)
}
//receive msg
socket.on('message',(msg)=>{
   appendMessage(msg,'incoming')
   scrollToBottom()
})
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}