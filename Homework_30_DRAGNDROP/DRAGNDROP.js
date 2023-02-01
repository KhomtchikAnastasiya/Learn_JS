'use strict'


function documentReady() {
    var pics=document.getElementsByTagName('img');
    
    for (var i=0; i<pics.length; i++) {
     let pic=pics[i];
     
     pic.style.position='absolute';
     pic.style.top=0;
     pics[0].style.left=0;
     pics[0]._left=0;
     let picStyles=window.getComputedStyle(pic);
     pic._width=parseFloat(picStyles['width']);

     if (i>0){
        pic._left=pics[i-1]._left+pics[i-1]._width;
        pic.style.left=(pic._left)+"px";
     }
    }
}
documentReady();

const fieldH=document.getElementsByTagName('body');
const field=fieldH[0];

field.addEventListener('mousedown', moveStart, false);

//z-index
let z=0;

function moveStart(eo) {
    eo=eo||window.event;
    eo.preventDefault();

    // какая картинка кликнута?
    let pic=eo.target;

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
        
        function move(eo) {
            eo=eo||window.event;
            eo.preventDefault();

            let pic=eo.target;

            //новые координаты картинки есть координаты касания минус запомненная разница
            pic.style.left=(eo.pageX-pic._mouseX)+"px";
            pic.style.top=(eo.pageY-pic._mouseY)+"px";
        }

        function moveEnd(eo) {
            eo=eo||window.event;
            eo.preventDefault();

            let pic=eo.target;

            pic.style.cursor='';
            
            pic.removeEventListener('mousedown', moveStart, false);
            pic.removeEventListener('mousemove', move, false);
        }
    }

}


