import { Injectable } from "@nestjs/common";
import { PaddleDto, BallDto, GameStateDto } from "./dto/game.tdo";

@Injectable()
export class PongServise {
  collision(ball: any, player: any) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    return (
      ball.right > player.left &&
      ball.bottom > player.top &&
      ball.left < player.right &&
      ball.top < player.bottom
    );
  }

  resetBall(ball: BallDto) {
    ball.x = 600 / 2;
    ball.y = 400 / 2;
    ball.speed = 5;
    ball.velocityX = 5;
    ball.velocityY = 5;
    ball.radius = 10;
  }

  startGame(ball: BallDto, player1: PaddleDto, player2: PaddleDto) {
    // let interval = setInterval(() => {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if (ball.y + ball.radius > 400 || ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
    }
    let user = ball.x < 600 / 2 ? player1 : player2;
    if (this.collision(ball, user)) {
      let collidePoint = ball.y - (user.y + user.height / 2);
      collidePoint = collidePoint / (user.height / 2);
      // let angleRad = (Math.PI / 4) * collidePoint;
      let angleRad = (collidePoint * Math.PI) / 4;
      let direction = ball.x < 600 / 2 ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);
      // ball.speed += 0.5;
      if (ball.speed + 0.5 > 15) ball.speed = 15;
      else ball.speed += 0.5;
    }
    if (ball.x - ball.radius <= 0) {
      this.resetBall(ball);
      // the computer win
      player2.score++;
      // alert("Computer Win");
    } else if (ball.x + ball.radius >= 600) {
      this.resetBall(ball);
      // alert("You Win");
      // the user win
      player1.score++;
    }
    // }, 1000 / 50);
  }
}
