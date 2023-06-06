// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCzYZS3fhdXKHv6xf8KfNr-EXIQUb3-XSQ",

  authDomain: "weatherapp00-c4189.firebaseapp.com",

  projectId: "weatherapp00-c4189",

  storageBucket: "weatherapp00-c4189.appspot.com",

  messagingSenderId: "557374764193",

  appId: "1:557374764193:web:3b57f5097306b979732ce0",
};

//fetch a la API + fechaHora
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
    })
    .catch((error) => console.error(error));
}

const select = document.getElementById("ciudades");
select.addEventListener("change", mostrarClima);

/*function mostrarClima() {
  const ciudad = document.getElementById("ciudades").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=4741e3a54a548f26cc82d7647afa1d1b&units=metric&lang=es`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const contenido = document.getElementById("contenido");
      contenido.innerHTML = `
              <h2>${data.name}, ${data.sys.country}</h2>
              <p>Temperatura: ${data.main.temp}°C</p>
              <p>Sensación térmica: ${data.main.feels_like}°C</p>
              <p>Clima: ${data.weather[0].description}</p>
            `;
    })
    .catch((error) => console.error(error));
}

const select = document.getElementById("ciudades");
select.addEventListener("change", mostrarClima);
*/

/*
function mostrarContenido() {
    var contenedor = document.getElementById("contenedor");
    if (contenedor.innerHTML === "") {
      contenedor.classList.add("oculto");
    } else {
      contenedor.classList.remove("oculto");
    }
  }
  */
