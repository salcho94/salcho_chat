let socket = io();

socket.on('connect',() => {
    const strArray = ['장독대','핸드폰','스타킹','손가락','발가락','대식가',
        '미식가','너구리','샌드백','고구려','피피티','사이다',
        '자갈치','서면역','해운대','단백질','수도권','항아리',
        '다대포','캥거루','웨이터','초콜릿','요거트','지하철',
        '타이거','탕수육','피어싱','하이힐','아이언','아이들',
        '레이저','나이키','꽃다발','아이스' ,'피카츄','라이츄',
        '유니폼','도깨비','드래곤','참가자','페이퍼','플랫폼',
        '큰엄마','큰아빠','꼬깔콘','포카칩','쉐이크','사이드',
        '사이클','하이퍼','케이블','알파고','혈액형','드라마',
        '대통령','영부인','코리아','오페라','바이어','뽀로로',
        '스티커','카메라','동영상','대학교','중학교','이벤트',
        '집현전','하우스','학용품','할머니','에펠탑','에로스',
        '해왕성','종량제','핸디캡','헛개수','헤이븐','호롱불',
        '현관문','축구장', '야구장','농구장','흰쌀밥','조약돌'];
    const randomValue = strArray[Math.floor(Math.random() * strArray.length)];
    socket.emit('newUser',randomValue);
})

// 전송 함수
let count = 0;

socket.on('update',(data) =>{
    let message = document.getElementById('sendText').value;
    let ChatBox = document.getElementById('ChatBox');
    let name= "";
    if(count == 1){
        name = data.name;
    }
    console.log(name , count);

    if(data.name === 'SERVER'){
        ChatBox.innerHTML += "<div class='serverMsg'>"+ data.message +"</div>"
    }
    else if(data.message == message && data.name == name){
        ChatBox.innerHTML += "<div class='chat ch2'>" +
            "<div class='nickName'>"+data.name+"</div>" +
            "<div class='textbox'>"+data.message+"</div>" + "</div>"
        document.getElementById('sendText').value = '';
    }else{
        ChatBox.innerHTML += "<div class='chat ch1'>" +
            "<div class='nickName'>"+data.name+"</div>" +
            "<div class='textbox'>"+data.message+"</div>" + "</div>"
    }

    ChatBox.scrollTop = ChatBox.scrollHeight;

})


function send() {
    //let url =`http://localhost:5000/sendmail`;
    let url =`https://salcho.kro.kr:3000/sendmail`;
    let message = document.getElementById('sendText').value;
    if(message){
        if(count == 0){
            axios.get(url, {
                params: {
                    title :'누군가 당신의 사이트에서 대화를 시도합니다',
                    message : message,
                }
            });
            count++;
        }
        socket.emit('update',{type: 'message' ,message: message})
    }else{
        alert("전송할 메세지를 입력해주세요!!");
    }
}
function enterSend(){
    if (window.event.keyCode == 13) {
        send();
    }
}