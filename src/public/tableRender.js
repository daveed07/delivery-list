function CreateTableFromJSON(list) {
  // EXTRACT VALUE FOR HTML HEADER.
  let col = [];
  for (let i = 0; i < list.length; i++) {
    for (let key in list[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  const table = document.createElement("table");
  table.id = 'table';

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  let tr = table.insertRow(-1); // TABLE ROW.

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
    tr.className = "colorEven";
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (let i = 0; i < list.length; i++) {
    tr = table.insertRow(-1);
    if (i % 2 !== 0) {
      tr.className = "colorEven";
    }

    for (let j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = list[i][col[j]];
      if (tabCell.innerHTML.includes("/")) {
        tabCell.innerHTML = tabCell.innerHTML.replace("/", "<br />");
      } else if (tabCell.innerHTML.length > 14) {
        if (!tabCell.innerHTML.includes(" ")) {
          tabCell.innerHTML =
            tabCell.innerHTML.substring(0, tabCell.innerHTML.length / 2) +
            "-<br />" +
            tabCell.innerHTML.substring(
              tabCell.innerHTML.length / 2 + 1,
              tabCell.innerHTML.length
            );
        }
      }
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

function addColumn() {
  var tblHeadObj = document.getElementById("table").firstChild.firstChild; //table head
  var newTH = document.createElement("th");
  tblHeadObj.appendChild(newTH); //append ne th to table

  var tblBodyObj = document.getElementById("table").tBodies[0]; //table body
  for (var i = 1; i < tblBodyObj.rows.length; i++) {
    var newCell = tblBodyObj.rows[i].insertCell(-1); //create new cell
    newCell.innerHTML = "<button class='delete-button' type='button' onclick='removeRow(this)'>Eliminar</button>" //append data to cell
  }
}
