const writeData = require("./fileWriter.js");
const deleteData = require("./fileDelete.js");
const patchData = require("./filePatch.js");
const readData = require("./fileGet.js");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const fs = require("fs");
const app = express();
const IP = process.env.IP;
const PORT = 9090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/post", (req, res) => {
  let json = readData();
  const body = req.body;
  const created = `${moment().subtract(10, "days").calendar()} ${moment().format(
    "LT"
  )}`;
  const id =
    json.delivery.length == 0
      ? json.delivery.length + 1
      : Number(json.delivery[json.delivery.length - 1].id) + 1;
  const info = {
    id: id,
    created: created,
    name: body.name,
    phone: body.phone,
    date: body.date,
    type: body.type,
    item: body.item,
    state: body.state,
    guide: body.guide,
    notes: body.notes,
  };
  writeData(info);
  res.json({ message: "I got the data" });
});

// app.get("/api/delivery", (req, res) => {
//   let page = parseInt(req.query.page);
//   const pageCount = Math.ceil(json.delivery.length / 10);
//   if (!page) {
//     page = 1;
//   }
//   if (page > pageCount) {
//     page = pageCount;
//   }
//   res.json({
//     page: page,
//     pageCount: pageCount,
//     delivery: json.delivery.slice(page * 10 - 10, page * 20),
//   });
// });

app.get("/api/delivery", (req, res) => {
  let json = readData();
  // const color = req.query.color;
  // const state = req.query.state;
  // const side = req.query.side;
  // const sortByDate = req.query.sortByDate;

  // if (color !== undefined) {
  //   let responseArr = [];
  //   for (let i = 0; i < json.delivery.length; i++) {
  //     if (json.delivery[i].color.toLowerCase().includes(color.toLowerCase())) {
  //       responseArr.push(json.delivery[i]);
  //     }
  //   }
  //   return res.send({ delivery: responseArr });
  // } else if (state !== undefined) {
  //   let responseArr = [];
  //   for (let i = 0; i < json.delivery.length; i++) {
  //     if (json.delivery[i].state == state) {
  //       responseArr.push(json.delivery[i]);
  //     }
  //   }
  //   return res.send({ delivery: responseArr });
  // } else if (side !== undefined) {
  //   let responseArr = [];
  //   for (let i = 0; i < json.delivery.length; i++) {
  //     if (json.delivery[i].side == side) {
  //       responseArr.push(json.delivery[i]);
  //     }
  //   }
  //   return res.send({ delivery: responseArr });
  // } else if (sortByDate !== undefined) {
  //   if (sortByDate == 'asc') {
  //     json.delivery.sort((a, b) => (Number(new Date(a.date)) > Number(new Date(b.date))) ? 1 : -1);
  //     return res.send(json);
  //   } else if (sortByDate == 'desc') {
  //     json.delivery.sort((a, b) => (Number(new Date(b.date)) > Number(new Date(a.date))) ? -1 : 1);
  //     return res.send(json);
  //   }
  // } else if (Object.keys(req.query).length === 0) {
  //   return res.send(json);
  // }
  res.send(json);

});

app.get("/api/delivery/:ident", (req, res) => {
  let json = readData();
  const { ident } = req.params;
  if (/\d/.test(ident)) {
    if (ident.toString().match(/\d/g).length < 6) {
      // if (ident > json.delivery.length || ident <= 0) {
      //   res.status(404).json({ error: "404", message: "Not found" });
      // } else {
      //   res.send(json.delivery[ident - 1]);
      // }
      let responseArr = [];
      for (let i = 0; i < json.delivery.length; i++) {
        if (json.delivery[i].id == ident) {
          responseArr.push(json.delivery[i]);
        }
      }
      res.send({ delivery: responseArr });
    } else if (ident.toString().match(/\d/g).length >= 6) {
      let responseArr = [];
      for (let i = 0; i < json.delivery.length; i++) {
        if (json.delivery[i].phone == ident) {
          responseArr.push(json.delivery[i]);
        }
      }
      res.send({ delivery: responseArr });
    }
  } else {
    let responseArr = [];
    for (let i = 0; i < json.delivery.length; i++) {
      if (
        json.delivery[i].name.toLowerCase().includes(ident.toLocaleLowerCase())
      ) {
        responseArr.push(json.delivery[i]);
      }
    }
    res.send({ delivery: responseArr });
  }
});

app.delete("/api/delivery/:ident", (req, res) => {
  let json = readData();
  const { ident } = req.params;
  // if (!json.delivery[ident - 1]) {
  //   return res.status(404).json({ error: "404", message: "Not found" });
  // }
  // deleteData(ident);
  // return res.send("DELETE Request called");
  for (let i = 0; i < json.delivery.length; i++) {
    if (json.delivery[i].id == ident) {
      deleteData(ident);
    }
  }
  return res.send("DELETE Request called");
});

app.patch("/api/delivery/:ident", (req, res) => {
  let json = readData();
  const { ident } = req.params;
  const body = req.body;
  for (let i = 0; i < json.delivery.length; i++) {
    if (json.delivery[i].id == ident) {
      let name = body.name === "" ? json.delivery[i].name : body.name;
      let phone = body.phone === "" ? json.delivery[i].phone : body.phone;
      let date = body.date === "" ? json.delivery[i].date : body.date;
      let type = body.type === "" ? json.delivery[i].type : body.type;
      let item = body.item === "" ? json.delivery[i].item : body.item;
      let state = body.state === "" ? json.delivery[i].state : body.state;
      let guide = body.guide === "" ? json.delivery[i].guide : body.guide;
      let notes = body.notes === "" ? json.delivery[i].notes : body.notes;

      const info = {
        id: ident,
        created: json.delivery[i].created,
        name: name,
        phone: phone,
        date: date,
        type: type,
        item: item,
        state: state,
        guide: guide,
        notes: notes,
      };

      patchData(info, ident);
      res.json({ message: "I edit the data" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://${IP}:${PORT}`);
});
