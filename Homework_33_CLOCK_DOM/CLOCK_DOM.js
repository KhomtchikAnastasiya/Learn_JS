"use strict"
var clockDiameterValue;
var clockCenterX;
var clockCenterY;

//Градусы поворота стрелок:
const hourHandTurnHour=360/12;
const hourHandTurnMinute=360/(12*60);
const minuteHandTurn=360/60;
const secondHandTurn=360/60;

//Толщина стрелки часов 7px, минут 5px, секунд 2px
const hourHandWidth=7;
const minuteHandWidth=5;
const secondHandWidth=2;






function buildClock() {

    var clockDiameter=document.getElementById('clockDiameter');
    clockDiameterValue=clockDiameter.value;

    if (clockDiameterValue<200||clockDiameterValue>800) {
        alert("Диаметр часов должен быть от 200 до 800 px");
        return;
    }

    var elems=document.getElementsByTagName('input');
    for (let i=0; i<elems.length; i++) {
        elems[i].style.visibility='hidden';
    }

    const clockContainer=document.getElementById('clockContainer');

    clockContainer.style.position="absolute";

    //создаем циферблат
    const clock=document.createElement('div');
    clock.style.backgroundColor='yellow';
    clock.style.height=clockDiameterValue+'px';
    clock.style.width=clockDiameterValue+'px';
    clock.style.borderRadius=50+"%";
    clock.style.position="absolute";
    clock.className='clock';
    clockContainer.appendChild(clock);

    //находим расположение центра циферблата

    clockCenterX=clock.offsetLeft+clock.offsetWidth/2;
    clockCenterY=clock.offsetTop+clock.offsetHeight/2;

    console.log(clock.offsetLeft,clock.offsetTop, clockCenterX, clockCenterY);

    //создаем и расставляем цифры

    //Кружочки с цифрами размером 1/10 диаметра циферблата

    const numDiameterValue=clockDiameterValue/10;


    //angle угол расположения цифр (в градусах). 

    let angle=0;
    
    for (let i=1; i<=12; i++) {
        var num=document.createElement('div');
        num.style.backgroundColor='green';
        num.style.height=numDiameterValue+'px';
        num.style.width=numDiameterValue+'px';
        num.style.borderRadius=50+"%";
        num.style.position="absolute";
        clockContainer.appendChild(num);

        var numText=document.createElement('div');
        numText.innerText=i;
        numText.setAttribute('style', 'position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)');
        num.appendChild(numText);

        //Поворот каждого кружочка 30%
        angle+=30;

        //переводим градусы в радианы
        let numAngle=parseFloat(angle)/180*Math.PI;;

        //находим расположение центра кружочка с цифрой
        let numCenterX=clockCenterX+(clockDiameterValue/2-numDiameterValue)*Math.sin(numAngle);
        let numCenterY=clockCenterY-(clockDiameterValue/2-numDiameterValue)*Math.cos(numAngle);
        console.log(angle, numCenterX, numCenterY);

        //позиционируем кружочек с цифрой на циферблате
        num.style.left=Math.round(numCenterX-num.offsetWidth/2)+'px';
        num.style.top=Math.round(numCenterY-num.offsetHeight/2)+'px';
    }


    const currentTime=document.getElementById('currentTime');
    currentTime.style.top=(clock.offsetTop+clockDiameterValue/3)+'px';
    currentTime.style.left=clockDiameterValue/2+'px';
    currentTime.style.zIndex=1;

    updateTime();

    let timer=setInterval(updateTime,1000);

    /*

    let now=new Date();
    let timer2;

    let timer1=setTimeout(createTimer1,0);

    function createTimer1() {
    let begin=new Date();
    let int=1000-(begin-now);
    console.log('now',now, 'begin',begin, 'int', int);
    timer2=setTimeout(createTimer,int);
    clearTimeout(timer1);
    }

    function createTimer() {
    let timer=setInterval(updateTime,1000);
    clearTimeout(timer2);
    }

    */

  
};

function updateTime() {
    const currTime=new Date();
    const hours=currTime.getHours();
    const minutes=currTime.getMinutes();
    const seconds=currTime.getSeconds();

    const currentTime=document.getElementById('currentTime');
    currentTime.innerHTML=str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);

    function str0l(val,len) {
        let strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    }

    console.log(currTime);
    
    // задаем стрелочкам размеры и толщину
    //Длина стрелки часов 1/4 диаметра циферблата, остальные 1/2

    //позиционирование и поворот часовой стрелочки:
    let hourHandRotate=hours*hourHandTurnHour+minutes*hourHandTurnMinute;

    const hourHand=document.getElementById('hourHand');

    hourHand.style.height=clockDiameterValue/4+'px';
    hourHand.style.width=hourHandWidth+'px';
    hourHand.style.left=clockCenterX+'px';
    hourHand.style.top=clockCenterY/2+'px';
    hourHand.style.zIndex=1;
    hourHand.style.transformOrigin='center bottom 0';
    hourHand.style.transform='rotate('+hourHandRotate+'deg)';

    //позиционирование и поворот минутной стрелочки:
    let minuteHandRotate=minutes*minuteHandTurn;

    const minuteHand=document.getElementById('minuteHand');
    minuteHand.style.height=clockDiameterValue/2+'px';
    minuteHand.style.width=minuteHandWidth+'px';
    minuteHand.style.left=clockCenterX+'px';
    minuteHand.style.top=0+'px';
    minuteHand.style.zIndex=1;
    minuteHand.style.transformOrigin='center bottom 0';
    minuteHand.style.transform='rotate('+ minuteHandRotate+'deg)';

    //позиционирование и поворот секундной стрелочки:
    let secondHandRotate=seconds*secondHandTurn;

    const secondHand=document.getElementById('secondHand');
    secondHand.style.height=clockDiameterValue/2+'px';
    secondHand.style.width=secondHandWidth+'px';
    secondHand.style.left=clockCenterX+'px';
    secondHand.style.top=0+'px';
    secondHand.style.zIndex=1;
    secondHand.style.transformOrigin='center bottom 0';
    secondHand.style.transform='rotate('+ secondHandRotate+'deg)';
   
}