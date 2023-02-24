"use strict"

requestAnimationFrame(tick);

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
    posX : 351,
    posY : 201,
    speedX : 0,
    speedY : 0,
    width : 20,
    height: 20,
}

let racket1H={
    posX : 4,
    posY : 201,
    speedY : 0,
    width : 6,
    height: 100,
}

let racket2H={
    posX : 698,
    posY : 201,
    speedY : 0,
    width : 6,
    height: 100,
}

let fieldH={
    width : 700,
    height : 400,
}

let timer=0;

function startGame() {

    setStartSpeed();

    ballH.posX=351;
    ballH.posY=201;
    ballH.speedX=startSpeedX;
    ballH.speedY=startSpeedY;

    racket1H.posX=4;
    racket1H.posY=201;

    racket2H.posX=698;
    racket2H.posY=201;

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


    const field=document.getElementById("field");
    var context=field.getContext('2d');
    context.save();
    context.fillStyle="khaki";
    context.strokeStyle="black";
    context.fillRect(1,1, 701,401);
    context.strokeRect(0,0, 702,402);
    context.restore();

    context.save();
    context.strokeStyle='limegreen';
    context.lineWidth=racket1H.width;
    context.beginPath();
    context.moveTo(racket1H.posX,racket1H.posY-racket1H.height/2);
    context.lineTo(racket1H.posX,racket1H.posY+racket1H.height/2);
    context.stroke();
    context.restore();

    context.save();
    context.strokeStyle='mediumblue';
    context.lineWidth=racket2H.width;
    context.beginPath();
    context.moveTo(racket2H.posX,racket2H.posY-racket2H.height/2);
    context.lineTo(racket2H.posX,racket2H.posY+racket2H.height/2);
    context.stroke();
    context.restore();

    context.save();
    context.fillStyle="red";
    context.beginPath();
    context.arc(ballH.posX, ballH.posY, ballH.width/2, 0,Math.PI*2, false);
    context.fill();
    context.restore();

    timer=requestAnimationFrame(tick);
}

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

