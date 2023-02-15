"use strict"
const clockDiameterValue=200;
var clockCenterX;
var clockCenterY;
var prop;
let hourHandLine;
let minuteHandLine;
let secondHandLine;

//Градусы поворота стрелок:
const hourHandTurnHour=360/12;
const hourHandTurnMinute=360/(12*60);
const minuteHandTurn=360/60;
const secondHandTurn=360/60;


function buildClock() {

    var clockDiameter=document.getElementById('clockDiameter');
    let clockDiameterFact=clockDiameter.value;

    if (clockDiameterFact<200||clockDiameterFact>800) {
        alert("Диаметр часов должен быть от 200 до 800 px");
        return;
    };

    // нахожу коэффициент увеличения элементов, в зависимости от диаметра
    prop=Math.round((clockDiameterFact/clockDiameterValue)/0.01)*0.01;

    var elems=document.getElementsByTagName('input');
    for (let i=0; i<elems.length; i++) {
        elems[i].style.visibility='hidden';
    }

    const clockContainer=document.getElementById('clockContainer');

    clockContainer.style.position="absolute";

    updateTime();
 
};

function updateTime() {

    const currTime=new Date();
    const hours=currTime.getHours();
    const minutes=currTime.getMinutes();
    const seconds=currTime.getSeconds();
    const milliseconds=currTime.getMilliseconds();

    let int=1010-milliseconds;
    let timer=setTimeout(updateTime,int);
    
    //создаем циферблат
    const clock=document.getElementById('clock');
    clock.setAttribute("width", `${clockDiameterValue*prop}`);
    clock.setAttribute("height", `${clockDiameterValue*prop}`);
    clockCenterX=clockDiameterValue*prop/2;
    clockCenterY=clockDiameterValue*prop/2;
    var context=clock.getContext('2d');
    context.fillStyle='yellow';
    context.beginPath();
    context.arc(`${clockCenterX}`,`${clockCenterY}`, `${clockDiameterValue*prop/2}`, 0,Math.PI*2, false);
    context.fill();

    //создаем и расставляем цифры

    //Кружочки с цифрами размером 1/10 диаметра циферблата

    const numDiameterValue=clockDiameterValue/10;
    
    //angle угол расположения цифр (в градусах). 

    let angle=0;
    
    for (let i=1; i<=12; i++) {

        //Поворот каждого кружочка 30%
        angle+=30;

        //переводим градусы в радианы
        let numAngle=parseFloat(angle)/180*Math.PI;;

        //находим расположение центра кружочка с цифрой
        let numCenterX=clockCenterX+(clockDiameterValue*prop/2-numDiameterValue*prop)*Math.sin(numAngle);
        let numCenterY=clockCenterY-(clockDiameterValue*prop/2-numDiameterValue*prop)*Math.cos(numAngle);

        context.fillStyle='green';
        context.beginPath();
        context.arc(`${numCenterX}`,`${numCenterY}`, `${numDiameterValue*prop/2}`, 0,Math.PI*2, false);
        context.fill();

        
        context.fillStyle='black';
        context.font=`${8*prop}px Times New Roman`;
        context.fillText(i,`${numCenterX-8*prop/4}`,`${numCenterY+numDiameterValue/4}`);
    }

 // задаем стрелочкам размеры и толщину
 //Длина стрелки часов 1/4 диаметра циферблата, остальные 1/2

    //позиционирование и поворот часовой стрелочки:
    let hourHandRotate=hours*hourHandTurnHour+minutes*hourHandTurnMinute;
    let hourHandAngle=parseFloat(hourHandRotate)/180*Math.PI;

    let hourHandrX2=clockCenterX+(clockDiameterValue*prop/4)*Math.sin(hourHandAngle);
    let hourHandY2=clockCenterY-(clockDiameterValue*prop/4)*Math.cos(hourHandAngle);

    context.strokeStyle='black';
    context.lineWidth=7;
    context.lineCap='round';
    context.beginPath();
    context.moveTo(`${clockCenterX}`,`${clockCenterY}`);
    context.lineTo(`${hourHandrX2}`,`${hourHandY2}`);
    context.stroke();


    //позиционирование и поворот минутной стрелочки:
    let minuteHandRotate=minutes*minuteHandTurn;
    let minuteHandAngle=parseFloat(minuteHandRotate)/180*Math.PI;

    let minuteHandrX2=clockCenterX+(clockDiameterValue*prop/2)*Math.sin(minuteHandAngle);
    let minuteHandY2=clockCenterY-(clockDiameterValue*prop/2)*Math.cos(minuteHandAngle);

    context.strokeStyle='black';
    context.lineWidth=5;
    context.lineCap='round';
    context.beginPath();
    context.moveTo(`${clockCenterX}`,`${clockCenterY}`);
    context.lineTo(`${minuteHandrX2}`,`${minuteHandY2}`);
    context.stroke();

    //позиционирование и поворот секундной стрелочки:
    let secondHandRotate=seconds*secondHandTurn;
    let secondHandAngle=parseFloat(secondHandRotate)/180*Math.PI;

    let secondHandrX2=clockCenterX+(clockDiameterValue*prop/2)*Math.sin(secondHandAngle);
    let secondHandY2=clockCenterY-(clockDiameterValue*prop/2)*Math.cos(secondHandAngle);

    context.strokeStyle='black';
    context.lineWidth=2;
    context.lineCap='round';
    context.beginPath();
    context.moveTo(`${clockCenterX}`,`${clockCenterY}`);
    context.lineTo(`${secondHandrX2}`,`${secondHandY2}`);
    context.stroke();


    function str0l(val,len) {
        let strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    }

    context.fillStyle='black';
    context.font=`${8*prop}px Times New Roman`;
    context.fillText(`${str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2)}`,`${clockCenterX-clockDiameterValue*prop/16}`,`${clockDiameterValue*prop/4}`);

}