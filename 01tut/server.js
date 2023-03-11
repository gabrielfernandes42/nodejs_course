console.log("Hello Node js");

//global object insted of window object
// console.log(global)

const os = require("os");
const path = require("path");
const { add, subtract, multiply, divide } = require("./math");

console.log(subtract(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.group("Esse é o filename: ", __filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));
