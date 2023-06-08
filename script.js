// Datos de Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCzYZS3fhdXKHv6xf8KfNr-EXIQUb3-XSQ",

  authDomain: "weatherapp00-c4189.firebaseapp.com",

  projectId: "weatherapp00-c4189",

  storageBucket: "weatherapp00-c4189.appspot.com",

  messagingSenderId: "557374764193",

  appId: "1:557374764193:web:3b57f5097306b979732ce0",
};

// Inicialización de Firebase
firebase.initializeApp(firebaseConfig);

//Desplegable de ciudades
document.getElementById("ciudades").addEventListener("change", function () {
  var selectedValue = this.value;
  if (selectedValue === "cleanDOM01") {
    cleanDOM01();
  } else {
    mostrarClima();
  }
});

//Traer los datos de la API y mostrarlos:
function mostrarClima() {
  const fechaHora = new Date().toLocaleString();
  const ciudad = document.getElementById("ciudades").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=4741e3a54a548f26cc82d7647afa1d1b&units=metric&lang=es`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const contenido = document.getElementById("contenido");
      contenido.innerHTML = `
                  <h2>${data.name}, ${data.sys.country}</h2>
                  <p>Clima: ${data.weather[0].description}</p>
                  <p>Temperatura: ${data.main.temp}°C</p>
                  <p>Humedad: ${data.main.humidity}%</p>
                  <p>Presión: ${data.main.pressure} hPa</p>
                  <p>Viento: ${data.wind.speed} m/s</p>
                  <p>Fecha y hora de la consulta: ${fechaHora}</p>
                `;
      //Recogemos datos para Firestore
      enviarDatosClima(
        data.name,
        data.weather[0].description,
        data.main.temp,
        data.main.humidity,
        data.main.pressure,
        data.wind.speed,
        fechaHora
      );
    })
    .catch((error) => console.error(error));
}

//Enviamos a Firestore los datos
function enviarDatosClima(
  ciudad,
  clima,
  temperatura,
  humedad,
  presion,
  viento,
  fechaHora
) {
  const db = firebase.firestore();
  db.collection("clima")
    .add({
      ciudad: ciudad,
      clima: clima,
      temperatura: temperatura,
      humedad: humedad,
      presion: presion,
      viento: viento,
      fechaHora: fechaHora,
    })
    .then((docRef) => {
      console.log("Documento agregado con ID: ", docRef.id);
      alert("Los datos se han enviado correctamente a Firestore.");
    })
    .catch((error) => {
      console.error("Error al agregar documento: ", error);
      alert("Ha habido un problema al enviar los datos a Firestore.");
    });
}

//Limpiar datos de ciudades
function cleanDOM01() {
  var top5Data = document.getElementById("contenido");
  while (top5Data.firstChild) {
    top5Data.removeChild(top5Data.firstChild);
  }
}

//Desplegable top5's e histórico
document.getElementById("mySelect").addEventListener("change", function () {
  var selectedValue = this.value;

  if (selectedValue === "top5htemp") {
    top5htemp();
  } else if (selectedValue === "top5ltemp") {
    top5ltemp();
  } else if (selectedValue === "top5hhumidity") {
    top5hhumidity();
  } else if (selectedValue === "top5lhumidity") {
    top5lhumidity();
  } else if (selectedValue === "top5hwind") {
    top5hwind();
  } else if (selectedValue === "top5lwind") {
    top5lwind();
  } else if (selectedValue === "allCollection") {
    allCollection();
  } else if (selectedValue === "cleanDOM02") {
    cleanDOM02();
  }
});

//Top5 Temperaturas Altas
function top5htemp() {
  var db = firebase.firestore();
  var collectionRef = db.collection("clima");
  var top5Div = document.getElementById("top5Data");

  collectionRef
    .orderBy("temperatura", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      top5Div.innerHTML = "";
      var i = 1;
      querySnapshot.forEach((doc) => {
        var ciudad = doc.data().ciudad;
        var temperatura = doc.data().temperatura;
        var fechaHora = doc.data().fechaHora;

        var item = document.createElement("div");
        item.innerHTML =
          "top" + i + ": " + ciudad + ", " + temperatura + "ºC, " + fechaHora;
        top5Div.appendChild(item);

        i++;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Top5 Temperaturas Bajas
function top5ltemp() {
  var db = firebase.firestore();
  var collectionRef = db.collection("clima");
  var top5Div = document.getElementById("top5Data");

  collectionRef
    .orderBy("temperatura", "asc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      top5Div.innerHTML = "";
      var i = 1;
      querySnapshot.forEach((doc) => {
        var ciudad = doc.data().ciudad;
        var temperatura = doc.data().temperatura;
        var fechaHora = doc.data().fechaHora;

        var item = document.createElement("div");
        item.innerHTML =
          "top" + i + ": " + ciudad + ", " + temperatura + "ºC, " + fechaHora;
        top5Div.appendChild(item);

        i++;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Top5 Humedad Alta
function top5hhumidity() {
  var db = firebase.firestore();
  var collectionRef = db.collection("clima");
  var top5Div = document.getElementById("top5Data");

  collectionRef
    .orderBy("humedad", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      top5Div.innerHTML = "";
      var i = 1;
      querySnapshot.forEach((doc) => {
        var ciudad = doc.data().ciudad;
        var humedad = doc.data().humedad;
        var fechaHora = doc.data().fechaHora;

        var item = document.createElement("div");
        item.innerHTML =
          "top" + i + ": " + ciudad + ", " + humedad + "%, " + fechaHora;
        top5Div.appendChild(item);

        i++;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Top5 Humedad Baja
function top5lhumidity() {
  var db = firebase.firestore();
  var collectionRef = db.collection("clima");
  var top5Div = document.getElementById("top5Data");

  collectionRef
    .orderBy("humedad", "asc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      top5Div.innerHTML = "";
      var i = 1;
      querySnapshot.forEach((doc) => {
        var ciudad = doc.data().ciudad;
        var humedad = doc.data().humedad;
        var fechaHora = doc.data().fechaHora;

        var item = document.createElement("div");
        item.innerHTML =
          "top" + i + ": " + ciudad + ", " + humedad + "%, " + fechaHora;
        top5Div.appendChild(item);

        i++;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Top5 Mayor Velocidad del Viento
function top5hwind() {
  var db = firebase.firestore();
  var collectionRef = db.collection("clima");
  var top5Div = document.getElementById("top5Data");

  collectionRef
    .orderBy("viento", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      top5Div.innerHTML = "";
      var i = 1;
      querySnapshot.forEach((doc) => {
        var ciudad = doc.data().ciudad;
        var viento = doc.data().viento;
        var fechaHora = doc.data().fechaHora;

        var item = document.createElement("div");
        item.innerHTML =
          "top" + i + ": " + ciudad + ", " + viento + "m/s, " + fechaHora;
        top5Div.appendChild(item);

        i++;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Top5 Menor Velocidad del Viento
function top5lwind() {
  var db = firebase.firestore();
  var collectionRef = db.collection("clima");
  var top5Div = document.getElementById("top5Data");

  collectionRef
    .orderBy("viento", "asc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      top5Div.innerHTML = "";
      var i = 1;
      querySnapshot.forEach((doc) => {
        var ciudad = doc.data().ciudad;
        var viento = doc.data().viento;
        var fechaHora = doc.data().fechaHora;

        var item = document.createElement("div");
        item.innerHTML =
          "top" + i + ": " + ciudad + ", " + viento + "m/s, " + fechaHora;
        top5Div.appendChild(item);

        i++;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Mostrar todos los docus de la Colección de Firestore (ordenados por fecha)
function allCollection() {
  var db = firebase.firestore();
  var collectionRef = db.collection("clima");
  var top5Div = document.getElementById("top5Data");

  collectionRef
    .orderBy("fechaHora", "asc")
    .limit(99)
    .get()
    .then((querySnapshot) => {
      top5Div.innerHTML = "";
      var i = 1;
      querySnapshot.forEach((doc) => {
        var ciudad = doc.data().ciudad;
        var clima = doc.data().clima;
        var temperatura = doc.data().temperatura;
        var fechaHora = doc.data().fechaHora;
        var item = document.createElement("div");
        item.innerHTML =
          "doc" +
          i +
          ": " +
          ciudad +
          ", " +
          clima +
          ", " +
          temperatura +
          "ºC, " +
          fechaHora +
          ".";
        top5Div.appendChild(item);

        i++;
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//Limpiar top5Data 
function cleanDOM02() {
  var top5Data = document.getElementById("top5Data");
  while (top5Data.firstChild) {
    top5Data.removeChild(top5Data.firstChild);
  }
}


//2023 by atrislab | no rights reserved | 
//understand your neighbor and the code | 
//share your knowledge, your love, and your code |
//For Those About to Code, We Salute You | 
//May the code be with you | 
//This is the Way |
//Really, That's All Folks (by now)|