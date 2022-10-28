let socket = io();

socket.on('connect',() => {
    const strArray = ['뽀로로', '사자', '쿤타', '코쿤', '캅'];
    const randomValue = strArray[Math.floor(Math.random() * strArray.length)];
    socket.emit('newUser',randomValue);
})

// 전송 함수

socket.on('update',(data) =>{
    console.log(`${data.name} : ${data.message}`)
})

function send() {
    let message = document.getElementById('test').value;

    document.getElementById('test').value = '';

    socket.emit('message',{type: 'message' ,message: message})
}