
var snake = null;
var first_body_part = null;
var pause = true;
const Direction = {
    "up": 1,
    "down": 2,
    "right": 3,
    "left": 4
}

var current_direction = Direction.right;
snake = document.getElementById("head");
var first_body_part = document.querySelector('#body :nth-child(1)');
var body_class = document.getElementById("body");
var body_lenght = 1;

    // Speed settings
var speed = 100;

    // Initializing the position

function init(){
    snake.style.left = "20px";
    snake.style.bottom = "20px"
    first_body_part.style.left = "10px";
    first_body_part.style.bottom = "20px";
    spawn_apple();
}

    // Function for getting the onkeydown event

function getCommand(e){
    let key_code = e.which || e.keyCode;
    switch(key_code){
        case 32:
            if(pause){
                pause = false;
            }
            
            else{
                pause = true;
            }
            break;
        case 37:
            if(current_direction != Direction.right && current_direction != Direction.left){
                current_direction = Direction.left;
            }
            break;
        case 38: 
        if(current_direction != Direction.down && current_direction != Direction.up){
            current_direction = Direction.up;

        }
            break;
        case 39: 
            if(current_direction != Direction.left && current_direction != Direction.left){
                current_direction = Direction.right;
            }
            break;
        case 40:
            if(current_direction != Direction.up && current_direction != Direction.down){
                current_direction = Direction.down;
            }
            break;
    }
    
}

    // This function is called every 500ms, and it moves the snake

function move(){
    if(!pause){
    moveBody();
    switch(current_direction){
        case Direction.down:
            moveDown();
            break;
        case Direction.up:
            moveUp();
            break;
        case Direction.right:
            moveRight();
            break;
        case Direction.left:
            moveLeft();
            break;
    }
    checkCollision();
    check_apple();
}
}

function moveDown(){
    snake.style.bottom = parseInt(snake.style.bottom) - 10 + "px";
}

function moveUp(){
    snake.style.bottom = parseInt(snake.style.bottom) + 10 + "px";
}

function moveRight(){
    snake.style.left = parseInt(snake.style.left) + 10 + "px";
}

function moveLeft(){
    snake.style.left = parseInt(snake.style.left) - 10 + "px";
}

// Moving the body
function moveBody(){
    for(let i = body_lenght; i > 1; i--){
        let query_1 = "#body :nth-child("+i+")";
        let query_2 = "#body :nth-child("+(i-1)+")";
        let first_part = document.querySelector(query_2);
        let second_part = document.querySelector(query_1);
        second_part.style.left = first_part.style.left;
        second_part.style.bottom = first_part.style.bottom;
    }
    first_body_part.style.left = snake.style.left;
    first_body_part.style.bottom = snake.style.bottom;
}

function check_apple(){
    if(snake.style.left == apple.style.left && snake.style.bottom == apple.style.bottom){
        document.getElementById("count").innerHTML = parseInt(document.getElementById("count").innerHTML) + 1;
        spawn_apple();
        add_body();
    }
} //TODO: FINISH


function add_body(){
    let temp = document.createElement("div");
    temp.classList.add("body_part");
    body_class.appendChild(temp);
    body_lenght++;
}

function spawn_apple(){
    let x = Math.floor(Math.random() * 50)*10;
    let y = Math.floor(Math.random() * 50)*10;

    let apple = document.getElementById("apple");
    apple.style.bottom = y + "px";
    apple.style.left = x + "px";

}

function checkCollision(){
    if(parseInt(snake.style.bottom)<0 || parseInt(snake.style.bottom)>490 || parseInt(snake.style.left)<0 || parseInt(snake.style.left)>490)
        {
            gameOver();
        }
    for(let i = body_lenght; i > 0; i--){
        let query = "#body :nth-child("+i+")";
        let check = document.querySelector(query);
        if(snake.style.left == check.style.left && snake.style.bottom == check.style.bottom )
            {
                gameOver();
            }
    }
}

function gameOver(){
    window.location.reload();
}

window.onload = init;


var intervalId = window.setInterval(move, speed);
