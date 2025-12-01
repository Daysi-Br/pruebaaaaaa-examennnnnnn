window.onload = function () {
  document.getElementById("welcomeModal").style.display = "flex";
};

document.getElementById("welcomeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let nombre = document.getElementById("userName").value;
  let apellido = document.getElementById("userLastName").value;
  let edad = parseInt(document.getElementById("userAge").value);

  let resultado = edad > 20 ? "Es mayor" : "Es menor";

  let mensaje = `Bienvenido ${nombre} ${apellido} - ${resultado}`;
  document.getElementById("greetingText").textContent = mensaje;

  document.getElementById("welcomeModal").style.display = "none";
});

function closeWelcomeModal() {
  document.getElementById("welcomeModal").style.display = "none";
}
