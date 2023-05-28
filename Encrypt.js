import crypto from "crypto";
export default class Encrypt {
  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  generateHmac(key, move) {
    return crypto.createHmac("sha256", key).update(move).digest("hex");
  }
}
