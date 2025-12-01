function consultarClima() {
    let ciudad = document.getElementById("ciudad").value;

    if (ciudad === "") {
        alert("Por favor ingrese una ciudad");
        return;
    }

    const apiKey = "6c9cce30d97009591e38713c46ed4397";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod !== 200) {
                document.getElementById("resultadoClima").innerHTML =
                    "<p>Ciudad no encontrada.</p>";
                return;
            }

            let temp = data.main.temp;
            let sensacion = data.main.feels_like;
            let descripcion = data.weather[0].description;
            let icono = data.weather[0].icon;

            let urlIcono = `https://openweathermap.org/img/wn/${icono}@2x.png`;

            document.getElementById("resultadoClima").innerHTML = `
                <h3>${data.name}</h3>
                <img src="${urlIcono}" alt="Icono del clima">
                <p><strong>Temperatura:</strong> ${temp} °C</p>
                <p><strong>Sensación térmica:</strong> ${sensacion} °C</p>
                <p><strong>Clima:</strong> ${descripcion}</p>
            `;
        })
        .catch(error => {
            document.getElementById("resultadoClima").innerHTML =
                "<p>Error al conectar con la API.</p>";
        });
}
