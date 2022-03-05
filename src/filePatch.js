const fs = require("fs");
const file = "./src/log.json";

const patchData = (input, id) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    arr.delivery.splice(id - 1, 1, input);

    fs.writeFile(file, JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("Data pushed!");
    });
  });
};

module.exports = patchData;
