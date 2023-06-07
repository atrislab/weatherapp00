// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCzYZS3fhdXKHv6xf8KfNr-EXIQUb3-XSQ",
  
    authDomain: "weatherapp00-c4189.firebaseapp.com",
  
    projectId: "weatherapp00-c4189",
  
    storageBucket: "weatherapp00-c4189.appspot.com",
  
    messagingSenderId: "557374764193",
  
    appId: "1:557374764193:web:3b57f5097306b979732ce0",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



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
                  <p>Fecha y hora de la consulta: ${fechaHora}</p>
                  <p>Temperatura: ${data.main.temp}°C</p>
                  <p>Sensación térmica: ${data.main.feels_like}°C</p>
                  <p>Clima: ${data.weather[0].description}</p>
                `;
        //Recogemos datos para Firestore
        enviarDatosClima(data.name, fechaHora, data.main.temp, data.main.feels_like, data.weather[0].description);
      })
      .catch((error) => console.error(error));
  }
  
  const select = document.getElementById("ciudades");
  select.addEventListener("change", mostrarClima);
  
  //Enviamos a Firestore los datos
  function enviarDatosClima(ciudad, fechaHora, temperatura, sensacionTermica, clima) {
    const db = firebase.firestore();
    db.collection("clima").add({
      ciudad: ciudad,
      fechaHora: fechaHora,
      temperatura: temperatura,
      sensacionTermica: sensacionTermica,
      clima: clima
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
