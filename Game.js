import Encrypt from "./Encrypt.js";
import GameRules from "./GameRules.js";
import HelpTable from "./HelpTable.js";

export default class Game {
  constructor(moves) {
    this.moves = moves;
    this.crypto = new Encrypt();
    this.rules = new GameRules(this.moves);
    this.table = new HelpTable(this.moves);
  }

  start() {
    const key = this.crypto.generateKey();
    const computerMove = this.getRandomMove();
    const hmac = this.crypto.generateHmac(key, computerMove);
    console.log(`HMAC: ${hmac}`);

    this.showMenu();

    process.stdin.on("data", (input) => {
      const choice = input.toString().trim();

      if (choice === "?") {
        this.table.showHelpTable();
        this.showMenu();
        return;
      }
      if (choice === "0") {
        console.log("Bye!");
        process.exit(0);
      }

      const userMove = this.moves[choice - 1];

      if (!userMove) {
        console.log("Invalid move");
        this.showMenu();
        return;
      }

      const outcome = this.rules.determineWinner(userMove, computerMove);
      console.log(`Your move: ${userMove}`);
      console.log(`Computer move: ${computerMove}`);
      console.log(`${outcome}`);
      console.log(`Key: ${key}`);
      process.exit(0);
    });
  }

  getRandomMove() {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[randomIndex];
  }

  showMenu() {
    console.log("Menu:");
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - Exit");
    console.log("? - Help");
    console.log("Enter your move:");
  }
}
