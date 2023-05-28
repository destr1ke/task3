export default class GameRules {
  constructor(moves) {
    this.moves = moves;
    this.rules = this.generateRules();
  }

  getBeats(i, q) {
    let beats = [];
    while (q > 0) {
      if (i + 1 <= this.moves.length - 1) {
        beats.push(this.moves[i + 1]);
        q--;
        i++;
      } else if (i === this.moves.length - 1) {
        i = 0;
        beats.push(this.moves[i]);
        q--;
      }
    }
    return beats;
  }

  getLoses(i, q) {
    let loses = [];
    while (q > 0) {
      if (i - 1 >= 0) {
        loses.push(this.moves[i - 1]);
        q--;
        i--;
      } else if (i === 0) {
        i = this.moves.length - 1;
        loses.push(this.moves[i]);
        q--;
      }
    }
    return loses;
  }

  generateRules() {
    const rules = {};

    for (let i = 0; i < this.moves.length; i++) {
      const q = (this.moves.length - 1) / 2;
      const move = this.moves[i];
      const beats = this.getBeats(i, q);
      const loses = this.getLoses(i, q);
      rules[move] = { beats, loses };
    }

    return rules;
  }

  determineWinner(userMove, computerMove) {
    const userRules = this.rules[userMove];

    if (!userRules) {
      return "Invalid move";
    }

    if (userMove === computerMove) {
      return "Draw";
    }

    if (userRules.beats.includes(computerMove)) {
      return "You win";
    }

    return "You lose";
  }
  getOutcome(move1, move2) {
    const outcome = this.determineWinner(move1, move2);
    return outcome === "You win"
      ? "Win"
      : outcome === "You lose"
      ? "Lose"
      : "Draw";
  }
}
