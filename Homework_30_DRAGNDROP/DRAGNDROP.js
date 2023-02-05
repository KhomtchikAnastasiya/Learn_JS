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

window.addEventListener('mousedown', moveStart, false);

//z-index
let z=0;

let draggedPic=null;

function moveStart(eo) {
    eo=eo||window.event;
    eo.preventDefault();

    // какая картинка кликнута?
    let pic=eo.target;

    if ( pic.tagName=='IMG' ) {

        pic.style.cursor='pointer';
    
        pic.style.zIndex=++z;

        draggedPic=pic;

        // находим координаты картинки
        let picX=pic.offsetLeft;
        let picY=pic.offsetTop;

        // находим координаты клика
        let clickX=eo.pageX;
        let clickY=eo.pageY;

        // запоминаем разницу между координатами мыши и координатами картинки
        pic._mouseX=clickX-picX;
        pic._mouseY=clickY-picY;

        window.addEventListener('mousemove', move, false);
        pic.addEventListener('mouseup', moveEnd, false);
        
        function move(eo) {
            if (!draggedPic)
                return;
            eo=eo||window.event;
            eo.preventDefault();

            //новые координаты картинки есть координаты касания минус запомненная разница
            draggedPic.style.left=(eo.pageX-pic._mouseX)+"px";
            draggedPic.style.top=(eo.pageY-pic._mouseY)+"px";
        }

        function moveEnd(eo) {
            eo=eo||window.event;
            eo.preventDefault();

            let pic=eo.target;

            pic.style.cursor='';
            window.removeEventListener('mousemove', move, false);
            pic.removeEventListener('mouseup', moveEnd, false);
            draggedPic=null;
        }

    }

}


