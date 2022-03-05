const fs = require("fs");
const file = "./src/log.json";

const deleteData = (id) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    for (let i = 0; i < arr.delivery.length; i++) {
      if (arr.delivery[i].id == id) {
        arr.delivery.splice(i, 1);
      }
    }

    fs.writeFile("./src/log.json", JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("Data removed!");
    });
  });
};

module.exports = deleteData;
