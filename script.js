const select = document.getElementById("wcity2show");
const contenido = document.getElementById("contenido");

select.addEventListener('change', () => {
  switch (select.value) {
    case '1':
      contenido.textContent = "Te estoy mostrando Barcelona.";
      break;
    case '2':
      contenido.textContent = "Te estoy mostrando Madrid.";
      break;
    case '3':
      contenido.textContent = "Te estoy mostrando Zaragoza.";
      break;
    default:
      contenido.textContent = '';
  }
});