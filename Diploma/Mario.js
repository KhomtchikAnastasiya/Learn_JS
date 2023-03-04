"use strict"

const playField=document.getElementById('playField');
const field=document.getElementById('field');
field.style.transform=" translateX(0px) translateY(0px)";

var enemies = [];
var coins = [];
var bricks = [];
var treasures = [];
var lives = 3;
var gameTime = 0;
var isGameOver;
var gameState = 0;
var dt = 1;
var score = 0;
var scoreEl = document.getElementById('score');
var lastTime= Date.now();
var now;
var dt;

requestAnimationFrame(tick);

const preloadedImagesH={}; // ключ - имя предзагруженного изображения
    function preloadImage(fn) {
        // если такое изображение уже предзагружалось - ничего не делаем
        if ( fn in preloadedImagesH )
            return;
        // предзагружаем - создаём невидимое изображение
        const img=new Image();
        img.src=fn; // загрузка начинается
        // запоминаем, что изображение уже предзагружалось
        preloadedImagesH[fn]=true;
    };

const playerLeft='image/playerl.png';
const playerRight='image/playerr.png';
const enemyLeft='image/enemyl.png';
const enemyRight='image/enemyr.png';
const tiles='image/tiles.png';

preloadImage(playerLeft);
preloadImage(playerRight);
preloadImage(enemyLeft);
preloadImage(enemyRight);
preloadImage(tiles);


function Sprite (url, pos, size, frames, dir, fieldPos) {
    const self=this;
    self.pos = pos;
    self.posX = self.pos[0];
    self.posY = self.pos[1];
    self.size = size;
    self.frames = frames;
    self._index = 0;
    self.url = url;
    self.dir = dir || 'horizontal';
    self.fieldPos = fieldPos;
    self.FieldPosYBeforeJump = fieldPos[1];
    self.framesBeforeJump = frames;
    self.posBeforeJump = pos;
    self.speedX = 0;
    self.speedY = 0;
    var sprite;

    sprite=document.createElement("div");
    playField.appendChild(sprite);
    sprite.style.left=`0px`;
    sprite.style.top=`0px`;
    sprite.style.backgroundRepeat="no-repeat";
    sprite.style.position='absolute'; 
    
  
    self.create=function(){
        
        self._index += self.speedX/2;
        
        var frame;

        if(this.speedX !== 0) {
            var max = self.frames.length;
            var idx = Math.abs(Math.floor(self._index));
            frame = self.frames[idx % max];
        }
        else {
            frame = 0;
        }
    
        if(self.dir == 'vertical') {
            self.posY += frame * self.size[1];
        }
        else {
            if(frame) {
            self.posX += frame * self.size[0];}
            else self.posX=self.pos[0];
        }


        sprite.style.backgroundImage=`url('${self.url}')`;
        sprite.style.backgroundPosition=`-${self.posX}px -${self.posY}px`;
        sprite.style.width=`${self.size[0]}px`;
        sprite.style.height=`${self.size[1]}px`;
        sprite.style.transform=`scale(2) translate(${self.fieldPos[0]}px, ${self.fieldPos[1]}px) translateZ(0)`;
    };

    self.update=function(){

        sprite.style.backgroundPosition=`-${self.pos[0]}px -${self.pos[1]}px`;
        sprite.style.transform=`translate(${self.speedX}px,${self.speedY}px)`;
        //sprite.style.left=`${self.fieldPos[0]}px`;
        //sprite.style.top=`${self.fieldPos[1]}px`;
    }

};

var player= new Sprite(playerRight, [82, 32], [15, 15], [0, 1, 2], 'horizontal', [100, 188]);
player.create();

window.addEventListener("keydown", keyDown);

function keyDown(eo) {
    eo=eo||window.event;
    if (eo.keyCode==39){
        player.url = playerRight;
        player.speedX=2;
    }
    if (eo.keyCode==37){
        player.url = playerLeft;
        player.speedX=-2;
    }
    if (eo.keyCode==38){
        player.pos = [160, 32];
        player.frames = [0];
        player.speedY=-2;
    }
}


window.addEventListener("keyup", keyUp);

function keyUp(eo) {
    eo=eo||window.event;
    if (eo.keyCode==39){
        player.speedX=0;
    }
    if (eo.keyCode==37){
        player.speedX=0;
    }
    if (eo.keyCode==38){
        player.speedY=0;
    }
}


function tick() {

    now = Date.now();

    dt = (now - lastTime) / 1000.0;

    player.fieldPos[0]+=player.speedX;

    player.fieldPos[1]+=player.speedY ;

    player.create();

    lastTime = now;

    requestAnimationFrame(tick);

}


/*

var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');


//коэффициент увеличения всех элементов
const k=2;

var field=document.getElementById("playField");

function Sprite (url, pos, size, speed, frames, dir, once) {
    const self=this;
    self.pos = pos;
    self.size = size;
    self.speed = typeof speed === 'number' ? speed : 0;
    self.frames = frames;
    self._index = 0;
    self.url = url;
    self.dir = dir || 'horizontal';
    self.once = once;
    self.update=function(){
        self._index += self.speed*dt;
    }
    debugger;
        var frame;

        if(this.speed > 0) {
            var max = self.frames.length;
            var idx = self._index;
            frame = self.frames[idx];
    
            if(self.once && idx >= max) {
 //               this.done = true;
                return;
            }
        }
        else {
            frame = 0;
        }
    
        var posX = self.pos[0];
        var posY = self.pos[1];
    
        if(self.dir == 'vertical') {
            posY += frame * self.size[1];
        }
        else {
            posX += frame * self.size[0];
        }



    self.create=function(context){
        
       
        context.drawImage (this.url, this.pos[0], this.pos[1], this.size[0], this.size[1], 0, 0, this.size[0]*k, this.size[1]*k);
    };

};

var playerR=new Sprite(playerRImg, [80, 32], [15, 15], 15, [0, 1], 'horizontal', false);

playerR.create(context);

*/




