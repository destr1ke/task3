import Game from "./Game.js";
const moves = process.argv.slice(2);

const isMovesInique = (moves) => {
  return new Set(moves).size !== moves.length;
};
const displayError = (msg) => {
  console.log(msg);
  process.exit(1);
};
const messageExample = "Example: node index.js rock paper scissors";
if (moves.length < 3) {
  displayError(
    "Invalid arguments! You must pass 3 or more arguments!" + messageExample
  );
}
if (moves.length % 2 === 0) {
  displayError(
    "Invalid arguments! You must pass an odd number of arguments!" +
      messageExample
  );
}
if (isMovesInique(moves)) {
  displayError(
    "Invalid arguments! You must pass non-repeatable arguments!" +
      messageExample
  );
}

const game = new Game(moves);
game.start();
