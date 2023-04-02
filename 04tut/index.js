const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new EventEmitter();

//add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

//not necessary
setTimeout(() => {
  //Emit event
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
