console.log("=== DEMOSTRACIÓN DE FUNCIONES Y CLOSURES ===\n");

// 1. Simulador de carrito de compras con closures
function crearCarrito() {
  let items = [];
  let total = 0;

  return {
    agregarItem: function(nombre, precio) {
      items.push({ nombre, precio });
      total += precio;
      console.log(`✅ Agregado: ${nombre} ($${precio})`);
    },

    removerItem: function(nombre) {
      const index = items.findIndex(item => item.nombre === nombre);
      if (index !== -1) {
        const precio = items[index].precio;
        items.splice(index, 1);
        total -= precio;
        console.log(`❌ Removido: ${nombre} (-$${precio})`);
      }
    },

    obtenerTotal: () => total,

    obtenerItems: () => [...items], // Copia para evitar modificación externa

    aplicarDescuento: function(porcentaje) {
      const descuento = total * (porcentaje / 100);
      total -= descuento;
      console.log(`🤑 Descuento aplicado: -$${descuento.toFixed(2)} (${porcentaje}%)`);
    }
  };
}

// Uso del carrito
const carrito = crearCarrito();
carrito.agregarItem("Laptop", 1000);
carrito.agregarItem("Mouse", 50);
carrito.agregarItem("Teclado", 80);
console.log(`Total actual: $${carrito.obtenerTotal()}`);
carrito.aplicarDescuento(10);
console.log(`Total final: $${carrito.obtenerTotal()}\n`);

// 2. Función factory con closures
function crearValidador(tipo) {
  const validadores = {
    email: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
    telefono: (valor) => /^\d{10}$/.test(valor),
    url: (valor) => /^https?:\/\/.+\..+/.test(valor)
  };

  return function(valor) {
    const esValido = validadores[tipo](valor);
    console.log(`${tipo}: "${valor}" - ${esValido ? "✅ Válido" : "❌ Inválido"}`);
    return esValido;
  };
}

const validarEmail = crearValidador("email");
const validarTelefono = crearValidador("telefono");
const validarUrl = crearValidador("url");

validarEmail("usuario@ejemplo.com");
validarEmail("invalido-email");
validarTelefono("1234567890");
validarTelefono("123-456");
validarUrl("https://www.google.com");
validarUrl("no-es-url");

console.log("\n=== DEMOSTRACIÓN DE PARÁMETROS AVANZADOS ===\n");

// 3. Función con parámetros avanzados
function crearUsuario(nombre, apellido, ...hobbies) {
  const usuario = {
    nombre: nombre || "Anónimo",
    apellido: apellido || "Desconocido",
    nombreCompleto: `${nombre || "Anónimo"} ${apellido || "Desconocido"}`,
    hobbies: hobbies.length > 0 ? hobbies : ["No especificado"],
    fechaCreacion: new Date().toLocaleDateString()
  };

  return usuario;
}

const usuario1 = crearUsuario("Ana", "García", "leer", "correr", "programar");
const usuario2 = crearUsuario("Carlos"); // Valores por defecto
const usuario3 = crearUsuario(); // Todo por defecto

console.log("Usuario 1:", usuario1);
console.log("Usuario 2:", usuario2);
console.log("Usuario 3:", usuario3);

// 4. Spread operator en acción
const configBase = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

const configProduccion = {
  ...configBase,
  environment: "production",
  debug: false,
  apiUrl: "https://api.production.com" // Sobrescribe
};

const configDesarrollo = {
  ...configBase,
  environment: "development",
  debug: true,
  extraLogging: true
};

console.log("\nConfig Producción:", configProduccion);
console.log("Config Desarrollo:", configDesarrollo);

// 5. Arrow functions vs funciones tradicionales
const ejemplos = {
  tradicional: function() {
    return `this en función tradicional: ${this?.tipo || "global"}`;
  },

  flecha: () => {
    return `this en arrow function: ${this?.tipo || "global"}`;
  },

  tipo: "objeto"
};

console.log("\n=== THIS EN FUNCIONES ===");
console.log(ejemplos.tradicional()); // Se refiere al objeto
console.log(ejemplos.flecha()); // Se refiere al scope global