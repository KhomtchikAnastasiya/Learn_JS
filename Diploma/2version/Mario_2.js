"use strict"

const canvas=document.getElementById('field');
const context=canvas.getContext('2d');

canvas.width = 928;
canvas.height = 464;

const gravity = 0.5;

let scrollOffset = 0;

function Player () {
    this.pos = {
        x:10,
        y:10
    }
    this.speed = {
        x:0,
        y:0
    }
    this.width = 15;
    this.heigth = 15;
    this.draw = function () {
    context.fillStyle = 'red';
    context.fillRect(this.pos.x, this.pos.y, this.width, this.heigth);
    }
    this.update = function () {
        this.draw();
        this.pos.y += this.speed.y;
        this.pos.x += this.speed.x;

        if ((this.pos.y+this.heigth+this.speed.y)<=canvas.height) {
            this.speed.y += gravity;
        }
        else this.speed.y = 0;
      
    }
}

var imageA = {
    brick:'image/brick.png',
    mountain:'image/mountains.png',
}

function createImage (imageSrc) {
    const image=new Image();
    image.src=imageSrc;
    return image;
}

const brick = createImage(imageA.brick);
const mountain = createImage(imageA.mountain);

function Platform ({x, y, width, image}) {
    this.pos = {
        x,
        y
    };
    this.width = width;
    this.heigth = 64;
    this.image = image;

    this.draw = function () {
        
        context.save();
        var patt=context.createPattern(this.image,'repeat');
        context.fillStyle=patt;
        context.fillRect(this.pos.x, this.pos.y, (this.pos.x+this.width), (this.pos.y+this.height));
        context.restore();
        
        //context.drawImage(this.image, this.pos.x, this.pos.y);
    }
}

function Mountain ({x, y, image}) {
    this.pos = {
        x,
        y
    };

    this.image = image;
    this.width = image.width;
    this.heigth = image.height;

    this.draw = function () {
        context.drawImage(this.image, this.pos.x, this.pos.y);
    }
}


const player = new Player ();

const platforms = [new Platform({x: 0, 
                                 y: (canvas.height-64), 
                                 width: 2208, 
                                 image: brick}),
                   new Platform({x: 2240, 
                                 y: (canvas.height-64), 
                                 width: 480, 
                                 image: brick})];

const mountains = [new Mountain ({ x:0,
                                   y:0,
                                   image: mountain})];

const keys = {
    right : {
        pressed: false
    },
    left : {
        pressed: false
    },
}


function tick () {
    requestAnimationFrame(tick);

    context.save();
    context.fillStyle='blue';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();

    mountains.forEach(mountain => {
        mountain.draw();
    })

    brick.onload=drawBrick;
    function drawBrick(){
    platforms.forEach(platform => {
        
        platform.draw();
    })}

    player.update();
    
    if (keys.right.pressed && player.pos.x < 300) {
        player.speed.x = 5
    } 
    else if (keys.left.pressed && player.pos.x > 50) {
        player.speed.x = -5
    } 
    else {
        player.speed.x = 0;
        
        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.pos.x -= 5;
            }) 
            mountains.forEach(mountain => {
                mountain.pos.x -= 3;
            }) 
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.pos.x += 5;
            })
            mountains.forEach(mountain => {
                mountain.pos.x += 3;
            })  
        }
    }
// platform collision detection
    platforms.forEach(platform => {

        if (player.pos.y+player.heigth <= platform.pos.y &&
            player.pos.y+player.heigth+player.speed.y >= platform.pos.y &&
            player.pos.x+player.width >= platform.pos.x &&
            player.pos.x <= platform.pos.x+platform.width) {
            player.speed.y = 0;
        }
        if (player.pos.y >= platform.pos.y+platform.heigth &&
            player.pos.y+player.speed.y <= platform.pos.y+platform.heigth &&
            player.pos.x+player.width >= platform.pos.x &&
            player.pos.x <= platform.pos.x+platform.width) {
            player.speed.y = 0;
        }
    }) 
    if (scrollOffset > 2000) {
        console.log('win');
    }
}


tick();


window.addEventListener("keydown", keyDown);

function keyDown(eo) {
    eo=eo||window.event;
    switch (eo.keyCode) {
        case 39:
            console.log ('right');
            keys.right.pressed = true;
            break;
        case 37:
            console.log ('left');
            keys.left.pressed = true;
            break;
        case 38:
            console.log ('up');
            player.speed.y -=20;
            break;
        case 40:
            console.log ('down');
            break;
    }
}


window.addEventListener("keyup", keyUp);

function keyUp(eo) {
    eo=eo||window.event;
    switch (eo.keyCode) {
        case 39:
            console.log ('right');
            keys.right.pressed = false;
            break;
        case 37:
            console.log ('left');
            keys.left.pressed = false;
            break;
        case 38:
            console.log ('up');
            player.speed.y = 0;
            break;
        case 40:
            console.log ('down');
            break;
    }
}



/*
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


function Sprite (url, pos, size, frames, dir) {
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
  
    self.updateFrame=function(){
        
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

        self.style.backgroundImage=`url('${self.url}')`;
        self.style.backgroundPosition=`-${self.posX}px -${self.posY}px`;
        self.style.width=`${self.size[0]}px`;
        self.style.height=`${self.size[1]}px`;
    };

};

var Player= {
    fieldPos : [100, 188],
    sprite : new Sprite(playerRight, [82, 32], [15, 15], [0, 1, 2], 'horizontal'),
    speedX : 0,
    speedY : 0,
}

Player.prototype.update=function(){
    self.updateFrame();
    self.style.transform=`translate(${self.speedX}px,${self.speedY}px)`;
}

Player.prototype.moveRight = function() {
    this.url = playerRight;
    this.speedX = 2;
};

Player.prototype.moveLeft = function() {
    this.url = playerLeft;
    this.speedX = -2;
}

Player.prototype.noWalk = function() {
    this.speedX = 0;
};

Player.prototype.jump = function() {
    this.framesBeforeJump = frames;
    this.speedY = -30;
};

Player.update();




window.addEventListener("keydown", keyDown);

function keyDown(eo) {
    eo=eo||window.event;
    if (eo.keyCode==39){
        Player.moveRight();
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

    player.fieldPos[1]+=player.speedY;

    if (player.fieldPos[1]<(player.FieldPosYBeforeJump-player.size)){ 
        player.speedY=2;
    }

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




