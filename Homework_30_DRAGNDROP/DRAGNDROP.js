'use strict'

window.addEventListener('load',documentReady,false);

function documentReady() {
    var pics=document.getElementsByTagName('img');

    for (var i=0; i<pics.length; i++) {
        let pic=pics[i];
        pic._left=pic.offsetLeft;
        pic._top=pic.offsetTop;
    }

    for (var i=0; i<pics.length; i++) {
        let pic=pics[i];
        pic.style.left=pic._left+"px";
        pic.style.top=pic._top+"px";
        pic.style.position='absolute';
    }

}

const fieldH=document.getElementsByTagName('body');
const field=fieldH[0];

field.addEventListener('mousedown', moveStart, false);

//z-index
let z=0;

let mouse={ Lbtn: false }

function moveStart(eo) {
    eo=eo||window.event;
    eo.preventDefault();

    // какая картинка кликнута?
    let pic=eo.target;
    mouse.Lbtn = true; 

    if ( pic.tagName=='IMG' ) {

        pic.style.cursor='pointer';
    
        pic.style.zIndex=++z;

        // находим координаты картинки
        let picX=pic.offsetLeft;
        let picY=pic.offsetTop;

        // находим координаты клика
        let clickX=eo.pageX;
        let clickY=eo.pageY;

        // запоминаем разницу между координатами мыши и координатами картинки
        pic._mouseX=clickX-picX;
        pic._mouseY=clickY-picY;

        pic.addEventListener('mousemove', move, false);
        pic.addEventListener('mouseup', moveEnd, false);
        pic.addEventListener('mouseleave', leave, false);
        pic.addEventListener('mouseenter', moveEnd, false);
        
        
        function move(eo) {
            eo=eo||window.event;
            eo.preventDefault();
            if (mouse.Lbtn) {

            let pic=eo.target;

            //новые координаты картинки есть координаты касания минус запомненная разница
            pic.style.left=(eo.pageX-pic._mouseX)+"px";
            pic.style.top=(eo.pageY-pic._mouseY)+"px";
            }
        }

        function moveEnd(eo) {
            eo=eo||window.event;
            eo.preventDefault();

            let pic=eo.target;

            pic.style.cursor='';
            mouse.Lbtn = false; 
            pic.removeEventListener('mousemove', move, false);
        }

        function leave(eo) {
            eo=eo||window.event;
            eo.preventDefault();

            if (mouse.Lbtn)
                move(eo);
            else moveEnd(eo)
        }

    }

}


