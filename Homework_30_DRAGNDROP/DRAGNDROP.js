'use strict'

const fieldH=document.getElementsByTagName('body');
const field=fieldH[0];

field.addEventListener('mousedown', moveStart, false);
field.addEventListener('mousemove', move, false);
field.addEventListener('mouseup', moveEnd, false);

window.addEventListener('DOMContentLoaded',documentReady,false);

function documentReady() {
var pics=document.getElementsByTagName('img');

for (var i=0; i<pics.length; i++) {
 let elem=pics[i];
 elem.style.position='absolute';
 elem.style.top=0;
 pics[0].style.left=0;
 pics[0]._left=0;
 let picStyles=window.getComputedStyle(elem);
 elem._width=parseFloat(picStyles['width']);
 console.log(elem._width);
 if (i>0){
    elem._left=pics[i-1]._left+pics[i-1]._width;
    elem.style.left=(elem._left)+"px";
    console.log('if'+elem.style.left);
 }
}
}

let mouseX=0;
let mouseY=0;

//z-index
let z=0;


function moveStart(eo) {
    eo=eo||window.event;
    eo.preventDefault();

    // какой мяч кликнут?
    let pic=eo.target;

    if ( pic.tagName=='IMG' ) {

    pic.style.zIndex=++z;

    // находим координаты картинки
    let picX=pic.offsetLeft;
    let picY=pic.offsetTop;

    console.log(picX, picY);

    // находим координаты клика
    let clickX=eo.pageX;
    let clickY=eo.pageY;
  
    console.log(clickX, clickY);

    // запоминаем разницу между координатами мыши и координатами картинки
    mouseX=clickX-picX;
    mouseY=clickY-picY;

    console.log(mouseX, mouseY);
    }
}


function moveEnd(eo) {
    eo=eo||window.event;
    eo.preventDefault();
}

function move(eo) {
    eo=eo||window.event;
    eo.preventDefault();

    let pic=eo.target;

    if ( pic.tagName=='IMG' ) {
    
    // его новые координаты есть координаты касания минус запомненная разница
    pic.style.left=(eo.pageX-mouseX)+"px";
    pic.style.top=(eo.pageY-mouseY)+"px";

    console.log(mouseX, mouseY);
    console.log(pic.style.left, pic.style.top);}
}

