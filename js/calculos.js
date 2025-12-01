function sumar() {
    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);
    document.getElementById("resultado").innerText = "Resultado: " + (n1 + n2);
}

function restar() {
    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);
    document.getElementById("resultado").innerText = "Resultado: " + (n1 - n2);
}

function multiplicar() {
    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);
    document.getElementById("resultado").innerText = "Resultado: " + (n1 * n2);
}

function dividir() {
    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);

    if (n2 === 0) {
        document.getElementById("resultado").innerText = "Error: no se puede dividir entre 0";
    } else {
        document.getElementById("resultado").innerText = "Resultado: " + (n1 / n2);
    }
}
