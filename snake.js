window.onload = function () {

    canv = document.getElementById('gc');
    console.log(canv)
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);
}

//player position
px = py = 10;
gs = tc = 20;
//apple position
ax = ay = 15;

xv = yv = 0;
trail = [];
tail = 5;

function game() {
    px += xv;
    py += yv;
    fillCanvas();
    outOfCanvas();
    snakeMove();
    drawApple(ax,ay);
    ateApple();
}

function ateApple(){
        if(ax==px&&ay==py){
        tail++;
        ax=Math.floor(Math.random()*tc)
        ay=Math.floor(Math.random()*tc)  
        } 
        drawApple(ax,ay);
}

function drawApple(inpX,inpY) {
    ctx.fillStyle = "red";
    ctx.fillRect(inpX * gs,inpY * gs, gs - 2, gs - 2);

}
function outOfCanvas() {
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }

}
function fillCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
}

function snakeMove() {
    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2); //draw rectangle 

        //If snake ate it self
         if (trail[i].x == px && trail[i].y == py) {
             tail = 5
         }
    }

    //push new x,y position to trail[] 
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift()
    }
}

previusMove = 0;
KEY_UP_CODE = 38;
KEY_DOWN_CODE = 40;
KEY_LEFT_CODE = 37;
KEY_RIGHT_CODE = 39;
function keyPush(evt) {

    if (evt.keyCode == previusMove) {
        return;
    }
    else if (evt.keyCode == KEY_UP_CODE && previusMove == KEY_DOWN_CODE || evt.keyCode == KEY_DOWN_CODE && previusMove == KEY_UP_CODE) {
        return;
    }
    else if (evt.keyCode == KEY_LEFT_CODE && previusMove == KEY_RIGHT_CODE || evt.keyCode == KEY_RIGHT_CODE && previusMove == KEY_LEFT_CODE) {
        return
    }
    else {

        switch (evt.keyCode) {
            case KEY_LEFT_CODE:
                xv = -1; yv = 0;
                previusMove = evt.keyCode;
                break;
            case KEY_UP_CODE:
                xv = 0; yv = -1;
                previusMove = evt.keyCode;
                break;
            case KEY_RIGHT_CODE:
                xv = 1; yv = 0;
                previusMove = evt.keyCode;
                break;
            case KEY_DOWN_CODE:
                xv = 0; yv = 1;
                previusMove = evt.keyCode;
                break;
        }
    }
}