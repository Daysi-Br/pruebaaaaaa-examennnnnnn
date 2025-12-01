(function () {
  emailjs.init("ioeOTFoxcV74jYCfy");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-examen");
  const alumno = JSON.parse(localStorage.getItem("alumno"));

  if (!form || !alumno) return;

  document.getElementById("datos-alumno").innerHTML = `
    <p><b>Alumno:</b> ${alumno.nombre} ${alumno.apellido}</p>
    <p><b>Curso:</b> ${alumno.curso}</p>
  `;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const params = {
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email,
      curso: alumno.curso,
      p1: document.querySelector("input[name='p1']:checked")?.value || "",
      p2: document.querySelector("input[name='p2']:checked")?.value || "",
      p3: document.getElementById("p3").value,
      fecha: new Date().toLocaleString()
    };

    emailjs
      .send("service_hf2hjim", "template_w8ubmqn", params)
      .then(() => {
        alert("✅ Examen enviado correctamente");
        localStorage.clear();
        window.location.href = "../index.html";
      })
      .catch(err => {
        alert("❌ Error al enviar el examen");
        console.error(err);
      });
  });
});
