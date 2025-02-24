// Cargar el código cuando el DOM esté completamente listo
document.addEventListener("DOMContentLoaded", () => {
    // Obtener referencias a los elementos del DOM
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const showAll = document.getElementById("showAll");
    const showCompleted = document.getElementById("showCompleted");
    const showPending = document.getElementById("showPending");
  
    // Cargar tareas desde localStorage o inicializar un arreglo vacío
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Función para renderizar las tareas en la lista
    function renderTasks(filter = "all") {
      taskList.innerHTML = ""; // Limpiar la lista antes de renderizar
      tasks.forEach((task, index) => {
        // Filtrar tareas según el estado (completadas/pendientes)
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;
  
        // Crear un elemento <li> para cada tarea
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : ""; // Aplicar clase si está completada
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="edit" onclick="editTask(${index})">Editar</button>
            <button onclick="deleteTask(${index})">Eliminar</button>
          </div>
        `;
        // Agregar evento para marcar como completada/pendiente
        li.addEventListener("click", () => toggleTaskCompletion(index));
        taskList.appendChild(li); // Agregar la tarea a la lista
      });
    }
  
    // Función para agregar una nueva tarea
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Evitar que el formulario se envíe
      const text = taskInput.value.trim(); // Obtener el texto del input
      if (text) {
        tasks.push({ text, completed: false }); // Agregar la tarea al arreglo
        taskInput.value = ""; // Limpiar el input
        saveTasks(); // Guardar tareas en localStorage
        renderTasks(); // Volver a renderizar la lista
      }
    });
  
    // Función para marcar una tarea como completada o pendiente
    function toggleTaskCompletion(index) {
      tasks[index].completed = !tasks[index].completed; // Cambiar el estado
      saveTasks(); // Guardar cambios en localStorage
      renderTasks(); // Volver a renderizar la lista
    }
  
    // Función para eliminar una tarea
    window.deleteTask = (index) => {
      tasks.splice(index, 1); // Eliminar la tarea del arreglo
      saveTasks(); // Guardar cambios en localStorage
      renderTasks(); // Volver a renderizar la lista
    };
  
    // Función para editar una tarea
    window.editTask = (index) => {
      const newText = prompt("Editar tarea:", tasks[index].text); // Pedir nuevo texto
      if (newText !== null) {
        tasks[index].text = newText.trim(); // Actualizar el texto de la tarea
        saveTasks(); // Guardar cambios en localStorage
        renderTasks(); // Volver a renderizar la lista
      }
    };
  
    // Función para filtrar tareas (todas, completadas o pendientes)
    showAll.addEventListener("click", () => renderTasks("all"));
    showCompleted.addEventListener("click", () => renderTasks("completed"));
    showPending.addEventListener("click", () => renderTasks("pending"));
  
    // Función para guardar las tareas en localStorage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Convertir a JSON y guardar
    }
  
    // Renderizar las tareas al cargar la página
    renderTasks();
  });