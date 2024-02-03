import { useEffect } from "react";
import "../../css/snake.css";

const Snake = () => {
  useEffect(() => {
    const gameArea = document.getElementById("gameArea");
    const startButton = document.getElementById("startButton");
    const snakedebug = document.getElementById("snakedebug");
    const snakeIndex = document.getElementById("snakeIndex");
    const snakeScore = document.getElementById("snakeScore");
    const width = 20;
    // load audio
    var soundEat = new Audio();
    var soundLose = new Audio();
    soundEat.src = window.location.origin + "/sounds/snake/eat.mp3";
    soundLose.src = window.location.origin + "/sounds/snake/end.wav";

    var interval = 0;
    var intervalTime = 500;
    var speed = 1;
    var score = 0;
    var snake = [2, 1, 0];
    var snakeDirection = 1;
    let appleIndex;

    //create grid
    for (var i = 0; i < width * width; i++) {
      gameArea.appendChild(document.createElement("div"));
    }
    const grid = document.querySelectorAll(".gameArea div");
    grid.forEach((index) => {
      console.log(grid[index]);
    });

    function startGame() {
      interval = setInterval(move, intervalTime * speed);
      snake.forEach((index) => grid[index].classList.add("snake"));
      spawnApple();
    }

    function move() {
      snakeIndex.innerHTML = snake[0] + snakeDirection;
      //lose condition
      if (
        snake[0] + snakeDirection < 0 ||
        snake[0] + snakeDirection > 399 ||
        grid[snake[0] + snakeDirection].classList.contains("snake")
      ) {
        clearInterval(interval);
        playAudio(soundLose);
        if (!alert("Game Over. Your score: " + score)) {
          window.location.reload();
        }
        return clearInterval(interval);
      }
      // eat apple
      if (snake[0] + snakeDirection === appleIndex) {
        snake.unshift(appleIndex - snakeDirection);
        grid[appleIndex].classList.remove("apple");
        spawnApple();
        playAudio(soundEat);
        score++;
        speed *= 0.96;
        clearInterval(interval);
        interval = setInterval(move, intervalTime * speed);
      }

      snakeScore.innerHTML = "Score " + score;

      snake.unshift(snake[0] + snakeDirection);
      grid[snake[0]].classList.add("snake");
      snake.forEach((index) => grid[index].classList.add("snake"));

      const tail = snake.pop();
      grid[tail].classList.remove("snake");
    }

    function spawnApple() {
      appleIndex = Math.floor(Math.random() * grid.length);
      while (grid[appleIndex].classList.contains("apple")) {
        appleIndex = Math.floor(Math.random() * grid.length);
      }
      grid[appleIndex].classList.add("apple");
    }

    function playAudio(audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.currentTime = 0;
      }
    }

    function control(e) {
      if (e.keyCode === 39) {
        snakeDirection = 1; //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 38) {
        snakeDirection = -width; // snake will go back {width} divs, appearing to go up
      } else if (e.keyCode === 37) {
        snakeDirection = -1; // if we press left, the snake will go left one div
      } else if (e.keyCode === 40) {
        snakeDirection = +width; //snake will go forward {width} divs, appearing to go up
      }
    }

    document.addEventListener("keydown", control);
    startButton.addEventListener("click", startGame);
  });

  return (
    <div className="container-fluid d-flex">
      <h1 id="snakeScore">Score 0</h1>
      <div className="gameArea" id="gameArea"></div>
      <button className="btn btn-success" id="startButton">
        Start
      </button>
      <p id="snakedebug"></p>
      <p id="snakeIndex"></p>
    </div>
  );
};

export default Snake;
