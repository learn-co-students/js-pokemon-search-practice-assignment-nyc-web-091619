

document.addEventListener('DOMContentLoaded', () => {
  
  var context = document.querySelector("canvas").getContext("2d");
  var balls = new Array();
  let x = 300;
  let y = 300;
  for(let index = 0; index < 5; index ++) {
    balls.push(new Ball(x, y, 15));
  }
  function loop() {
    let ballSprite = new Image()
    ballSprite.src = "images/riceball.png"

    let ourJeffSprite = new Image()
    ourJeffSprite.src = "images/jeff.png"
    
    window.requestAnimationFrame(loop);
    let height = 600;
    let width  = 600;
    context.canvas.height = height;
    context.canvas.width = width;
    /* I removed that - 1 after making the video. It's not neccessary. */
    for(let index = 0; index < balls.length; index ++) {
      let ball = balls[index];
      context.fillStyle = "rgba(0, 0, 0, 0)";
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fill()
      context.drawImage(ballSprite, ball.x, ball.y, 40, 40);
      ball.updatePosition(width, height);
    }
    context.beginPath();
    // context.arc(300, 300, ball.radius, 0, Math.PI * 2);
    context.fill()
    context.drawImage(ourJeffSprite, 250, 550, 100, 100);
  }
  loop();
  
})