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

    //создаем циферблат
    const clock=document.getElementById('clock');
    clock.setAttribute("width", `${clockDiameterValue*prop}`);
    clock.setAttribute("height", `${clockDiameterValue*prop}`);
    clockCenterX=clockDiameterValue*prop/2;
    clockCenterY=clockDiameterValue*prop/2;



    const circle=document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
    circle.setAttribute("stroke","yellow");
    circle.setAttribute("fill","yellow");
    circle.setAttribute("rx", `${clockDiameterValue*prop/2}`);
    circle.setAttribute("ry", `${clockDiameterValue*prop/2}`);
    circle.setAttribute("cx",`${clockCenterX}`);
    circle.setAttribute("cy",`${clockCenterY}`);
    clock.appendChild(circle);

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

        let num=document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
        num.setAttribute("stroke","green");
        num.setAttribute("fill","green");
        num.setAttribute("rx", `${numDiameterValue*prop/2}`);
        num.setAttribute("ry", `${numDiameterValue*prop/2}`);
        num.setAttribute("cx",`${numCenterX}`);
        num.setAttribute("cy",`${numCenterY}`);
        clock.appendChild(num);

        let txt=document.createElementNS("http://www.w3.org/2000/svg",'text');
        txt.setAttribute("x",`${numCenterX}`);
        txt.setAttribute("y",`${numCenterY+numDiameterValue/4}`);
        txt.setAttribute("text-anchor","middle");
        txt.style.fill="black";
        txt.textContent=i;
        clock.appendChild(txt);

    }

    // задаем стрелочкам размеры и толщину
    //Длина стрелки часов 1/4 диаметра циферблата, остальные 1/2

    hourHandLine=document.createElementNS("http://www.w3.org/2000/svg",'line');

    hourHandLine.setAttribute("stroke","black");
    hourHandLine.setAttribute("stroke-width", "7");
    hourHandLine.setAttribute("stroke-linecap", "round");
    hourHandLine.setAttribute("x1", `${clockCenterX}`);
    hourHandLine.setAttribute("y1", `${clockCenterY}`);
    clock.appendChild(hourHandLine);
    
    minuteHandLine=document.createElementNS("http://www.w3.org/2000/svg",'line');

    minuteHandLine.setAttribute("stroke","black");
    minuteHandLine.setAttribute("stroke-width", "5");
    minuteHandLine.setAttribute("stroke-linecap", "round");
    minuteHandLine.setAttribute("x1", `${clockCenterX}`);
    minuteHandLine.setAttribute("y1", `${clockCenterY}`);
    clock.appendChild(minuteHandLine);

    secondHandLine=document.createElementNS("http://www.w3.org/2000/svg",'line');

    secondHandLine.setAttribute("stroke","black");
    secondHandLine.setAttribute("stroke-width", "2");
    secondHandLine.setAttribute("stroke-linecap", "round");
    secondHandLine.setAttribute("x1", `${clockCenterX}`);
    secondHandLine.setAttribute("y1", `${clockCenterY}`);
    clock.appendChild(secondHandLine);



    const currentTime=document.getElementById('currentTime');
  
    currentTime.style.top=clockDiameterValue*prop/4+'px';
    currentTime.style.left=clockCenterX-clockDiameterValue/6+'px';
    currentTime.style.position="absolute";
    currentTime.style.zIndex=1;

    updateTime();   
  
};

function updateTime() {
    const currTime=new Date();
    const hours=currTime.getHours();
    const minutes=currTime.getMinutes();
    const seconds=currTime.getSeconds();
    const milliseconds=currTime.getMilliseconds();

    let int=1000-milliseconds;
    let timer=setTimeout(updateTime,int);

    const currentTime=document.getElementById('currentTime');
    currentTime.innerHTML=str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);

    function str0l(val,len) {
        let strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    }


    //позиционирование и поворот часовой стрелочки:
    let hourHandRotate=hours*hourHandTurnHour+minutes*hourHandTurnMinute;
    let hourHandAngle=parseFloat(hourHandRotate)/180*Math.PI;

    let hourHandrX2=clockCenterX+(clockDiameterValue*prop/4)*Math.sin(hourHandAngle);
    let hourHandY2=clockCenterY-(clockDiameterValue*prop/4)*Math.cos(hourHandAngle);

    hourHandLine.setAttribute("x2",`${hourHandrX2}`);
    hourHandLine.setAttribute("y2",`${hourHandY2}`);


    //позиционирование и поворот минутной стрелочки:
    let minuteHandRotate=minutes*minuteHandTurn;
    let minuteHandAngle=parseFloat(minuteHandRotate)/180*Math.PI;

    let minuteHandrX2=clockCenterX+(clockDiameterValue*prop/2)*Math.sin(minuteHandAngle);
    let minuteHandY2=clockCenterY-(clockDiameterValue*prop/2)*Math.cos(minuteHandAngle);

    minuteHandLine.setAttribute("x2",`${minuteHandrX2}`);
    minuteHandLine.setAttribute("y2",`${minuteHandY2}`);

    //позиционирование и поворот секундной стрелочки:
    let secondHandRotate=seconds*secondHandTurn;
    let secondHandAngle=parseFloat(secondHandRotate)/180*Math.PI;

    let secondHandrX2=clockCenterX+(clockDiameterValue*prop/2)*Math.sin(secondHandAngle);
    let secondHandY2=clockCenterY-(clockDiameterValue*prop/2)*Math.cos(secondHandAngle);

    secondHandLine.setAttribute("x2",`${secondHandrX2}`);
    secondHandLine.setAttribute("y2",`${secondHandY2}`);

}