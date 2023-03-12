"use strict"

const canvas=document.getElementById('field');
const context=canvas.getContext('2d');

canvas.width = 928;
canvas.height = 464;

let score = 0;
let lastTime= Date.now();
const gameTimeValue = 200;
let gameTime = gameTimeValue;
// gameState:
// 0 - game not started
// 1 - game started
// 2 - game over
// 3 - win
let gameState = 0;
let lives = 3;
let world = "1-1";
let player = 0;
let platforms = [];
let mountains = [];
let blocks = [];
let coins = [];
let coinsSum = 0;
const gravity = 0.5;
let scrollOffset = 0;
const speedXValue = 10;
const speedYValue = 15;
const speedValueBackgrnd = 10;
let now; 
let beginTime;
let dt = 0;
let lastKey;

let scoreEl = document.getElementById('score');
scoreEl.innerHTML=score;
let worldEl = document.getElementById('world');
worldEl.innerHTML=world;
let livesEl = document.getElementById('lives');
livesEl.innerHTML=lives;
let coinsEl = document.getElementById('coins');
coinsEl.innerHTML=coinsSum;
let timeEl = document.getElementById('time');
timeEl.innerHTML=gameTime;

let imageA = {
    brick:'image/brick.png',
    mountain:'image/mountains.png',
    ground: 'image/ground.png',
    pipe: 'image/pipe.png',
    coin: 'image/coin.png',
    player: 'image/player.png',
    win:'image/win.png',
}

function createImage (imageSrc) {
    const image=new Image();
    image.src=imageSrc;
    return image;
}

const brick = createImage(imageA.brick);
const mountain = createImage(imageA.mountain);
const ground = createImage(imageA.ground);
const pipe = createImage(imageA.pipe);
const coin = createImage(imageA.coin);
const playerImg = createImage(imageA.player);
const win = createImage(imageA.win);

let sounds = {
    main: 'sound/sound_main.ogg',
    jump: 'sound/sound_jump.wav',
    coin: 'sound/sound_coin.wav',
    die: 'sound/sound_die.wav',
    win: 'sound/sound_win.wav',
    gameOver: 'sound/sound_gameOver.ogg',
};

function createAudio (audioSrc) {
    const audio=new Audio();
    audio.src=audioSrc;
    return audio;
};

const mainSound = createAudio(sounds.main);
const jumpSound = createAudio(sounds.jump);
const coinSound = createAudio(sounds.coin);
const dieSound = createAudio(sounds.die);
const winSound = createAudio(sounds.win);
const gameOverSound = createAudio(sounds.gameOver);

function Player () {
    let self=this;
    this.pos = {
        x:10,
        y:10
    }

    this.speed = {
        x:0,
        y:0
    };
    this.width = 32;
    this.height = 32;
    this.image = playerImg;
    this._index = 0;
    this.frame = 6;
    self.frames = {
        stand: {
            right: [6],
            left: [5],
        },
        move: {
            right: [7, 8],
            left: [3, 4],
        },
        jump:{
            right: [11],
            left: [0],
        },
    };

    self.currentFrame=self.frames.stand.right;
    
    

    self.draw = function () {

        this._index += 0.2;
        var max = self.currentFrame.length;
        var idx = Math.floor(this._index);
        self.frame = self.currentFrame[idx % max];
   
    context.save();
    context.drawImage (
        this.image, 
        29+this.frame*16+this.frame*14, 
        0, 
        16, 16, 
        this.pos.x, 
        this.pos.y, 
        this.width, 
        this.height);
    context.restore();
    }

    this.update = function () {

        this.draw();

        this.pos.y += this.speed.y;
        this.pos.x += this.speed.x;
        
        if ((this.pos.y+this.height+this.speed.y)<=canvas.height) {
            this.speed.y += gravity;
        }
    }
}

function Platform ({x, y, width, height, image}) {
    this.pos = {
        x,
        y
    };
    this.width = width;
    this.height = height;
    this.image = image;

    this.draw = function () {
    
        context.save();
        /*
        var patt=context.createPattern(this.image,'repeat');
        context.fillStyle=patt;
        context.fillRect(this.pos.x, this.pos.y, (this.pos.x+this.width), (this.pos.y+this.height));
        */

        context.drawImage(this.image, this.pos.x, this.pos.y)
        context.restore();

    }
}

function Mountain ({x, y, image}) {
    this.pos = {
        x,
        y
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;

    this.draw = function () {
        context.drawImage(this.image, this.pos.x, this.pos.y);
    }
}

function Block ({x, y, width, height, image}) {
    this.pos = {
        x,
        y
    };
    this.width = width;
    this.height = height;
    this.image = image;

    this.draw = function () {
    
        context.save();
        /*
        var patt=context.createPattern(this.image,'repeat');
        context.fillStyle=patt;
        context.fillRect(this.pos.x, this.pos.y, (this.pos.x+this.width), (this.pos.y+this.height));
        */

        context.drawImage(this.image, this.pos.x, this.pos.y)
        context.restore();

    }
}

function Coin ({x, y, width, height, image}) {
    this.pos = {
        x,
        y
    };
    this.width = width;
    this.height = height;
    this.image = image;

    this.draw = function () {

        context.save();
        context.drawImage(this.image, this.pos.x, this.pos.y)
        context.restore();

    }
}

function init () {

    scrollOffset = 0;

    platforms = [
                new Platform({x: 0, 
                            y: (canvas.height-64), 
                            width: 480, 
                            height: 64,
                            image: ground}),
                new Platform({x: 480, 
                            y: (canvas.height-64), 
                            width: 480, 
                            height: 64,
                            image: ground}),
                new Platform({x: 480*2, 
                            y: (canvas.height-64), 
                            width: 480, 
                            height: 64,
                            image: ground}),
                new Platform({x: 480*3+100, 
                            y: (canvas.height-64), 
                            width: 480, 
                            height: 64,
                            image: ground}),
                new Platform({x: 480*4+100+100, 
                            y: (canvas.height-64), 
                            width: 480, 
                            height: 64,
                            image: ground}),
                new Platform({x: 480*4+100+100+240, 
                            y: (canvas.height-64), 
                            width: 480, 
                            height: 64,
                            image: ground}),
                ]
    
    mountains = [new Mountain ({ x:0,
                                y:0,
                                image: mountain}),
                new Mountain ({ x:1200,
                                y:0,
                                image: mountain}),
                new Mountain ({ x:2552,
                                y:220,
                                image: win}),
                ];        
                


    blocks = [new Block ({x: 850, 
                        y: (canvas.height-64-128/2), 
                        width: 64, 
                        height: 128,
                        image: pipe}),
            new Block ({x: 1050, 
                        y: (canvas.height-64-128*2/3), 
                        width: 64, 
                        height: 128,
                        image: pipe}),
            new Block ({x: 1250, 
                        y: (canvas.height-64-128), 
                        width: 64, 
                        height: 128,
                        image: pipe}),
            new Block ({x: 500, 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 650, 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: (650 + 32), 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: (650 + 32*2), 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: (650 + 32*3), 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1760, 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1760+32, 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1760+32*2, 
                        y: 280, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1856, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1856+32, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1856+32*2, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1856+32*3, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*4, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*5, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*6, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*7, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*7+100, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*8+100, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*9+100, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            new Block ({x: 1824+32*10+100, 
                        y: 150, 
                        width: 32, 
                        height: 32,
                        image: brick}),
            ];
    coins = [new Coin ({x: 500, 
                        y: 248, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 650, 
                        y: 248, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 650+32*2, 
                        y: 248, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 650+32*3, 
                        y: 248, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1760, 
                        y: 280-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1760+32*2, 
                        y: 280-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1856, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1856+32, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1856+32*3, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1856+32*5, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1824+32*7+100, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1824+32*8+100, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1824+32*9+100, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
            new Coin ({x: 1824+32*10+100, 
                        y: 150-32, 
                        width: 32, 
                        height: 32,
                        image: coin}),
    ];
};

init ();

const keys = {
    right : {
        pressed: false
    },
    left : {
        pressed: false
    },
    up: {
        pressed: false
    },
}

function tick () {
    requestAnimationFrame(tick);

    now = Date.now();

    if (gameState===1) {

        if (dt< Math.round((now-beginTime)/1000)){
            dt = Math.round((now-beginTime)/1000);
            console.log(dt);
            gameTime = gameTimeValue - dt;
            timeEl.innerHTML=gameTime;
        }
    }

    context.save();
    context.fillStyle='rgb(107, 140, 255)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();

    mountains.forEach(mountain => {
        mountain.draw();
    })

    blocks.forEach(block => {
        block.draw();
    })

    platforms.forEach(platform => {
        platform.draw();
    })

    coins.forEach(coin => {
        coin.draw();
    })

    if (player) {

    player.update();
    
    if ((keys.right.pressed && player.pos.x < 300)){
        player.speed.x = speedXValue;
    } 
    else if ((keys.left.pressed && player.pos.x > 50) ||
    (keys.left.pressed && scrollOffset===0 && player.pos.x > 0)) {
        player.speed.x = -speedXValue;
    } 
    else {
        player.speed.x = 0;
        
        if (keys.right.pressed && scrollOffset<2201) {

            scrollOffset += speedXValue;

            blocks.forEach(block => {
                block.pos.x -= speedXValue;
            })

            platforms.forEach(platform => {
                platform.pos.x -= speedXValue;
            }) 

            coins.forEach(coin => {
                coin.pos.x -= speedXValue;
            }) 

            mountains.forEach(mountain => {
                mountain.pos.x -= speedValueBackgrnd;
            }) 

        } else if (keys.left.pressed && scrollOffset>0) {

            scrollOffset -= speedXValue;

            blocks.forEach(block => {
                block.pos.x += speedXValue;
            })

            platforms.forEach(platform => {
                platform.pos.x += speedXValue;
            })

            coins.forEach(coin => {
                coin.pos.x += speedXValue;
            })

            mountains.forEach(mountain => {
                mountain.pos.x += speedValueBackgrnd;
            })  
        }
    
    }

// frame change condition
if (keys.right.pressed && 
    !keys.up.pressed &&
    lastKey === 'right' && 
    player.currentFrame != player.frames.move.right){
    player.currentFrame=player.frames.move.right; 
}
else if (!keys.right.pressed && 
    !keys.up.pressed &&
    lastKey === 'right' && 
    player.currentFrame != player.frames.stand.right){
    player.currentFrame=player.frames.stand.right; 
}
else if (keys.up.pressed &&
    lastKey === 'right' && 
    player.currentFrame != player.frames.jump.right){
    player.currentFrame=player.frames.jump.right; 
    clickSound(jumpSound);
}
else if (keys.left.pressed && 
    !keys.up.pressed &&
    lastKey === 'left' && 
    player.currentFrame != player.frames.move.left){
    player.currentFrame=player.frames.move.left; 
}
else if (!keys.left.pressed && 
    !keys.up.pressed &&
    lastKey === 'left' && 
    player.currentFrame != player.frames.stand.left){
    player.currentFrame=player.frames.stand.left; 
}
else if (keys.up.pressed &&
    lastKey === 'left' && 
    player.currentFrame != player.frames.jump.left){
    player.currentFrame=player.frames.jump.left; 
    clickSound(jumpSound);
}



// coin collision detection

coins.forEach(coin => {

    if ((player.pos.x+player.width >= coin.pos.x &&
        player.pos.y+player.height > coin.pos.y &&
        player.pos.y+player.height <= coin.pos.y + coin.height&&
        player.pos.x +player.width < coin.pos.x + coin.width) || 
        (player.pos.x <= coin.pos.x + coin.width &&
        player.pos.y+player.height > coin.pos.y &&
        player.pos.y+player.height <= coin.pos.y + coin.height &&
        player.pos.x > coin.pos.x) ||
        (player.pos.y+player.height <= coin.pos.y &&
        player.pos.y+player.height+player.speed.y >= coin.pos.y &&
        player.pos.x+player.width >= coin.pos.x &&
        player.pos.x <= coin.pos.x+coin.width) ||
        (player.pos.y >= coin.pos.y+coin.height &&
        player.pos.y+player.speed.y <= coin.pos.y+coin.height &&
        player.pos.x+player.width >= coin.pos.x &&
        player.pos.x <= coin.pos.x+coin.width))
        {
            context.save();
            context.fillStyle='rgb(107, 140, 255)';
            context.fillRect(coin.pos.x, coin.pos.y, coin.width, coin.height);
            context.restore();
            coin.pos = {x:0,
                        y:-50};
            score += 200;
            scoreEl.innerHTML=score;
            coinsSum += 1;
            coinsEl.innerHTML=coinsSum;
            clickSound(coinSound);
    }
    }) 

// block collision detection
    blocks.forEach(block => {

    if (player.pos.x+player.width >= block.pos.x &&
        player.pos.y+player.height > block.pos.y &&
        player.pos.y+player.height <= block.pos.y + block.height&&
        player.pos.x +player.width < block.pos.x + block.width) {
        player.pos.x = block.pos.x - player.width;
    }
    if (player.pos.x <= block.pos.x + block.width &&
        player.pos.y+player.height > block.pos.y &&
        player.pos.y+player.height <= block.pos.y + block.height &&
        player.pos.x > block.pos.x) {
        player.pos.x = block.pos.x + block.width;
    
    }
    if (player.pos.y+player.height <= block.pos.y &&
        player.pos.y+player.height+player.speed.y >= block.pos.y &&
        player.pos.x+player.width >= block.pos.x &&
        player.pos.x <= block.pos.x+block.width) {
        player.speed.y = 0;
    
    }
    if (player.pos.y >= block.pos.y+block.height &&
        player.pos.y+player.speed.y <= block.pos.y+block.height &&
        player.pos.x+player.width >= block.pos.x &&
        player.pos.x <= block.pos.x+block.width) {
        player.speed.y = 0;
    }
    }) 

// platform collision detection
    platforms.forEach(platform => {

        if (player.pos.y+player.height +player.speed.y >= platform.pos.y &&
            player.pos.y+player.height+player.speed.y < platform.pos.y + platform.height &&
            player.pos.x+player.width >= platform.pos.x &&
            player.pos.x <= platform.pos.x+platform.width) {

            player.speed.y = 0;
        
        }
        if (player.pos.y +player.speed.y <= platform.pos.y+platform.height &&
            player.pos.y+player.speed.y > platform.pos.y &&
            player.pos.x+player.width >= platform.pos.x &&
            player.pos.x <= platform.pos.x+platform.width) {
            player.speed.y = 0;
        
        }
    }) 

// lose condition
    if (player.pos.y>canvas.height) {
        if (lives>1) {
        mainSound.pause();
        clickSound(dieSound);
        vibro(false);
        lives -=1;
        livesEl.innerHTML=lives;
        score = 0;
        scoreEl.innerHTML=score;
        init ();
        
        player = new Player ();
        beginTime = Date.now();
        dt = 0;
        gameTime = gameTimeValue;
        timeEl.innerHTML=gameTime;
        }
        else if (lives<=1) {
            mainSound.pause();
            clickSound(gameOverSound);
            vibro(false);
            lives = 0;
            gameState = 2;
            livesEl.innerHTML=lives;
            let gameOverEl = document.getElementById('gameOver');
            gameOverEl.style.transitionDuration='1s'; 
            gameOverEl.style.transitionTimingFunction= 'linear';
            setTimeout( function() {
                let gameOverEl = document.getElementById('gameOver');
                gameOverEl.style.top=0+"px";
            },0);
        }

    }
    if (gameTime<=0) {
        if (lives>1) {
            mainSound.pause();
            clickSound(dieSound);
            vibro(false);
            lives -=1;
            livesEl.innerHTML=lives;
            score = 0;
            scoreEl.innerHTML=score;
            init ();
            player = new Player ();
            beginTime = Date.now();
            dt = 0;
            gameTime = gameTimeValue;
            timeEl.innerHTML=gameTime;
        }
        else if (lives<=1) {
            mainSound.pause();
            clickSound(gameOverSound);
            vibro(false);
            lives = 0;
            gameState = 2;
            livesEl.innerHTML=lives;
            let gameOverEl = document.getElementById('gameOver');
            gameOverEl.style.transitionDuration='1s'; 
            gameOverEl.style.transitionTimingFunction= 'linear';
            setTimeout( function() {
                let gameOverEl = document.getElementById('gameOver');
                gameOverEl.style.top=0+"px";
            },0);
        }
    }

    // win condition
    if (scrollOffset > 2200) {
        player.speed.x = 0;
        score += (lives*1000);
        scoreEl.innerHTML=score;
        gameState = 3;
        player = 0;
        let winEl = document.getElementById('win');
            winEl.style.backgroundColor="red";
            winEl.style.transitionDuration='2s'; 
            winEl.style.transitionTimingFunction= 'linear';
            winEl.innerHTML=`YOU WIN! YOUR SCORE ${score}`;
            mainSound.pause();
            clickSound(winSound);
            setTimeout( function() {
                let winEl = document.getElementById('win');
                winEl.style.top=0+"px";
            },0);
            setTimeout( function() {
                let winEl = document.getElementById('win');
                winEl.style.backgroundColor="orange";
            },0);
    }
}
}


tick();

let startButt=document.getElementById('start');
startButt.addEventListener("click", start);
startButt.addEventListener("touchstart", start);

function start(eo) {
    eo=eo||window.event;
    if (gameState == 1) {
        return
    }
    else  {
        if (gameState == 0) {clickSoundInit();}
        if (gameState == 2) {
        let gameOverEl = document.getElementById('gameOver');
        gameOverEl.style.transitionDuration='0.1s'; 
        gameOverEl.style.top="-1000"+"px";
        }
        if (gameState == 3) {
            let winEl = document.getElementById('win');
            winEl.style.transitionDuration='0.1s'; 
            winEl.style.top="-1000"+"px";
            winEl.style.backgroundColor="red";
            }
        gameState = 1;
        lives = 3;
        livesEl.innerHTML=lives;
        score = 0;
        scoreEl.innerHTML=score;
        coinsSum = 0;
        coinsEl.innerHTML=coinsSum;
        dt = 0;
        gameTime = gameTimeValue;
        timeEl.innerHTML=gameTime;
        init ();
        player = new Player ();

        beginTime = Date.now();
    }
}

function clickSoundInit() {
    mainSound.play();
    jumpSound.play();
    jumpSound.pause();
    coinSound.play();
    coinSound.pause();
    dieSound.play();
    dieSound.pause();
    winSound.play();
    winSound.pause();
    gameOverSound.play();
    gameOverSound.pause();
}

function clickSound(sound) {
    sound.currentTime=0;
    sound.play();
}

let soundButt=document.getElementById('sound');
soundButt.addEventListener("click", soundSwitch);
soundButt.addEventListener("touchstart", soundSwitch);
let isSoundOn = true;

function soundSwitch(eo) {
    eo=eo||window.event;
if (isSoundOn) {
    soundButt.innerHTML="SOUND OFF";
    mainSound.volume=0;
    jumpSound.volume=0;
    coinSound.volume=0;
    dieSound.volume=0;
    winSound.volume=0;
    gameOverSound.volume=0;
    isSoundOn = false;
}
else {
    soundButt.innerHTML="SOUND ON";
    mainSound.volume=1;
    jumpSound.volume=1;
    coinSound.volume=1;
    dieSound.volume=1;
    winSound.volume=1;
    gameOverSound.volume=1;
    isSoundOn = true;
}
}

function vibro(longFlag) {
    if ( navigator.vibrate ) {
        if ( !longFlag ) {
            window.navigator.vibrate(100);
        }
        else {
            window.navigator.vibrate([100,100,100]);
        }
    }
}

window.addEventListener("keydown", keyDown);

function keyDown(eo) {
    eo=eo||window.event;
    switch (eo.keyCode) {
        case 39:
            keys.right.pressed = true;
            lastKey='right';
            break;
        case 37:
            keys.left.pressed = true;
            lastKey='left';
            break;
        case 38:
            keys.up.pressed = true;
            player.speed.y -=speedYValue;
            break;
        /*case 40:
            break;
            */
    }
}


window.addEventListener("keyup", keyUp);

function keyUp(eo) {
    eo=eo||window.event;
    switch (eo.keyCode) {
        case 39:
            keys.right.pressed = false;
            break;
        case 37:
            keys.left.pressed = false;
            break;
        case 38:
            keys.up.pressed = false;
            player.speed.y = 0;
            break;
        /*case 40:
            break;
            */
    }
}

let leftButt=document.getElementById('leftButt');
leftButt.addEventListener("mousedown", moveLeft);
leftButt.addEventListener("touchstart", moveLeft);
leftButt.addEventListener("mouseup", moveLeftEnd);
leftButt.addEventListener("touchend", moveLeftEnd);

function moveLeft(eo) {
    eo=eo||window.event;
    keys.left.pressed = true;
    lastKey='left';
}

function moveLeftEnd(eo) {
    eo=eo||window.event;
    keys.left.pressed = false;
}


let upButt=document.getElementById('upButt');
upButt.addEventListener("mousedown", moveUp);
upButt.addEventListener("touchstart", moveUp);
upButt.addEventListener("touchend", moveUpEnd);
upButt.addEventListener("mouseup", moveUpEnd);

function moveUp(eo) {
    eo=eo||window.event;
    keys.up.pressed = true;
    player.speed.y -=speedYValue;
}

function moveUpEnd(eo) {
    eo=eo||window.event;
    keys.up.pressed = false;
    player.speed.y = 0;
}

let rightButt=document.getElementById('rightButt');
rightButt.addEventListener("mousedown", moveRight);
rightButt.addEventListener("touchstart", moveRight);
rightButt.addEventListener("touchend", moveRightEnd);
rightButt.addEventListener("mouseup", moveRightEnd);

function moveRight(eo) {
    eo=eo||window.event;
    keys.right.pressed = true;
    lastKey='right';
}

function moveRightEnd(eo) {
    eo=eo||window.event;
    keys.right.pressed = false;
}


