import { useEffect } from "react";
import "../../css/snake.css";

const Snake = () => {
  useEffect(() => {
    const gameArea = document.getElementById("gameArea");
    const snakeScore = document.getElementById("snakeScore");
    const touchControlArea = document.getElementById("touchControlArea");
    const info = document.getElementById("info");

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

    // game start

    function startGame() {
      touchControlArea.removeEventListener("click", startGame);
      touchControlArea.removeEventListener("touchstart", startGame);
      touchControlArea.addEventListener("touchstart", handleTouch);
      interval = setInterval(move, intervalTime * speed);
      snake.forEach((index) => grid[index].classList.add("snake"));
      info.innerHTML = "&nbsp;";
      spawnApple();
    }

    function move() {
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

    function handleMouseClick(e) {
      if (e.keyCode === 39) {
        snakeDirection = 1;           // right one
      } else if (e.keyCode === 38) {
        snakeDirection = -width;      // up width
      } else if (e.keyCode === 37) {
        snakeDirection = -1;          // left one
      } else if (e.keyCode === 40) {
        snakeDirection = +width;      //down width
      }

      if (e.keyCode === "Space" || interval === 0) {
        startGame();
      }
    }

    //touch controls

    function handleTouch(e) {
      e.preventDefault();
      switch (e.target.id) {
        case "top":
          snakeDirection = -width;
          break;
        case "left":
          snakeDirection = -1;
          break;
        case "right":
          snakeDirection = 1;
          break;
        case "bottom":
          snakeDirection = +width;
          break;
        default:
          return;
      }
    }

    document.addEventListener("keydown", handleMouseClick);
    touchControlArea.addEventListener("click", startGame);
    touchControlArea.addEventListener("touchstart", startGame);

    // cleanup on component unmount

    return() => {
      if(interval !== 0){
        clearInterval(interval);
        console.log("cleared interval")
      }
    }


  },[]); // /useEffect


  return (
    <div className="container-fluid d-flex">
      <div className="touchControlArea" id="touchControlArea">
        <div className="top" id="top"></div>
        <div className="left" id="left"></div>
        <div className="right" id="right"></div>
        <div className="bottom" id="bottom"></div>
      </div>
      <h1 id="snakeScore">Score 0</h1>
      <div className="gameArea" id="gameArea"></div>
      <p id="info">Press or touch to start game. Control with arrow keys or touch controls</p>
    </div>
  );
};

export default Snake;
