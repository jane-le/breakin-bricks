export function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  let rightOfBall = ball.position.x + ball.size;
  let leftOfBall = ball.position.x;
  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfObject + 1 &&
    topOfBall <= bottomOfObject + 1 &&
    leftOfBall >= leftSideOfObject + 1 &&
    rightOfBall <= rightSideOfObject + 1
  ) {
    return true;
  }
  return false;
}
