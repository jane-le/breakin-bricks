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
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    leftOfBall >= leftSideOfObject &&
    rightOfBall <= rightSideOfObject
  ) {
    return true;
  }
  return false;
}

//    (rightOfBall + 1 >= leftSideOfObject && topOfBall <= bottomOfObject) ||
//  (leftOfBall <= rightSideOfObject + 1 && bottomOfBall >= topOfObject)
