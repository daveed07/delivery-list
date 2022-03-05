const fs = require("fs");
const file = "./src/log.json";

const writeData = (input) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    arr.delivery.push(input);

    fs.writeFile(file, JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("Data pushed!");
    });
  });
};

module.exports = writeData;
