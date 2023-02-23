"use strict"

const field=document.getElementById("field");
field.style.height=400+"px";
field.style.width=700+"px";
field.style.backgroundColor="khaki";
field.style.border="solid black 1px";
field.style.position="relative";

const racket1=document.getElementById("racket1");
racket1.style.height=100+"px";
racket1.style.width=6+"px";
racket1.style.backgroundColor="limegreen";
racket1.style.position="absolute";
racket1.style.left=0+"px";
racket1.style.top=150+"px";

const racket2=document.getElementById("racket2");
racket2.style.height=100+"px";
racket2.style.width=6+"px";
racket2.style.backgroundColor="mediumblue";
racket2.style.position="absolute";
racket2.style.left=694+"px";
racket2.style.top=150+"px";

const ball=document.getElementById("ball");
ball.style.height=20+"px";
ball.style.width=20+"px";
ball.style.backgroundColor="red";
ball.style.borderRadius=50+"%";
ball.style.position="absolute";

let resultH={
    result1:0,
    result2:0,
    update : function() {
        const result=document.getElementById('result');
        result.innerHTML=`${this.result1}:${this.result2}`;
    }
}

let angle;
let horiz;
let side;
let startSpeedX=0;
let startSpeedY=0;

function setStartSpeed(){
    //определяем рандомно угол от 20 до 45 градусов
    angle=Math.floor(Math.random()*(45-20+1))+20;
    //определяем угол будет ниже горизонтали (==0) или выше (==1)
    horiz=Math.floor(Math.random()*(1-0+1))+0;
    //определяем направление из центра налево(==0)или направо(==1) 
    side=Math.floor(Math.random()*(1-0+1))+0;
    startSpeedX=1;
    if (horiz==0){
        startSpeedY=-startSpeedX*Math.tan(angle);
    }
    else startSpeedY=startSpeedX*Math.tan(angle);

    if (side==0){
        startSpeedX=-1;
    };

    return startSpeedX, startSpeedY
}

setStartSpeed();

let ballH={
    posX : 350,
    posY : 200,
    speedX : 0,
    speedY : 0,
    width : 20,
    height: 20,

    update : function() {
        const ball=document.getElementById('ball');
        ball.style.left=this.posX-this.width/2+"px";
        ball.style.top=this.posY-this.height/2+"px";
    }
}

let racket1H={
    posX : 3,
    posY : 200,
    speedY : 0,
    width : 6,
    height: 100,

    update : function() {
        const racket1=document.getElementById('racket1');
        racket1.style.top=this.posY-this.height/2+"px";
    }
}

let racket2H={
    posX : 697,
    posY : 200,
    speedY : 0,
    width : 6,
    height: 100,

    update : function() {
        const racket2=document.getElementById('racket2');
        racket2.style.top=this.posY-this.height/2+"px";
    }
}

let fieldH={
    width : 700,
    height : 400,
}

let timer=0;

function startGame() {

    if ( !timer ) { // таймера нет?
        timer=requestAnimationFrame(tick);
    }

    setStartSpeed();

    ballH.posX=350;
    ballH.posY=200;
    ballH.speedX=startSpeedX;
    ballH.speedY=startSpeedY;
    ballH.update();

    racket1H.posX=3;
    racket1H.posY=200;
    racket1H.update();

    racket2H.posX=697;
    racket2H.posY=200;
    racket2H.update();

    console.log(timer);
}

function tick() {

    ballH.posX+=ballH.speedX;

    //попал ли мяч на правую ракетку?
    if ( ((ballH.posX+ballH.width/2)>racket2H.posX-racket2H.width/2)&&
    (ballH.posY>racket2H.posY-racket2H.height/2)&&
    (ballH.posY<racket2H.posY+racket2H.height/2)) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=fieldH.width-racket2H.width-ballH.width/2;
    }

    //попал ли мяч на левую ракетку?
     if ( ((ballH.posX-ballH.width/2)<racket1H.posX+racket1H.width/2)&&
     (ballH.posY>racket1H.posY-racket1H.height/2)&&
     (ballH.posY<racket1H.posY+racket1H.height/2)) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=racket1H.width+ballH.width/2;
     }

    // вылетел ли мяч правее стены?
    if ( (ballH.posX+ballH.width/2)>fieldH.width ) {
        resultH.result1+=1;
        ballH.speedX=0;
        ballH.speedY=0;
        ballH.posX=fieldH.width-ballH.width/2;
        resultH.update();
    }
    // вылетел ли мяч левее стены?
    if ( (ballH.posX-ballH.width/2)<0 ) {
        resultH.result2+=1;
        ballH.speedX=0;
        ballH.speedY=0;
        ballH.posX=ballH.width/2;
        resultH.update();
    }

    ballH.posY+=ballH.speedY;
    // вылетел ли мяч ниже пола?
    if ( (ballH.posY+ballH.height/2)>fieldH.height ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=fieldH.height-ballH.height/2;
    }
    // вылетел ли мяч выше потолка?
    if ( (ballH.posY-ballH.height/2)<0 ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=ballH.height/2;
    }

    ballH.update();

    racket1H.posY+=racket1H.speedY;

    // вышла ли ракетка ниже пола?
    if ( (racket1H.posY+racket1H.height/2)>fieldH.height ) {
        racket1H.speedY=0;
        racket1H.posY=fieldH.height-racket1H.height/2;
    }

    // вышла ли ракетка выше потолка?
    if ( (racket1H.posY-racket1H.height/2)<0) {
        racket1H.speedY=0;
        racket1H.posY=racket1H.height/2;
    }

    racket1H.update();

    racket2H.posY+=racket2H.speedY;

    // вышла ли ракетка ниже пола?
    if ( (racket2H.posY+racket2H.height/2)>fieldH.height ) {
        racket2H.speedY=0;
        racket2H.posY=fieldH.height-racket2H.height/2;
    }

    // вышла ли ракетка выше потолка?
    if ( (racket2H.posY-racket2H.height/2)<0) {
        racket2H.speedY=0;
        racket2H.posY=racket2H.height/2;
    }

    racket2H.update();

    timer=requestAnimationFrame(tick);
}

ballH.update();
resultH.update();

window.addEventListener("keydown", keyDown);

function keyDown(eo) {
    eo=eo||window.event;
    if (eo.keyCode==16){
        racket1H.speedY=-2;
    }
    if (eo.keyCode==17){
        racket1H.speedY=2;
    }
    if (eo.keyCode==38){
        racket2H.speedY=-2;
    }
    if (eo.keyCode==40){
        racket2H.speedY=2;
    }
}

window.addEventListener("keyup", keyUp);

function keyUp(eo) {
    eo=eo||window.event;
    if (eo.keyCode==16){
        racket1H.speedY=0;
    }
    if (eo.keyCode==17){
        racket1H.speedY=0;
    }
    if (eo.keyCode==38){
        racket2H.speedY=0;
    }
    if (eo.keyCode==40){
        racket2H.speedY=0;
    }
}

