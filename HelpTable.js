import GameRules from "./GameRules.js";

export default class HelpTable {
  constructor(moves) {
    this.moves = moves;
    this.rules = new GameRules(this.moves);
  }

  showHelpTable() {
    const table = {};
    for (const move of this.moves) {
      const row = { Move: move };
      for (const opponentMove of this.moves) {
        if (move === opponentMove) {
          row[opponentMove] = "Draw";
        } else {
          const outcome = this.rules.getOutcome(move, opponentMove);
          row[opponentMove] = outcome;
        }
      }
      table[move] = row;
    }
    console.table(table);
  }
}
