/* =========================================================
   ÚTILHUB V4
   Sin IA.
   Herramientas + comida + compras + servicios.
   ========================================================= */


/* =========================================================
   MODAL
   ========================================================= */

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

function abrirModal(contenido) {
  modalBody.innerHTML = contenido;
  modal.classList.add("active");
}

function cerrarModal() {
  modal.classList.remove("active");
  modalBody.innerHTML = "";
}

modal.addEventListener("click", function(e) {
  if (e.target === modal) {
    cerrarModal();
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    cerrarModal();
  }
});


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

function toggleMenu() {
  const nav = document.querySelector(".nav");

  if (nav.style.display === "flex") {
    nav.style.display = "";
  } else {
    nav.style.display = "flex";
    nav.style.position = "absolute";
    nav.style.top = "76px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "20px";
    nav.style.flexDirection = "column";
    nav.style.background = "rgba(5,8,22,.97)";
    nav.style.borderBottom = "1px solid rgba(255,255,255,.1)";
  }
}


/* =========================================================
   BÚSQUEDA GENERAL
   ========================================================= */

function buscarHerramienta() {

  const texto = document
    .getElementById("buscador")
    .value
    .toLowerCase()
    .trim();

  const tarjetas = document.querySelectorAll(".herramienta");
  let visibles = 0;

  tarjetas.forEach(tarjeta => {

    const contenido = tarjeta.dataset.nombre.toLowerCase();

    const coincide =
      texto === "" ||
      contenido.includes(texto);

    tarjeta.style.display = coincide ? "flex" : "none";

    if (coincide) {
      visibles++;
    }
  });

  const resultado = document.getElementById("resultadoBusqueda");

  if (texto === "") {
    resultado.textContent = "";
  } else {
    resultado.textContent =
      `${visibles} resultado${visibles === 1 ? "" : "s"}`;
  }
}


/* =========================================================
   ABRIR HERRAMIENTA
   ========================================================= */

function abrirHerramienta(tipo) {

  const herramientas = {

    calculadora: `
      <h2 class="modal-title">🧮 Calculadora</h2>

      <div class="tool-form">

        <label>Operación</label>

        <input
          id="calcInput"
          type="text"
          placeholder="Ej: 25 + 8 * 3"
          onkeydown="if(event.key==='Enter') calcular()"
        >

        <button onclick="calcular()">Calcular</button>

        <div id="calcOutput" class="tool-output">
          Escribe una operación.
        </div>

      </div>
    `,

    convertidor: `
      <h2 class="modal-title">📏 Conversor de unidades</h2>

      <div class="tool-form">

        <label>Valor</label>
        <input id="convValor" type="number" placeholder="Ej: 100">

        <label>Tipo</label>

        <select id="convTipo">
          <option value="km-m">Kilómetros → metros</option>
          <option value="m-km">Metros → kilómetros</option>
          <option value="m-cm">Metros → centímetros</option>
          <option value="cm-m">Centímetros → metros</option>
          <option value="kg-g">Kilogramos → gramos</option>
          <option value="g-kg">Gramos → kilogramos</option>
          <option value="l-ml">Litros → mililitros</option>
          <option value="ml-l">Mililitros → litros</option>
        </select>

        <button onclick="convertirUnidad()">Convertir</button>

        <div id="convOutput" class="tool-output"></div>

      </div>
    `,

    porcentaje: `
      <h2 class="modal-title">％ Porcentajes</h2>

      <div class="tool-form">

        <label>Porcentaje</label>
        <input id="porcentajeValor" type="number" placeholder="Ej: 20">

        <label>De</label>
        <input id="porcentajeTotal" type="number" placeholder="Ej: 150">

        <button onclick="calcularPorcentaje()">Calcular</button>

        <div id="porcentajeOutput" class="tool-output"></div>

      </div>
    `,

    descuento: `
      <h2 class="modal-title">🏷️ Descuentos</h2>

      <div class="tool-form">

        <label>Precio original</label>
        <input id="precioOriginal" type="number" min="0" step="0.01">

        <label>Descuento (%)</label>
        <input id="descuentoValor" type="number" min="0" max="100">

        <button onclick="calcularDescuento()">Calcular</button>

        <div id="descuentoOutput" class="tool-output"></div>

      </div>
    `,

    dias: `
      <h2 class="modal-title">📅 Contador de días</h2>

      <div class="tool-form">

        <label>Fecha inicial</label>
        <input id="fecha1" type="date">

        <label>Fecha final</label>
        <input id="fecha2" type="date">

        <button onclick="contarDias()">Calcular días</button>

        <div id="diasOutput" class="tool-output"></div>

      </div>
    `,

    temperatura: `
      <h2 class="modal-title">🌡️ Temperatura</h2>

      <div class="tool-form">

        <label>Temperatura</label>
        <input id="tempValor" type="number">

        <select id="tempTipo">
          <option value="c-f">°C → °F</option>
          <option value="f-c">°F → °C</option>
          <option value="c-k">°C → K</option>
          <option value="k-c">K → °C</option>
        </select>

        <button onclick="convertirTemperatura()">Convertir</button>

        <div id="tempOutput" class="tool-output"></div>

      </div>
    `,

    peso: `
      <h2 class="modal-title">⚖️ Conversor de peso</h2>

      <div class="tool-form">

        <label>Valor</label>
        <input id="pesoValor" type="number">

        <select id="pesoTipo">
          <option value="kg-g">kg → g</option>
          <option value="g-kg">g → kg</option>
          <option value="kg-lb">kg → lb</option>
          <option value="lb-kg">lb → kg</option>
        </select>

        <button onclick="convertirPeso()">Convertir</button>

        <div id="pesoOutput" class="tool-output"></div>

      </div>
    `,

    distancia: `
      <h2 class="modal-title">🛣️ Distancia</h2>

      <div class="tool-form">

        <label>Valor</label>
        <input id="distValor" type="number">

        <select id="distTipo">
          <option value="km-m">km → m</option>
          <option value="m-km">m → km</option>
          <option value="km-mi">km → millas</option>
          <option value="mi-km">millas → km</option>
        </select>

        <button onclick="convertirDistancia()">Convertir</button>

        <div id="distOutput" class="tool-output"></div>

      </div>
    `,

    temporizador: `
      <h2 class="modal-title">⏱️ Temporizador</h2>

      <div class="tool-form">

        <label>Segundos</label>
        <input id="timerSeconds" type="number" min="1" value="60">

        <button onclick="iniciarTemporizador()">Iniciar</button>
        <button onclick="detenerTemporizador()">Detener</button>
        <button onclick="reiniciarTemporizador()">Reiniciar</button>

        <div id="timerOutput" class="tool-output">
          01:00
        </div>

      </div>
    `,

    cronometro: `
      <h2 class="modal-title">⏲️ Cronómetro</h2>

      <div class="tool-form">

        <button onclick="iniciarCronometro()">Iniciar</button>
        <button onclick="pausarCronometro()">Pausar</button>
        <button onclick="reiniciarCronometro()">Reiniciar</button>

        <div id="stopwatchOutput" class="tool-output">
          00:00.00
        </div>

      </div>
    `,

    notas: `
      <h2 class="modal-title">📝 Mis notas</h2>

      <div class="tool-form">

        <textarea
          id="notasTexto"
          placeholder="Escribe tus notas aquí..."
        ></textarea>

        <button onclick="guardarNotas()">Guardar nota</button>

        <button onclick="borrarNotas()">Borrar</button>

        <div id="notasOutput" class="tool-output"></div>

      </div>
    `,

    tareas: `
      <h2 class="modal-title">✅ Lista de tareas</h2>

      <div class="tool-form">

        <input
          id="tareaTexto"
          type="text"
          placeholder="Escribe una tarea"
        >

        <button onclick="agregarTarea()">Agregar tarea</button>

        <ul id="tareasLista" class="simple-list"></ul>

      </div>
    `,

    "compras-lista": `
      <h2 class="modal-title">🛒 Lista de compras</h2>

      <div class="tool-form">

        <input
          id="compraTexto"
          type="text"
          placeholder="Ej: arroz"
        >

        <button onclick="agregarCompra()">Agregar</button>

        <ul id="comprasListaModal" class="simple-list"></ul>

      </div>
    `,

    password: `
      <h2 class="modal-title">🔐 Generador de contraseñas</h2>

      <div class="tool-form">

        <label>Longitud</label>
        <input id="passLength" type="number" min="6" max="64" value="16">

        <button onclick="generarPassword()">Generar</button>

        <input id="passOutput" readonly>

        <button onclick="copiarPassword()">Copiar</button>

      </div>
    `,

    qr: `
      <h2 class="modal-title">▦ Código QR</h2>

      <div class="tool-form">

        <label>Texto o enlace</label>

        <input
          id="qrTexto"
          type="text"
          placeholder="https://ejemplo.com"
        >

        <button onclick="generarQR()">Generar QR</button>

        <div id="qrOutput" class="tool-output"></div>

      </div>
    `,

    aleatorio: `
      <h2 class="modal-title">🎲 Número aleatorio</h2>

      <div class="tool-form">

        <label>Mínimo</label>
        <input id="randomMin" type="number" value="1">

        <label>Máximo</label>
        <input id="randomMax" type="number" value="100">

        <button onclick="numeroAleatorio()">Generar</button>

        <div id="randomOutput" class="tool-output"></div>

      </div>
    `,

    dado: `
      <h2 class="modal-title">🎯 Lanzar dado</h2>

      <div class="tool-form">

        <button onclick="lanzarDado()">Lanzar dado</button>

        <div
          id="dadoOutput"
          class="tool-output"
          style="font-size:50px;text-align:center;"
        >
          🎲
        </div>

      </div>
    `,

    diccionario: `
      <h2 class="modal-title">📖 Diccionario</h2>

      <div class="tool-form">

        <input
          id="diccionarioPalabra"
          type="text"
          placeholder="Escribe una palabra"
        >

        <button onclick="buscarPalabra()">Buscar</button>

        <div id="diccionarioOutput" class="tool-output">
          La búsqueda necesita conexión a Internet.
        </div>

      </div>
    `,

    "estudio-organizador": `
      <h2 class="modal-title">📚 Organizador de estudio</h2>

      <div class="tool-form">

        <input id="materiaEstudio" type="text" placeholder="Materia">

        <input id="fechaEstudio" type="date">

        <input id="horaEstudio" type="time">

        <input
          id="temaEstudio"
          type="text"
          placeholder="Tema que estudiarás"
        >

        <button onclick="agregarSesionEstudio()">
          Guardar sesión
        </button>

        <ul id="estudioLista" class="simple-list"></ul>

      </div>
    `,

    consejos: `
      <h2 class="modal-title">💡 Consejos útiles</h2>

      <div class="tool-output">
        <p>📌 Divide las tareas grandes en pasos pequeños.</p>
        <br>
        <p>⏱️ Usa un temporizador para concentrarte durante tus sesiones.</p>
        <br>
        <p>📝 Guarda tus ideas importantes en tus notas.</p>
        <br>
        <p>🛒 Haz una lista antes de comprar para organizar tus gastos.</p>
        <br>
        <p>📅 Usa fechas para planificar tus actividades.</p>
        <br>
        <p>🔎 Compara opciones antes de realizar una compra.</p>
      </div>
    `
  };

  if (!herramientas[tipo]) {
    return;
  }

  abrirModal(herramientas[tipo]);

  if (tipo === "notas") {
    cargarNotas();
  }

  if (tipo === "tareas") {
    mostrarTareas();
  }

  if (tipo === "compras-lista") {
    mostrarCompras();
  }

  if (tipo === "estudio-organizador") {
    mostrarSesionesEstudio();
  }
}


/* =========================================================
   CALCULADORA SEGURA
   ========================================================= */

function calcular() {

  const input = document.getElementById("calcInput");
  const output = document.getElementById("calcOutput");

  if (!input || !output) return;

  const expresion = input.value.trim();

  if (!expresion) {
    output.textContent = "Escribe una operación.";
    return;
  }

  try {

    const resultado = evaluarMatematica(expresion);

    if (!Number.isFinite(resultado)) {
      throw new Error();
    }

    output.textContent = `Resultado: ${resultado}`;

  } catch {
    output.textContent =
      "Operación no válida. Usa números, +, -, *, / y paréntesis.";
  }
}


function evaluarMatematica(texto) {

  const tokens = texto.match(/\d+(?:\.\d+)?|[+\-*/()]|\s+/g);

  if (!tokens) {
    throw new Error();
  }

  const lista = tokens
    .filter(t => !/\s/.test(t));

  let posicion = 0;

  function expresion() {

    let valor = termino();

    while (
      lista[posicion] === "+" ||
      lista[posicion] === "-"
    ) {

      const operador = lista[posicion++];

      const siguiente = termino();

      if (operador === "+") {
        valor += siguiente;
      } else {
        valor -= siguiente;
      }
    }

    return valor;
  }

  function termino() {

    let valor = factor();

    while (
      lista[posicion] === "*" ||
      lista[posicion] === "/"
    ) {

      const operador = lista[posicion++];

      const siguiente = factor();

      if (operador === "*") {
        valor *= siguiente;
      } else {

        if (siguiente === 0) {
          throw new Error();
        }

        valor /= siguiente;
      }
    }

    return valor;
  }

  function factor() {

    const token = lista[posicion];

    if (token === "+") {
      posicion++;
      return factor();
    }

    if (token === "-") {
      posicion++;
      return -factor();
    }

    if (token === "(") {

      posicion++;

      const valor = expresion();

      if (lista[posicion] !== ")") {
        throw new Error();
      }

      posicion++;

      return valor;
    }

    if (/^\d/.test(token || "")) {

      posicion++;

      return Number(token);
    }

    throw new Error();
  }

  const resultado = expresion();

  if (posicion !== lista.length) {
    throw new Error();
  }

  return resultado;
}


/* =========================================================
   CONVERSOR
   ========================================================= */

function convertirUnidad() {

  const valor = Number(document.getElementById("convValor").value);
  const tipo = document.getElementById("convTipo").value;
  const output = document.getElementById("convOutput");

  if (!Number.isFinite(valor)) {
    output.textContent = "Introduce un valor válido.";
    return;
  }

  const conversiones = {

    "km-m": [1000, "m"],
    "m-km": [0.001, "km"],
    "m-cm": [100, "cm"],
    "cm-m": [0.01, "m"],
    "kg-g": [1000, "g"],
    "g-kg": [0.001, "kg"],
    "l-ml": [1000, "ml"],
    "ml-l": [0.001, "l"]
  };

  const conversion = conversiones[tipo];

  output.textContent =
    `${valor} → ${valor * conversion[0]} ${conversion[1]}`;
}


/* =========================================================
   PORCENTAJE
   ========================================================= */

function calcularPorcentaje() {

  const porcentaje =
    Number(document.getElementById("porcentajeValor").value);

  const total =
    Number(document.getElementById("porcentajeTotal").value);

  const output =
    document.getElementById("porcentajeOutput");

  if (!Number.isFinite(porcentaje) || !Number.isFinite(total)) {
    output.textContent = "Completa los valores.";
    return;
  }

  const resultado = (porcentaje / 100) * total;

  output.textContent =
    `${porcentaje}% de ${total} = ${resultado}`;
}


/* =========================================================
   DESCUENTOS
   ========================================================= */

function calcularDescuento() {

  const precio =
    Number(document.getElementById("precioOriginal").value);

  const descuento =
    Number(document.getElementById("descuentoValor").value);

  const output =
    document.getElementById("descuentoOutput");

  if (
    !Number.isFinite(precio) ||
    !Number.isFinite(descuento) ||
    precio < 0 ||
    descuento < 0 ||
    descuento > 100
  ) {
    output.textContent = "Introduce valores válidos.";
    return;
  }

  const ahorro = precio * descuento / 100;
  const final = precio - ahorro;

  output.innerHTML = `
    Precio original: <strong>S/ ${precio.toFixed(2)}</strong><br>
    Ahorras: <strong>S/ ${ahorro.toFixed(2)}</strong><br>
    Precio final: <strong>S/ ${final.toFixed(2)}</strong>
  `;
}


/* =========================================================
   FECHAS
   ========================================================= */

function contarDias() {

  const fecha1 = document.getElementById("fecha1").value;
  const fecha2 = document.getElementById("fecha2").value;
  const output = document.getElementById("diasOutput");

  if (!fecha1 || !fecha2) {
    output.textContent = "Selecciona ambas fechas.";
    return;
  }

  const inicio = new Date(`${fecha1}T00:00:00`);
  const fin = new Date(`${fecha2}T00:00:00`);

  const diferencia =
    Math.abs(fin - inicio);

  const dias =
    Math.round(diferencia / 86400000);

  output.textContent = `Hay ${dias} día${dias === 1 ? "" : "s"} de diferencia.`;
}


/* =========================================================
   TEMPERATURA
   ========================================================= */

function convertirTemperatura() {

  const valor =
    Number(document.getElementById("tempValor").value);

  const tipo =
    document.getElementById("tempTipo").value;

  const output =
    document.getElementById("tempOutput");

  if (!Number.isFinite(valor)) {
    output.textContent = "Introduce una temperatura.";
    return;
  }

  let resultado;
  let unidad;

  switch (tipo) {

    case "c-f":
      resultado = valor * 9 / 5 + 32;
      unidad = "°F";
      break;

    case "f-c":
      resultado = (valor - 32) * 5 / 9;
      unidad = "°C";
      break;

    case "c-k":
      resultado = valor + 273.15;
      unidad = "K";
      break;

    case "k-c":
      resultado = valor - 273.15;
      unidad = "°C";
      break;
  }

  output.textContent =
    `${resultado.toFixed(2)} ${unidad}`;
}


/* =========================================================
   PESO
   ========================================================= */

function convertirPeso() {

  const valor =
    Number(document.getElementById("pesoValor").value);

  const tipo =
    document.getElementById("pesoTipo").value;

  const output =
    document.getElementById("pesoOutput");

  if (!Number.isFinite(valor)) {
    output.textContent = "Introduce un valor.";
    return;
  }

  let resultado;
  let unidad;

  switch (tipo) {

    case "kg-g":
      resultado = valor * 1000;
      unidad = "g";
      break;

    case "g-kg":
      resultado = valor / 1000;
      unidad = "kg";
      break;

    case "kg-lb":
      resultado = valor * 2.2046226218;
      unidad = "lb";
      break;

    case "lb-kg":
      resultado = valor / 2.2046226218;
      unidad = "kg";
      break;
  }

  output.textContent =
    `${resultado.toFixed(3)} ${unidad}`;
}


/* =========================================================
   DISTANCIA
   ========================================================= */

function convertirDistancia() {

  const valor =
    Number(document.getElementById("distValor").value);

  const tipo =
    document.getElementById("distTipo").value;

  const output =
    document.getElementById("distOutput");

  if (!Number.isFinite(valor)) {
    output.textContent = "Introduce un valor.";
    return;
  }

  let resultado;
  let unidad;

  switch (tipo) {

    case "km-m":
      resultado = valor * 1000;
      unidad = "m";
      break;

    case "m-km":
      resultado = valor / 1000;
      unidad = "km";
      break;

    case "km-mi":
      resultado = valor * 0.621371;
      unidad = "millas";
      break;

    case "mi-km":
      resultado = valor / 0.621371;
      unidad = "km";
      break;
  }

  output.textContent =
    `${resultado.toFixed(3)} ${unidad}`;
}


/* =========================================================
   TEMPORIZADOR
   ========================================================= */

let timerInterval = null;
let timerEnd = null;
let timerRemaining = 60;

function iniciarTemporizador() {

  const input = document.getElementById("timerSeconds");

  if (!input) return;

  if (!timerInterval) {

    const segundos = Number(input.value);

    if (!Number.isFinite(segundos) || segundos <= 0) {
      alert("Introduce un número de segundos válido.");
      return;
    }

    if (timerRemaining <= 0 || timerRemaining === 60) {
      timerRemaining = segundos;
    }

    timerEnd = Date.now() + timerRemaining * 1000;

    timerInterval = setInterval(actualizarTemporizador, 100);

    actualizarTemporizador();
  }
}

function actualizarTemporizador() {

  const output = document.getElementById("timerOutput");

  if (!output) {
    detenerTemporizador();
    return;
  }

  timerRemaining =
    Math.max(0, timerEnd - Date.now()) / 1000;

  const segundos =
    Math.ceil(timerRemaining);

  const minutos =
    Math.floor(segundos / 60);

  const resto =
    segundos % 60;

  output.textContent =
    `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;

  if (timerRemaining <= 0) {

    clearInterval(timerInterval);
    timerInterval = null;

    output.textContent = "00:00";

    setTimeout(() => {
      alert("⏰ ¡Tiempo terminado!");
    }, 100);
  }
}

function detenerTemporizador() {

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (timerEnd) {
    timerRemaining =
      Math.max(0, timerEnd - Date.now()) / 1000;
  }
}

function reiniciarTemporizador() {

  detenerTemporizador();

  const input = document.getElementById("timerSeconds");
  const output = document.getElementById("timerOutput");

  if (!input || !output) return;

  timerRemaining = Number(input.value) || 60;

  const segundos = Math.ceil(timerRemaining);

  output.textContent =
    `${String(Math.floor(segundos / 60)).padStart(2, "0")}:${String(segundos % 60).padStart(2, "0")}`;
}


/* =========================================================
   CRONÓMETRO
   ========================================================= */

let stopwatchInterval = null;
let stopwatchStart = 0;
let stopwatchElapsed = 0;

function iniciarCronometro() {

  if (stopwatchInterval) return;

  stopwatchStart =
    Date.now() - stopwatchElapsed;

  stopwatchInterval =
    setInterval(actualizarCronometro, 50);

  actualizarCronometro();
}

function actualizarCronometro() {

  const output =
    document.getElementById("stopwatchOutput");

  if (!output) return;

  stopwatchElapsed =
    Date.now() - stopwatchStart;

  mostrarTiempoCronometro();
}

function mostrarTiempoCronometro() {

  const output =
    document.getElementById("stopwatchOutput");

  if (!output) return;

  const totalCent =
    Math.floor(stopwatchElapsed / 10);

  const cent =
    totalCent % 100;

  const segundos =
    Math.floor(totalCent / 100) % 60;

  const minutos =
    Math.floor(totalCent / 6000);

  output.textContent =
    `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}.${String(cent).padStart(2, "0")}`;
}

function pausarCronometro() {

  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
}

function reiniciarCronometro() {

  pausarCronometro();

  stopwatchElapsed = 0;
  stopwatchStart = Date.now();

  mostrarTiempoCronometro();
}


/* =========================================================
   NOTAS
   ========================================================= */

const NOTAS_KEY = "utilhubNotas";

function guardarNotas() {

  const texto =
    document.getElementById("notasTexto").value;

  localStorage.setItem(NOTAS_KEY, texto);

  document.getElementById("notasOutput").textContent =
    "✓ Nota guardada en este dispositivo.";
}

function cargarNotas() {

  const texto =
    localStorage.getItem(NOTAS_KEY) || "";

  const input =
    document.getElementById("notasTexto");

  if (input) {
    input.value = texto;
  }
}

function borrarNotas() {

  localStorage.removeItem(NOTAS_KEY);

  const input =
    document.getElementById("notasTexto");

  if (input) {
    input.value = "";
  }

  const output =
    document.getElementById("notasOutput");

  if (output) {
    output.textContent = "Nota borrada.";
  }
}


/* =========================================================
   TAREAS
   ========================================================= */

const TAREAS_KEY = "utilhubTareas";

function obtenerTareas() {

  try {
    return JSON.parse(
      localStorage.getItem(TAREAS_KEY)
    ) || [];
  } catch {
    return [];
  }
}

function guardarTareas(tareas) {

  localStorage.setItem(
    TAREAS_KEY,
    JSON.stringify(tareas)
  );
}

function agregarTarea() {

  const input =
    document.getElementById("tareaTexto");

  const texto =
    input.value.trim();

  if (!texto) return;

  const tareas =
    obtenerTareas();

  tareas.push({
    id: Date.now(),
    texto,
    completada: false
  });

  guardarTareas(tareas);

  input.value = "";

  mostrarTareas();
}

function cambiarTarea(id) {

  const tareas =
    obtenerTareas();

  const tarea =
    tareas.find(t => t.id === id);

  if (tarea) {
    tarea.completada =
      !tarea.completada;
  }

  guardarTareas(tareas);

  mostrarTareas();
}

function eliminarTarea(id) {

  const tareas =
    obtenerTareas().filter(t => t.id !== id);

  guardarTareas(tareas);

  mostrarTareas();
}

function mostrarTareas() {

  const lista =
    document.getElementById("tareasLista");

  if (!lista) return;

  const tareas =
    obtenerTareas();

  lista.innerHTML = "";

  if (tareas.length === 0) {

    lista.innerHTML =
      "<li>No tienes tareas todavía.</li>";

    return;
  }

  tareas.forEach(tarea => {

    const li =
      document.createElement("li");

    const texto =
      document.createElement("span");

    texto.textContent = tarea.texto;

    if (tarea.completada) {
      texto.style.textDecoration = "line-through";
      texto.style.opacity = ".5";
    }

    const acciones =
      document.createElement("div");

    const check =
      document.createElement("button");

    check.textContent =
      tarea.completada ? "↩️" : "✓";

    check.onclick =
      () => cambiarTarea(tarea.id);

    const eliminar =
      document.createElement("button");

    eliminar.textContent = "🗑️";

    eliminar.onclick =
      () => eliminarTarea(tarea.id);

    acciones.append(check, eliminar);

    li.append(texto, acciones);

    lista.appendChild(li);
  });
}


/* =========================================================
   LISTA DE COMPRAS
   ========================================================= */

const COMPRAS_KEY = "utilhubCompras";

function obtenerCompras() {

  try {
    return JSON.parse(
      localStorage.getItem(COMPRAS_KEY)
    ) || [];
  } catch {
    return [];
  }
}

function guardarCompras(lista) {

  localStorage.setItem(
    COMPRAS_KEY,
    JSON.stringify(lista)
  );
}

function agregarCompra() {

  const input =
    document.getElementById("compraTexto");

  const texto =
    input.value.trim();

  if (!texto) return;

  const compras =
    obtenerCompras();

  compras.push({
    id: Date.now(),
    texto
  });

  guardarCompras(compras);

  input.value = "";

  mostrarCompras();
}

function eliminarCompra(id) {

  const compras =
    obtenerCompras()
      .filter(item => item.id !== id);

  guardarCompras(compras);

  mostrarCompras();
}

function mostrarCompras() {

  const lista =
    document.getElementById("comprasListaModal");

  if (!lista) return;

  const compras =
    obtenerCompras();

  lista.innerHTML = "";

  if (compras.length === 0) {
    lista.innerHTML =
      "<li>No tienes productos en la lista.</li>";
    return;
  }

  compras.forEach(item => {

    const li =
      document.createElement("li");

    const texto =
      document.createElement("span");

    texto.textContent = item.texto;

    const eliminar =
      document.createElement("button");

    eliminar.textContent = "🗑️";

    eliminar.onclick =
      () => eliminarCompra(item.id);

    li.append(texto, eliminar);

    lista.appendChild(li);
  });
}


/* =========================================================
   COMPRAS - LISTA PRINCIPAL
   ========================================================= */

function agregarProductoLista() {

  const input =
    document.getElementById("productoLista");

  const texto =
    input.value.trim();

  if (!texto) return;

  const compras =
    obtenerCompras();

  compras.push({
    id: Date.now(),
    texto
  });

  guardarCompras(compras);

  input.value = "";

  mostrarListaPrincipal();
}

function mostrarListaPrincipal() {

  const lista =
    document.getElementById("listaProductos");

  if (!lista) return;

  const compras =
    obtenerCompras();

  lista.innerHTML = "";

  compras.forEach(item => {

    const li =
      document.createElement("li");

    const span =
      document.createElement("span");

    span.textContent = item.texto;

    const button =
      document.createElement("button");

    button.textContent = "×";

    button.onclick = () => {

      eliminarCompra(item.id);
      mostrarListaPrincipal();

    };

    li.append(span, button);

    lista.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  mostrarListaPrincipal();
});


/* =========================================================
   CALCULADORA DE COMPRA
   ========================================================= */

function calcularCompra() {

  const ids = [
    "precio1",
    "precio2",
    "precio3"
  ];

  let total = 0;

  ids.forEach(id => {

    const valor =
      Number(document.getElementById(id).value);

    if (Number.isFinite(valor) && valor >= 0) {
      total += valor;
    }
  });

  document.getElementById("totalCompra").textContent =
    `S/ ${total.toFixed(2)}`;
}


/* =========================================================
   BÚSQUEDA DE PRODUCTOS
   ========================================================= */

function buscarProducto() {

  const input =
    document.getElementById("productoBusqueda");

  const output =
    document.getElementById("resultadoProducto");

  const producto =
    input.value.trim();

  if (!producto) {

    output.textContent =
      "Escribe un producto para buscar.";

    return;
  }

  const consulta =
    encodeURIComponent(producto);

  output.innerHTML = `
    Buscando opciones para:
    <strong>${escapeHTML(producto)}</strong>
    <br><br>

    <button
      onclick="abrirBusquedaWeb('${consulta}')"
      style="
        border:0;
        padding:9px 12px;
        border-radius:9px;
        background:#4e8dff;
        color:white;
        cursor:pointer;
      "
    >
      🔎 Buscar en la web
    </button>
  `;
}

function abrirBusquedaWeb(consulta) {

  window.open(
    `https://www.google.com/search?q=${consulta}`,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =========================================================
   CONTRASEÑAS
   ========================================================= */

function generarPassword() {

  const length =
    Number(document.getElementById("passLength").value);

  if (
    !Number.isInteger(length) ||
    length < 6 ||
    length > 64
  ) {
    alert("Usa una longitud entre 6 y 64.");
    return;
  }

  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

  const valores =
    new Uint32Array(length);

  crypto.getRandomValues(valores);

  let password = "";

  for (let i = 0; i < length; i++) {
    password +=
      caracteres[valores[i] % caracteres.length];
  }

  document.getElementById("passOutput").value =
    password;
}

async function copiarPassword() {

  const input =
    document.getElementById("passOutput");

  if (!input.value) return;

  try {

    await navigator.clipboard.writeText(input.value);

    alert("✓ Contraseña copiada.");

  } catch {

    input.select();
    document.execCommand("copy");

    alert("✓ Contraseña copiada.");
  }
}


/* =========================================================
   QR
   ========================================================= */

function generarQR() {

  const texto =
    document.getElementById("qrTexto").value.trim();

  const output =
    document.getElementById("qrOutput");

  if (!texto) {

    output.textContent =
      "Escribe un texto o enlace.";

    return;
  }

  const url =
    "https://api.qrserver.com/v1/create-qr-code/" +
    `?size=250x250&data=${encodeURIComponent(texto)}`;

  output.innerHTML = `
    <div style="text-align:center;">
      <img
        src="${url}"
        alt="Código QR"
        width="250"
        height="250"
        style="max-width:100%;border-radius:10px;"
      >

      <br><br>

      <a
        href="${url}"
        target="_blank"
        rel="noopener noreferrer"
        style="color:#7eafff;"
      >
        Abrir QR
      </a>
    </div>
  `;
}


/* =========================================================
   ALEATORIO
   ========================================================= */

function numeroAleatorio() {

  const min =
    Number(document.getElementById("randomMin").value);

  const max =
    Number(document.getElementById("randomMax").value);

  const output =
    document.getElementById("randomOutput");

  if (
    !Number.isInteger(min) ||
    !Number.isInteger(max) ||
    min > max
  ) {
    output.textContent =
      "Introduce un rango válido.";
    return;
  }

  const resultado =
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min;

  output.textContent =
    `Número generado: ${resultado}`;
}


/* =========================================================
   DADO
   ========================================================= */

function lanzarDado() {

  const numero =
    Math.floor(Math.random() * 6) + 1;

  const caras = {
    1: "⚀",
    2: "⚁",
    3: "⚂",
    4: "⚃",
    5: "⚄",
    6: "⚅"
  };

  document.getElementById("dadoOutput").innerHTML =
    `${caras[numero]}<br><small>Resultado: ${numero}</small>`;
}


/* =========================================================
   DICCIONARIO
   ========================================================= */

async function buscarPalabra() {

  const palabra =
    document.getElementById("diccionarioPalabra")
      .value
      .trim()
      .toLowerCase();

  const output =
    document.getElementById("diccionarioOutput");

  if (!palabra) {

    output.textContent =
      "Escribe una palabra.";

    return;
  }

  output.textContent =
    "Buscando definición...";

  try {

    const respuesta =
      await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/es/${encodeURIComponent(palabra)}`
      );

    if (!respuesta.ok) {
      throw new Error();
    }

    const datos =
      await respuesta.json();

    const entrada =
      datos[0];

    const significados =
      entrada.meanings || [];

    let html =
      `<strong>${escapeHTML(entrada.word)}</strong><br><br>`;

    significados.slice(0, 3).forEach(significado => {

      html += `
        <strong>
          ${escapeHTML(significado.partOfSpeech || "Significado")}
        </strong>
        <br>
      `;

      (significado.definitions || [])
        .slice(0, 2)
        .forEach(def => {

          html += `
            • ${escapeHTML(def.definition)}
            <br>
          `;
        });

      html += "<br>";
    });

    output.innerHTML = html;

  } catch {

    output.textContent =
      "No se encontró la palabra o no hay conexión a Internet.";
  }
}


/* =========================================================
   ORGANIZADOR DE ESTUDIO
   ========================================================= */

const ESTUDIO_KEY = "utilhubEstudio";

function obtenerSesionesEstudio() {

  try {
    return JSON.parse(
      localStorage.getItem(ESTUDIO_KEY)
    ) || [];
  } catch {
    return [];
  }
}

function guardarSesionesEstudio(sesiones) {

  localStorage.setItem(
    ESTUDIO_KEY,
    JSON.stringify(sesiones)
  );
}

function agregarSesionEstudio() {

  const materia =
    document.getElementById("materiaEstudio").value.trim();

  const fecha =
    document.getElementById("fechaEstudio").value;

  const hora =
    document.getElementById("horaEstudio").value;

  const tema =
    document.getElementById("temaEstudio").value.trim();

  if (!materia || !fecha || !hora || !tema) {

    alert("Completa todos los campos.");

    return;
  }

  const sesiones =
    obtenerSesionesEstudio();

  sesiones.push({
    id: Date.now(),
    materia,
    fecha,
    hora,
    tema
  });

  guardarSesionesEstudio(sesiones);

  document.getElementById("materiaEstudio").value = "";
  document.getElementById("fechaEstudio").value = "";
  document.getElementById("horaEstudio").value = "";
  document.getElementById("temaEstudio").value = "";

  mostrarSesionesEstudio();
}

function eliminarSesionEstudio(id) {

  const sesiones =
    obtenerSesionesEstudio()
      .filter(s => s.id !== id);

  guardarSesionesEstudio(sesiones);

  mostrarSesionesEstudio();
}

function mostrarSesionesEstudio() {

  const lista =
    document.getElementById("estudioLista");

  if (!lista) return;

  const sesiones =
    obtenerSesionesEstudio();

  lista.innerHTML = "";

  if (sesiones.length === 0) {

    lista.innerHTML =
      "<li>No tienes sesiones programadas.</li>";

    return;
  }

  sesiones
    .sort((a, b) =>
      `${a.fecha}${a.hora}`.localeCompare(`${b.fecha}${b.hora}`)
    )
    .forEach(sesion => {

      const li =
        document.createElement("li");

      const texto =
        document.createElement("span");

      texto.innerHTML = `
        <strong>${escapeHTML(sesion.materia)}</strong>
        <br>
        <small>
          ${escapeHTML(sesion.fecha)}
          ·
          ${escapeHTML(sesion.hora)}
          ·
          ${escapeHTML(sesion.tema)}
        </small>
      `;

      const eliminar =
        document.createElement("button");

      eliminar.textContent = "🗑️";

      eliminar.onclick =
        () => eliminarSesionEstudio(sesion.id);

      li.append(texto, eliminar);

      lista.appendChild(li);
    });
}


/* =========================================================
   COMIDA
   ========================================================= */

let categoriaComidaActual = "todos";

function filtrarComida() {

  const texto =
    document.getElementById("buscarComida")
      .value
      .toLowerCase()
      .trim();

  const tarjetas =
    document.querySelectorAll("#comidaGrid .service-card");

  tarjetas.forEach(tarjeta => {

    const nombre =
      tarjeta.dataset.nombre.toLowerCase();

    const categoria =
      tarjeta.dataset.categoria;

    const coincideTexto =
      nombre.includes(texto);

    const coincideCategoria =
      categoriaComidaActual === "todos" ||
      categoria === categoriaComidaActual;

    tarjeta.style.display =
      coincideTexto && coincideCategoria
        ? "block"
        : "none";
  });
}

function filtrarCategoriaComida(categoria) {

  categoriaComidaActual = categoria;

  filtrarComida();
}

function buscarServicio(servicio) {

  const consulta =
    encodeURIComponent(
      `${servicio} cerca de mí`
    );

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${consulta}`,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =========================================================
   CERCA DE MÍ
   ========================================================= */

function buscarCerca(categoria) {

  const consulta =
    encodeURIComponent(
      `${categoria} cerca de mí`
    );

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${consulta}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function abrirMapa() {

  const texto =
    document.getElementById("mapaBusqueda")
      .value
      .trim();

  if (!texto) {

    alert("Escribe algo para buscar.");

    return;
  }

  const consulta =
    encodeURIComponent(texto);

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${consulta}`,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =========================================================
   GOOGLE
   ========================================================= */

function iniciarGoogle() {

  alert(
    "El inicio de sesión con Google requiere configurar Firebase Authentication. " +
    "La función está preparada, pero todavía no está conectada a una cuenta de Google."
  );
}


/* =========================================================
   SEGURIDAD HTML
   ========================================================= */

function escapeHTML(texto) {

  const div =
    document.createElement("div");

  div.textContent = texto;

  return div.innerHTML;
}
