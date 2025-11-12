/*Ejercicio: Crea un sistema de gestión de tareas (todo list) usando closures para mantener el estado privado. Implementa funciones para agregar tareas, marcar como completadas, filtrar por estado, y obtener estadísticas. Usa arrow functions donde sea apropiado y parámetros avanzados.
Los comentarios generados son con motivos de estudio y entendimiento del ciclo*/

const creatToDoList = () => {
  // 🔸 1. Aquí se declara el estado privado.
  // Esta variable solo existirá dentro de esta función.
  // Nadie fuera de esta función podrá acceder directamente a `tareas`.
  let tasks = []; // Estado privado

  // 🔸 2. Este "return" devuelve un objeto con varias funciones internas.
  // Cada una de estas funciones podrá acceder a la variable `tareas`
  // aunque la función principal (crearToDoList) ya haya terminado de ejecutarse.
  // ⚠️ Este es el momento donde nace el *closure*.
  return {
    // ➕ Método para agregar una nueva tarea
    addTask: (description) => {
      const newTask =
        // Creamos una nueva tarea con id único (usando timestamp)
        {
          id: Date.now(),
          description,
          completeTask: false,
        };
      // Agregamos la nueva tarea al arreglo privado `tareas`
      tasks.push(newTask);
      console.log(tasks.push(newTask));
      console.log(`✅ Tarea agregada: "${description}"`);
    },
    // ✅ Método para marcar una tarea como completada
    checkCompleteTask: (id) => {
      // Buscamos la tarea dentro del arreglo privado
      const task = tasks.find((t) => t.id === id);
      console.log(task);

      // Si la encontramos, cambiamos su propiedad `completada` a true
      if (task) {
        task.complete = true;
        console.log(`✔️ Tarea completada: "${task.description}"`);
      } else {
        console.log("❌ No se encontró la tarea.");
      }
    },

    // 🔍 Método para filtrar tareas por estado
    // Usa un parámetro con valor por defecto ("todas")
    filterTask: (state = "todas") => {
      console.log("estado de filtrar tareas", state);
      switch (state) {
        case "completadas":
          // Devuelve solo las tareas con `completada: true`
          return tasks.filter((t) => t.completed);
        // Devuelve solo las tareas que aún no están completadas
        case "pendientes":
          return tasks.filter((t) => !t.completed);
        // Devuelve todas las tareas (completadas y pendientes)
        default:
          return tasks;
      }
    },
    // 📊 Método para obtener estadísticas generales
    getStatistics: () => {
      const total = tasks.length; // total de tareas
      console.log(total);
      const completed = tasks.filter((t) => t.complete).length;
      const unfinished = total - completed;
      // Devuelve un objeto con los datos calculados
      return { total, completed, unfinished };
      // 👆 Aquí termina la función que devuelve los métodos del sistema.
      // El *closure* comienza en el momento en que las funciones internas
      // "recuerdan" la variable `tareas` y la mantienen viva después del return.
    },
  };
};

// 🔹 Creamos una nueva lista de tareas llamando a la función principal.
// En este punto se ejecuta `crearToDoList`, se crea una variable privada `tareas`
// y se devuelve el conjunto de métodos que pueden manipularla.
const toDo = creatToDoList();
// ➕ Agregamos algunas tareas nuevas
toDo.addTask("Aprender closures");
toDo.addTask("Estudiar funciones flecha");
toDo.addTask("Practicar destructuración");

// 🔍 Obtenemos todas las tareas mediante el método `filterTask`
const tasks = toDo.filterTask(); // todas
console.log("📋 Todas las tareas:", tasks);

// ✅ Marcamos como completada la primera tarea
toDo.checkCompleteTask(tasks[0].id); // marca la primera como completada

console.log("🔍 Pendientes:", toDo.filterTask("pendientes"));
console.log("📊 Estadísticas:", toDo.getStatistics());
// 🚫 Si intentamos acceder a la variable `tareas` directamente, no existe:
console.log(toDo.tasks); // undefined — porque el estado es privado
