const fsPromises = require("fs").promises;
const path = require("path");

const fileops = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data)
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nnice to meet you"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromises.readFile(
        path.join(__dirname, "files", "promiseComplete.txt"),
        "utf8"
      );
      console.log(newData)
  } catch {
    console.log(err);
  }
};

fileops();

// fs.writeFile(
//   path.join(__dirname, "files", "criandoArquivo.txt"),
//   "Novo arquivo criado atráves do writeFile",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(
//       path.join(__dirname, "files", "appendFile.txt"),
//       "mudando o testo",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete");
//       }
//     );
//   }
// );

//exist on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
