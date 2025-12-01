(function () {
  emailjs.init("ioeOTFoxcV74jYCfy");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-matriculacion");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const email = document.getElementById("email").value;
    const curso = document.getElementById("curso").value;

    const params = {
      nombre,
      apellido,
      edad,
      email,
      curso,
      fecha: new Date().toLocaleString()
    };

    emailjs
      .send("service_hf2hjim", "template_w8ubmqn", params)
      .then(() => {
        alert("✅ Matriculación enviada correctamente");
        localStorage.setItem("alumno", JSON.stringify(params));
        window.location.href = "prueba.html";
      })
      .catch((error) => {
        alert("❌ Error al enviar el formulario");
        console.error(error);
      });
  });
});
