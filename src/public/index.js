const IP = "localhost";

const postOnClick = () => {
  $.ajax({
    type: "POST",
    url: "/post",
    data: {
      name: $("#name")[0].value,
      phone: $("#phone")[0].value,
      date: $("#date")[0].value,
      type: $("#type")[0].value,
      item: $("#item")[0].value,
      state: $("#state")[0].value,
      guide: $("#guide")[0].value,
      notes: $("#notes")[0].value,
    },
    success: (data) => {
      console.log(data.message);
      alert("Elemento agregado");
    },
    error: (jqXHR, textStatus, err) => {
      // alert(`text status ${textStatus} err ${err}`);
      alert("Error al enviar, por favor intentar nuevamente");
    },
  });
  setTimeout(() => {
    getOnClick(`http://${IP}:9090/api/delivery`);
  }, 500);
};

const getOnClick = (url) => {
  $.ajax({
    url: url,
    dataType: "json",
    type: "GET",
    success: (res) => {
      if (!res.delivery) {
        let arr = [res];
        CreateTableFromJSON(arr);
      } else {
        let arr = res.delivery;
        CreateTableFromJSON(arr);
        addColumn();
      }
    },
    error: (jqXHR, textStatus, err) => {
      alert("No se pudo encontrar el registro");
    },
  });
};

const deleteOnClick = (url) => {
  $.ajax({
    url: url,
    type: "DELETE",
    success: (res) => {
      console.log("Element successfully removed");
      alert("Elemento eliminado exitosamente");
    },
    error: (jqXHR, textStatus, err) => {
      // alert(`text status ${textStatus} err ${err}`);
      alert("Error al eliminar, por favor intentar nuevamente");
    },
  });
  setTimeout(() => {
    getOnClick(`http://${IP}:9090/api/delivery`);
  }, 500);
};

const patchOnClick = (url) => {
  $.ajax({
    url: url,
    type: "PATCH",
    data: {
      name: $("#name-edit")[0].value,
      phone: $("#phone-edit")[0].value,
      date: $("#date-edit")[0].value,
      type: $("#type-edit")[0].value,
      item: $("#item-edit")[0].value,
      state: $("#state-edit")[0].value,
      guide: $("#guide-edit")[0].value,
      notes: $("#notes-edit")[0].value,
    },
    success: (data) => {
      console.log(data.message);
      alert("Elemento editado exitosamente");
    },
    error: (jqXHR, textStatus, err) => {
      // alert(`text status ${textStatus} err ${err}`);
      alert("Error al editar, por favor intentar nuevamente");
    },
  });
  setTimeout(() => {
    getOnClick(`http://${IP}:9090/api/delivery`);
  }, 500);
};

getOnClick(`http://${IP}:9090/api/delivery`);

$("#submit").click(() => {
  postOnClick();
});

$("#search-submit").click(() => {
  getOnClick(`http://${IP}:9090/api/delivery/${$("#search")[0].value}`);
});

$("#edit").click(() => {
  patchOnClick(`http://${IP}:9090/api/delivery/${$("#id")[0].value}`);
});

// $("#filter-submit").click(() => {
//   getOnClick(
//     `http://${IP}:9090/api/delivery?${$("#filter-type-select")[0].value}=${$('#filter-select')[0].value}`
//   );
// });

// $('#sort-submit').click(() => {
//   getOnClick(
//     `http://${IP}:9090/api/delivery?${$("#sort-type-select")[0].value}=${$('#sort-select')[0].value}`
//   );
// })

function removeRow(oButton) {
  let idToRemove = oButton.parentNode.parentNode.firstChild.innerText;
  deleteOnClick(`http://${IP}:9090/api/delivery/${idToRemove}`);
}
