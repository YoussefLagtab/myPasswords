const fs = require("fs");
const crypto = require("crypto-js");
const readline = require("readline-sync");

if (!fs.existsSync("./password.json"))
  fs.writeFileSync("./password.json", "{}");

let o = fs.readFileSync("./password.json", "utf8");
o = JSON.parse(o);

let options = ["Add Password", "Get Password"],
  index = readline.keyInSelect(options, "witch option?");

if (index < 0) process.exit();

if (index === 0) {
  let title = readline.question("title: ");
  check(title, "title");
  let password = readline.question("password: ");
  check(password, "password");
  let key = readline.question("key: ");
  check(key, "key");
  encrypted = crypto.AES.encrypt(password, key).toString();

  o[title] = encrypted;
  file = JSON.stringify(o);
  fs.writeFile("./password.json", file, "utf8", err => {
    if (err) {
      return !console.error(err);
    }
  });
} else {
  let title = readline.question("title: ");
  check(title, "title");
  let key = readline.question("key: ");
  check(key, "key");
  let hash = o[title];
  check(hash, "hash", " does not exist!");

  let decrypted = crypto.AES.decrypt(hash, key).toString(crypto.enc.Utf8);
  console.log(title, " password is :", decrypted);
}

function check(value, str, phrase = " can't be empty!") {
  if (!value) {
    console.log(str, phrase);
    process.exit();
  }
}
