// =============================
// CONTADOR DE MONEDAS Y BILLETES
// =============================

// Denominaciones
const monedas = [1, 2, 5, 10, 20];
const billetes = [20, 50, 100, 200, 500, 1000];

// Función para generar las filas en cada tabla
function generarFilas(tablaId, valores) {
  const tbody = document.querySelector(`#${tablaId} tbody`);
  tbody.innerHTML = ""; // Limpia antes de generar

  valores.forEach(valor => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>$${valor}</td>
      <td><input type="number" min="0" value="0" class="cantidad"></td>
      <td class="subtotal">$0.00</td>
    `;
    tbody.appendChild(fila);
  });
}

// Función para calcular el total de una tabla
function calcularTotales(tablaId, valores, totalId) {
  const filas = document.querySelectorAll(`#${tablaId} tbody tr`);
  let total = 0;

  filas.forEach((fila, i) => {
    const cantidad = parseFloat(fila.querySelector(".cantidad").value) || 0;
    const subtotal = cantidad * valores[i];
    fila.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
    total += subtotal;
  });

  document.getElementById(totalId).textContent = `$${total.toFixed(2)}`;
  actualizarTotalGeneral();
}

// Función para limpiar una tabla
function limpiarTabla(tablaId, totalId) {
  const filas = document.querySelectorAll(`#${tablaId} tbody tr`);
  filas.forEach(fila => {
    fila.querySelector(".cantidad").value = 0;
    fila.querySelector(".subtotal").textContent = "$0.00";
  });
  document.getElementById(totalId).textContent = "$0.00";
  actualizarTotalGeneral();
}

// Función para actualizar el total general
function actualizarTotalGeneral() {
  const totalMonedas = parseFloat(document.getElementById("total-monedas").textContent.replace("$", "")) || 0;
  const totalBilletes = parseFloat(document.getElementById("total-billetes").textContent.replace("$", "")) || 0;
  const totalGeneral = totalMonedas + totalBilletes;
  document.getElementById("total-general").textContent = `$${totalGeneral.toFixed(2)}`;
}

// =============================
// EVENTOS PRINCIPALES
// =============================
window.addEventListener("DOMContentLoaded", () => {
  // Generar filas automáticamente
  generarFilas("tabla-monedas", monedas);
  generarFilas("tabla-billetes", billetes);

  // Botones
  document.getElementById("calc-monedas").addEventListener("click", () => {
    calcularTotales("tabla-monedas", monedas, "total-monedas");
  });

  document.getElementById("calc-billetes").addEventListener("click", () => {
    calcularTotales("tabla-billetes", billetes, "total-billetes");
  });

  document.getElementById("reset-monedas").addEventListener("click", () => {
    limpiarTabla("tabla-monedas", "total-monedas");
  });

  document.getElementById("reset-billetes").addEventListener("click", () => {
    limpiarTabla("tabla-billetes", "total-billetes");
  });
});
