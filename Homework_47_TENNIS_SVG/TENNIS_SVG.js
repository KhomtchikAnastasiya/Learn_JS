"use strict"

requestAnimationFrame(tick);

const button=document.getElementById("button");

const butt=document.createElementNS("http://www.w3.org/2000/svg",'rect');
butt.setAttribute("stroke","black");
butt.setAttribute("fill","yellow");
butt.setAttribute("x",0);
butt.setAttribute("y",0);
butt.setAttribute("width",80);
butt.setAttribute("height",30);
button.appendChild(butt);

const txt=document.createElementNS("http://www.w3.org/2000/svg",'text');
txt.setAttribute("fill","black");
txt.setAttribute("x",15);
txt.setAttribute("y",20);
txt.textContent='СТАРТ';
txt.setAttribute("cursor","pointer");
button.appendChild(txt);

const field=document.getElementById("field");

const rect=document.createElementNS("http://www.w3.org/2000/svg",'rect');
rect.setAttribute("stroke","black");
rect.setAttribute("fill","khaki");
rect.setAttribute("x",0);
rect.setAttribute("y",0);
rect.setAttribute("width",700);
rect.setAttribute("height",400);
field.appendChild(rect);

const racket1=document.createElementNS("http://www.w3.org/2000/svg",'rect');
racket1.setAttribute("fill","limegreen");
racket1.setAttribute("x",0);
racket1.setAttribute("y",150);
racket1.setAttribute("width",6);
racket1.setAttribute("height",100);
field.appendChild(racket1);

const racket2=document.createElementNS("http://www.w3.org/2000/svg",'rect');
racket2.setAttribute("fill","mediumblue");
racket2.setAttribute("x",694);
racket2.setAttribute("y",150);
racket2.setAttribute("width",6);
racket2.setAttribute("height",100);
field.appendChild(racket2);

const ball=document.createElementNS("http://www.w3.org/2000/svg",'circle');
ball.setAttribute("fill","red");
ball.setAttribute("cx",350);
ball.setAttribute("cy",200);
ball.setAttribute("r",10);
field.appendChild(ball);

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
        ball.setAttribute("cx", this.posX);
        ball.setAttribute("cy",this.posY);
    }
}

let racket1H={
    posX : 0,
    posY : 150,
    speedY : 0,
    width : 6,
    height: 100,

    update : function() {
        racket1.setAttribute("y", this.posY);
    }
}

let racket2H={
    posX : 694,
    posY : 150,
    speedY : 0,
    width : 6,
    height: 100,

    update : function() {
        racket2.setAttribute("y", this.posY);
    }
}

let fieldH={
    width : 700,
    height : 400,
}

let timer=0;

function startGame() {

    setStartSpeed();

    ballH.posX=350;
    ballH.posY=200;
    ballH.speedX=startSpeedX;
    ballH.speedY=startSpeedY;
    ballH.update();

    racket1H.posX=0;
    racket1H.posY=150;
    racket1H.update();

    racket2H.posX=694;
    racket2H.posY=150;
    racket2H.update();

    console.log(timer);
}


function tick() {

    ballH.posX+=ballH.speedX;

    //попал ли мяч на правую ракетку?
    if ( ((ballH.posX+ballH.width/2)>racket2H.posX)&&
    (ballH.posY>racket2H.posY)&&
    (ballH.posY<racket2H.posY+racket2H.height)) {
        ballH.speedX=-ballH.speedX;
        ballH.posX=fieldH.width-racket2H.width-ballH.width/2;
    }

    //попал ли мяч на левую ракетку?
     if ( ((ballH.posX-ballH.width/2)<racket1H.width)&&
     (ballH.posY>racket1H.posY)&&
     (ballH.posY<racket1H.posY+racket1H.height)) {
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
    if ( (racket1H.posY+racket1H.height)>fieldH.height ) {
        racket1H.speedY=0;
        racket1H.posY=fieldH.height-racket1H.height;
    }

    // вышла ли ракетка выше потолка?
    if ( (racket1H.posY)<0) {
        racket1H.speedY=0;
        racket1H.posY=0;
    }

    racket1H.update();

    racket2H.posY+=racket2H.speedY;

    // вышла ли ракетка ниже пола?
    if ( (racket2H.posY+racket2H.height)>fieldH.height ) {
        racket2H.speedY=0;
        racket2H.posY=fieldH.height-racket2H.height;
    }

    // вышла ли ракетка выше потолка?
    if ( (racket2H.posY)<0) {
        racket2H.speedY=0;
        racket2H.posY=0;
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
    
    if ((ballH.speedX==0) && (ballH.speedY==0) ) {
        racket1H.speedY=0;
        racket2H.speedY=0;
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

