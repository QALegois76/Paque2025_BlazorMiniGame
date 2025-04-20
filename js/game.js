let gameInterval;
let birdY = 300;
let birdX = 100;
let birdSize = 10;
let birdVelocity = 0;
let gravity = 1;
let pipeWidth = 50;

let pourcentFence = 0.75;
let fenceSize = 200;

let code = "123";


let pipes = [];

let distanceX = 0;
let score = 0;

let gameStart = false;
let isgameOver = false;

var canvas = document.getElementById('gameCanvas');
var ctx = canvas?.getContext('2d');

let pipeIndex = 0;

const imgBack = new Image();
imgBack.src = 'res/images/background.png';

const imgPoule = new Image();
imgPoule.src = 'res/images/poule.png'; 

class Pipe {
    posX;
    posFenceY;
}






function initializeGame() {
    console.log("initailisation")



    canvas = document.getElementById('gameCanvas');

    ctx = canvas?.getContext('2d');


    window.addEventListener('keydown', flap);
    window.addEventListener('click', flap);

    launchGame();

}


function gameOver() {

    clearInterval(gameInterval); // Game Over
    isgameOver = true;
}


function launchGame() {
    distanceX = 0;
    score = 0;
    pipeIndex = 0;
    gameStart = false;
    isgameOver = false;
    pipes = [];
    pipes.push({ posX: 500, posFenceY: canvas.height / 2 });
    for (var i = 0; i < 10; i++) {
        createPipe();
    }
    drawGame();


    birdY = canvas.height / 2;


    gameInterval = setInterval(() => {
        updateGame();
        drawGame();
    }, 1000 / 60); // 60 FPS
}


function createPipe() {

    let range = (canvas.height - fenceSize) * pourcentFence;
    var fencePos = (fenceSize + canvas.height * (1 - pourcentFence)) / 2 + Math.random() * range;
    var p = {
        posX: pipes[pipes.length-1].posX + 500,
        posFenceY : fencePos
    };
    pipes.push(p);
}

function flap() {

    if (isgameOver) {
        launchGame();
        return;
    }


    if (!gameStart) {
        gameStart = true;
    }
        birdVelocity = -15; // Flap force
}

function updateGame() {


    if (!gameStart) {
        return 
    }

        birdVelocity += gravity;
        birdY += birdVelocity;



    distanceX += 5;



    // Collision avec les tuyaux
    if (birdY + birdSize >= canvas.height) {
        birdY = canvas.height - birdSize
    }

    if (birdY <= 0) {
        birdY = 0;
    }

    var pipe = pipes[pipeIndex];


    if (pipe.posX - distanceX + pipeWidth < -5) {
        createPipe();
        pipeIndex++;
        score++;
    }



    if (pipe.posX - distanceX > birdX && pipe.posX - distanceX < birdX + birdSize) {
        if (birdY < pipe.posFenceY - fenceSize/2 || birdY + birdSize > pipe.posFenceY + fenceSize/2) {
            console.log("Chicken hit a pipe");
            gameOver();
        }
    }

}

function drawGame() {
    if (!ctx) { 
        console.error("NO CTX")
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const coef = imgBack.height / canvas.height;
    const size = canvas.width / coef;
    ctx.drawImage(imgBack, -distanceX % (size * 2), 0, size, canvas.height);
    ctx.drawImage(imgBack, size - distanceX % (size * 2), 0, size, canvas.height);

     //Dessiner les tuyaux

    ctx.fillStyle = 'orange';

    if (pipes.length > 0) {


        ctx.fillStyle = 'green';
        for (var idx = 0; idx < pipes.length; idx++) {

            var p = pipes[pipeIndex + idx];

            if (p.posX + pipeWidth + 5 - distanceX > canvas.width)
                break;

            ctx.fillRect(p.posX - distanceX, 0, pipeWidth, p.posFenceY - fenceSize / 2);
            ctx.fillRect(p.posX - distanceX, p.posFenceY + fenceSize / 2, pipeWidth, canvas.height - fenceSize / 2 - p.posFenceY);
        }
    }

    //ctx.fillRect(pipeX, 0, 50, pipeGapY - pipeHeight);
    //ctx.fillRect(pipeX, pipeGapY + 100, 50, canvas.height - pipeGapY);

    // Dessiner l'oiseau
    const pouleSize = birdSize * 10
    ctx.drawImage(imgPoule, birdX - pouleSize / 2, birdY - pouleSize / 2, pouleSize, pouleSize);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.strokeRect(birdX, birdY, birdSize, birdSize);
    ctx.fill();



    // Afficher le score
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Score: ' + score, 10, 30);


    // Afficher le code
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    const strCode = 'Code: ' + code.slice(0, Math.min(Math.floor(score / 10), 3));
    const metrics = ctx.measureText('Code: ' + code);
    ctx.fillText(strCode, canvas.width - 10- metrics.width, 30);


}
