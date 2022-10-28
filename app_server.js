const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path');
const server = require('https').createServer(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
    socket.on('newUser',(userName) => {
        console.log(userName +'님이 접속하셨습니다.')
        socket.name = userName;
        io.emit('update',{type: 'connect', name: 'SERVER', message: userName +'님이 접속하였습니다.'});
    });

    socket.on('update',(data) =>{
        data.name = socket.name;
        console.log(data);
        io.emit('update',data);
    });

    socket.on('disconnect',() =>{
        console.log(socket.name + '님이 나가셨습니다.');
        // 나간사람을 제외한 나머지 사람들한테 메세지 전송함
        socket.broadcast.emit('update',{type:'disconnect', name:'SERVER', message: socket.name + '님이 나가셨습니다.'});
    });
});



app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/',(req,res) => {
    fs.readFile('./static/index.html', (err,data) => {
        if(err) {
            console.log('에러가 나왔습니다 ');
        } else {
            res.writeHead(200,{'Content-Type' : 'text/html'})
            res.write(data)
            res.end()
        }
    })
})
const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/salcho.cf/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/salcho.cf/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/salcho.cf/cert.pem'), 'utf8').toString(),
};

server.listen(option,7777, () =>{
    console.log('서버 실행중 .... ')
})

