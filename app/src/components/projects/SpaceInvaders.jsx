import { React, useRef, useEffect, useState } from "react";
import "../../css/spaceinvaders.css";

const SpaceInvaders = () => {
  const canvasRef = useRef(null);

  const [music] = useState(new Audio(require("../../sounds/joshuaempyre__arcade-music-loop.wav")));
  //sounds
  const [playerBulletSound] = useState( new Audio(require("../../sounds/playerBullet.wav")));
  const [playerExplosionSound] = useState( new Audio(require("../../sounds/playerExplosion.wav")));
  const [invaderExplosionSound] = useState( new Audio(require("../../sounds/invaderExplosion.wav")));
  
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  var fireInterval = null;

  useEffect(() => {
    const drawInterval = setInterval(draw, 10);

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Add event listener to update dimensions on window resize
    window.addEventListener('resize', handleResize);

    var canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = windowDimensions.height * 0.9;
    canvas.width = windowDimensions.width * 0.9;
    ctx.strokeStyle = "#00ff00";
    ctx.fillStyle = "#ffffff";

    var x_player = canvas.width / 2;
    var y_player = canvas.height - 100;
    var clickX = canvas.width / 2;
    var clickY = canvas.height - 100;
    var playerMoveLeft = 0;
    var playerMoveRight = 0;
    var playerMoveUp = 0;
    var playerMoveDown = 0;
    var PlayerMoveSpeed = 5;
    var playerBullets = [];
    var playerMaxBullets = 100;
    var playerXOnMouseDown = 0;
    var playerLife = 3;
    var playerScore = 0;
    var canDamage = true;
    var playerPB = ("; " + document.cookie).split(`; score=`).pop().split(";")[0];
    // invader
    var invaderYSpacing = -100;
    var invaderCount = 20; //min 20
    var invaderMoveSpeed = 2;
    var invaders = [];

    var bulletYSpeed = invaderMoveSpeed * 1.5;
    var bulletSpacing = 150;
    var starsY = 0;
    var backgroundSpeed = 0.3;
    var by = 0;


    music.setAttribute("loop", true,);
    music.volume = 0.2
    
    for (let i = 0; i < playerMaxBullets; i++) {
      playerBullets[i] = {
        x: 0,
        y: 0,
        draw: 1,
      };
    }
    for (let i = 0; i < invaderCount; i++) {
      invaders[i] = {
        x: getRandomX(),
        y: i * invaderYSpacing,
        bx: 0,
        by: 64,
        by2: 0,
        by3: 0,
        by4: 0,
        by5: 0,
        status: 1,
        draw: 1,
      };
    }
    var invaderYLast = invaders[invaderCount - 1].y + canvas.height;

    const imagePaths = [
      require("../../images/spaceinvaders/playerShip0.png"), //0
      require("../../images/spaceinvaders/invaderShip0.png"),
      require("../../images/spaceinvaders/stars.png"),
      require("../../images/spaceinvaders/clouds.png"),
      require("../../images/spaceinvaders/invaderBullet0.png"),
      require("../../images/spaceinvaders/playerBullet0.png"), //5
      require("../../images/spaceinvaders/heart0.png"),
      require("../../images/spaceinvaders/heart1.png"),
    ];
    const images = [];
    var imageCount = 0;
    //load images
    imagePaths.forEach((src) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        imageCount += 1;
        if (imageCount === imagePaths.length) {
          //true when images loaded
          // call function to start drawing
          //drawInterval = setInterval(draw, 10);
          playAudio(music)
          //wait second until can be damaged again, check every 2 seconds
          setInterval(() => {
            if (canDamage===false) {
              setTimeout(() => {
                canDamage = true;
              }, 1000);
            }
          }, 2000);
          //speeds up invaders every 10 secons
          setInterval(() => {
            invaderMoveSpeed += 0.5;
            bulletYSpeed = invaderMoveSpeed * 1.2;
          }, 10000);
          if (window.screen.availWidth <= 1280) {
            setInterval(fireBullet, 500);
          }
          return () => {
            clearInterval(drawInterval);
            // Additional cleanup for audio or other resources if needed
          };
        }
      };
      images.push(image); // add loading image to images array
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawInvader();
      drawPlayer();
      playerCollisionDetection();
      bulletToPlayerCollision();
      bulletToInvaderCollision();
      drawInfo();
      movePlayer();
      ctx.font = "48px Goldman";

      //move player if not at borders
      if (
        playerMoveLeft > 0 ||
        playerMoveRight > 0 ||
        playerMoveUp > 0 ||
        playerMoveDown > 0
      ) {
        //right
        if (x_player > 0) {
          clickX -= playerMoveLeft;
        }
        //left
        if (x_player < canvas.width - images[0].width) {
          clickX += playerMoveRight;
        }
        //top
        if (y_player > 0 + images[0].height / 2 ) {
          clickY -= playerMoveUp;
        }
        //bottom
        if (y_player < canvas.height - images[0].width) {
          clickY += playerMoveDown;
        }
      }
    }

    function drawInfo() {
      ctx.fillText(
        //score
        "Score: " + playerScore,
        25,
        canvas.height - 10
      );
      ctx.fillText(
        //score
        "PB: " + playerPB,
        25,
        canvas.height - 50
      );

      if (playerLife >= 1) {
        //hearts
        ctx.drawImage(
          images[7],
          canvas.width - images[6].width * 4 + 25,
          canvas.height - images[6].height
        );
      } else {
        ctx.drawImage(
          images[6],
          canvas.width - images[6].width * 4 + 25,
          canvas.height - images[6].height
        );
      }
      if (playerLife >= 2) {
        ctx.drawImage(
          images[7],
          canvas.width - images[6].width * 3 + 25,
          canvas.height - images[6].height
        );
      } else {
        ctx.drawImage(
          images[6],
          canvas.width - images[6].width * 3 + 25,
          canvas.height - images[6].height
        );
      }
      if (playerLife >= 3) {
        ctx.drawImage(
          images[7],
          canvas.width - images[6].width * 2 + 25,
          canvas.height - images[6].height
        );
      } else {
        ctx.drawImage(
          images[6],
          canvas.width - images[6].width * 2 + 25,
          canvas.height - images[6].height
        );
      }
    }
    function takeDamage() {
      if (canDamage===true) {
        canDamage = false;
        playerLife -= 1;
        playerExplosionSound.play();
        // red flash
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1.0;

        //game ending when lives run out
        if (playerLife <= 0) {
          if (playerScore > playerPB) {
            //score to cookie
            document.cookie = "score=" + playerScore + "; path=/; SameSite=Lax";
          }
          playerBulletSound.volume = 0;
          clearInterval(drawInterval);
          music.pause()
          drawEnd();
        }
      }
    }
    function drawEnd() {
      ctx.fillText(
        "Press R to restart game.",
        canvas.width / 2 - 300,
        canvas.height - 500
      );
    }

    function bulletToPlayerCollision() {
      //maybe compact later
      for (let i = 0; i < invaderCount; i++) {
        const bulletx = invaders[i].bx;
        const bullet1Y = invaders[i].by;
        const bullet2Y = invaders[i].by2;
        const bullet3Y = invaders[i].by3;
        const bullet4Y = invaders[i].by4;
        const bullet5Y = invaders[i].by5;
        if (invaders[i].status===1 && invaders[i].draw===1) {
          if (
            bulletx < x_player + images[0].width &&
            bulletx + images[4].width > x_player &&
            bullet1Y < y_player + images[0].height &&
            images[4].height + bullet1Y > y_player
          ) {
            takeDamage();
          } else if (
            bulletx < x_player + images[0].width &&
            bulletx + images[4].width > x_player &&
            bullet2Y < y_player + images[0].height &&
            images[4].height + bullet2Y > y_player
          ) {
            takeDamage();
          } else if (
            bulletx < x_player + images[0].width &&
            bulletx + images[4].width > x_player &&
            bullet3Y < y_player + images[0].height &&
            images[4].height + bullet3Y > y_player
          ) {
            takeDamage();
          } else if (
            bulletx < x_player + images[0].width &&
            bulletx + images[4].width > x_player &&
            bullet4Y < y_player + images[0].height &&
            images[4].height + bullet4Y > y_player
          ) {
            takeDamage();
          } else if (
            bulletx < x_player + images[0].width &&
            bulletx + images[4].width > x_player &&
            bullet5Y < y_player + images[0].height &&
            images[4].height + bullet5Y > y_player
          ) {
            takeDamage();
          }
        }
      }
    }
    function bulletToInvaderCollision() {
      for (let i = 0; i < playerMaxBullets; i++) {
        const bullet = playerBullets[i];
        //if bullet on screen
        if (bullet.draw===1 && bullet.status===1) {
          for (let i = 0; i < invaderCount; i++) {
            const invader = invaders[i];
            if (
              bullet.x < invader.x + images[1].width &&
              bullet.x + images[1].width > invader.x &&
              bullet.y < invader.y + images[1].height &&
              images[1].height + bullet.y > invader.y &&
              invader.status===1
            ) {
              invader.status = 0;
              invader.draw = 0;
              bullet.draw = 0;
              playAudio(invaderExplosionSound);
              playerScore += 1;
            }
          }
        }
      }
    }

    function playerCollisionDetection() {
      for (let i = 0; i < invaderCount; i++) {
        const invader = invaders[i];

        if (invader.status === 1 && invader.draw === 1) {
          if (
            invader.x < x_player + images[0].width &&
            invader.x + images[1].width > x_player &&
            invader.y < y_player + images[0].height &&
            images[1].height + invader.y > y_player
          ) {
            takeDamage();
          }
        }
      }
    }

    function drawBackground() {
      //stars upper
      ctx.drawImage(
        images[2],
        0,
        starsY - canvas.height,
        canvas.width,
        images[2].height
      );
      if (starsY >= 0) {
        ctx.drawImage(images[2], 0, starsY, canvas.width, images[2].height); //stars lower

        starsY += backgroundSpeed;
        if (starsY > canvas.height) {
          starsY = 0;
        }
      }
      ctx.drawImage(images[3], 0, 0, canvas.width, canvas.height); //clouds
    }

    function drawInvader() {
      for (let i = 0; i < invaderCount; i++) {
        const invader = invaders[i];
        invader.y += invaderMoveSpeed;
        if (invader.draw === 1 && invader.status === 1) {
          ctx.drawImage(images[1], invader.x, invader.y);
        }
        if (
          //if invader inside canvas
          invader.y > 0 &&
          invader.y < canvas.height - images[1].height
        ) {
          invader.draw = 1;
          invader.by += bulletYSpeed;
          invader.bx = invader.x + images[1].width / 2 - images[4].width / 2; //set bullet location
          //  debug line from invader to player
          // ctx.moveTo(
          //   //invader front location
          //   invader.x + images[1].width / 2,
          //   invader.y + images[1].height
          // );
          // ctx.lineTo(
          //   //player location
          //   x_player + images[0].width / 2,
          //   y_player + images[1].height / 2
          // );
          if (invader.status===1) {
            ctx.drawImage(images[4], invader.bx, invader.by); // bullet 1
          }
          if (invader.by > invader.y + bulletSpacing && invader.status===1) {
            ctx.drawImage(images[4], invader.bx, invader.by - 100); // bullet 2
            invader.by2 = invader.by - 100;
          }
          if (invader.by > invader.y + bulletSpacing + 100 && invader.status===1) {
            ctx.drawImage(images[4], invader.bx, invader.by - 200); // bullet 3
            invader.by3 = invader.by - 200;
          }
          if (invader.by > invader.y + bulletSpacing + 200 && invader.status===1) {
            ctx.drawImage(images[4], invader.bx, invader.by - 300); // bullet 4
            invader.by4 = invader.by - 300;
          }
          if (invader.by > invader.y + bulletSpacing + 300 && invader.status===1) {
            ctx.drawImage(images[4], invader.bx, invader.by - 400); // bullet 5
            invader.by5 = invader.by - 400;
          }
          ctx.fill();
          ctx.stroke();
        }
        //if y is below canvas move to the top of last invader
        if (invader.y > canvas.height) {
          invader.y = invaderYLast;
          invaderYLast = invader.y;
          invader.draw = 0;
          invader.status = 1;
          invader.bx = 0;
          invader.by = 64;
        }
      }
    }

    function movePlayer() {
      //move player closer to clicked coords
      if (x_player < clickX) {
        x_player += PlayerMoveSpeed;
      }
      if (x_player > clickX) {
        x_player -= PlayerMoveSpeed;
      }
      if (y_player < clickY) {
        y_player += PlayerMoveSpeed;
      }
      if (y_player > clickY) {
        y_player -= PlayerMoveSpeed;
      }
    }

    function drawPlayer() {
      ctx.drawImage(images[0], x_player, y_player); //draw player

      for (let i = 0; i < playerMaxBullets; i++) {
        const bullet = playerBullets[i];
        bullet.y -= bulletYSpeed;
        // draw bullets if defined and inside screen
        if (bullet !== undefined && bullet.y > 0 && bullet.draw===1) {
          bullet.draw = 1;
          ctx.drawImage(images[5], bullet.x - 5 + images[0].width / 2, bullet.y); //draw bullet
          ctx.fill();
          ctx.stroke();
          //if out of screen, draw = 0
        }
        if (bullet.y < 0) {
          bullet.draw = 0;
          bullet.status = 0;
        }
      }
    }
    function fireBullet() {
      playAudio(playerBulletSound);
      playerXOnMouseDown = x_player;
      for (let i = 0; i < playerMaxBullets; i++) {
        if (playerBullets[i]===undefined || playerBullets[i].y <= 0) {
          var bullet = i;
        }
      }
      playerBullets[bullet] = { x: x_player, y: y_player, draw: 1, status: 1 };
    }

    function getRandomX() {
      //get random x within canvas
      let min = Math.ceil(64);
      let max = Math.floor(canvas.width - 64);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function playAudio(audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.currentTime = 0;
      }
    }
    //Event listeners
    canvas.addEventListener("mousedown", fireBullet); //Firing bullets with mousedown

    document.addEventListener("keypress", (e) => {
      //Doesnt repeat when holding key
      e = e || window.event;
      if (e.key === " " && e.repeat===0) {
      }
    });
    var fireInterval;
    document.addEventListener("keydown", (e) => {
      e = e || window.event;
      if (e.key === "ArrowUp") {
        playerMoveUp = PlayerMoveSpeed;
      } else if (e.key === "ArrowDown") {
        playerMoveDown = PlayerMoveSpeed;
      } else if (e.key === "ArrowLeft") {
        playerMoveLeft = PlayerMoveSpeed;
      } else if (e.key === "ArrowRight") {
        playerMoveRight = PlayerMoveSpeed;
      } else if (e.key===" " && e.repeat===0) {
        fireBullet();
        fireInterval = setInterval(fireBullet, 1000);
      } else if (e.key ==="r") {
        window.location.reload();
      }
    });
    document.addEventListener("keyup", (e) => {
      e = e || window.event;
      if (e.key === "ArrowUp") {
        playerMoveUp = 0;
      } else if (e.key === "ArrowDown") {
        playerMoveDown = 0;
      } else if (e.key === "ArrowLeft") {
        playerMoveLeft = 0;
      } else if (e.key === "ArrowRight") {
        playerMoveRight = 0;
      } else if (e.key===" ") {
        clearInterval(fireInterval);
      }
    });

    canvas.addEventListener("mousedown", mouseMoveHandler, false);

    function mouseMoveHandler(e) {
      const relativeX = e.clientX - canvas.offsetLeft - 30;
      const relativeY = e.clientY - 80;
      if (
        relativeX > 0 &&
        relativeX < canvas.width - images[0].width &&
        relativeY > 0 &&
        relativeY < canvas.height - images[0].width
      ) {
        clickX = relativeX;
        clickY = relativeY;
      }
    }

    // Stop the game loop and perform cleanup
    const stopGame = () => {
      clearInterval(drawInterval);
      clearInterval(fireInterval)

      //stop music
      playerBulletSound.pause()
      playerExplosionSound.pause()
      invaderExplosionSound.pause()
      music.currentTime = 0;
      music.pause()
    };
    
    //unmounting component
    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('resize', handleResize);
      stopGame();
      console.log('Component will unmount');
      
    };


  }, );

  return (
    <div id="container" className="container-fluid" >
      <canvas id="canvas" ref={canvasRef} />
    </div>
  )
}

export default SpaceInvaders