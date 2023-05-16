// Función para obtener los registros almacenados en el almacenamiento local
function obtenerRegistros() {
    let registros = localStorage.getItem('registros');
    if (registros) {
      return JSON.parse(registros);
    } else {
      return [];
    }
  }
  
  // Función para guardar los registros en el almacenamiento local
  function guardarRegistros(registros) {
    localStorage.setItem('registros', JSON.stringify(registros));
  }
  
  // Referencias a los elementos HTML
  const formulario = document.getElementById('formulario');
  const tabla = document.getElementById('tabla');
  
  // Obtener los registros almacenados
  let registros = obtenerRegistros();
  
  // Función para agregar un nuevo registro
  formulario.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('imagen').files[0];
    
    const nuevoRegistro = {
      nombre: nombre,
      imagen: URL.createObjectURL(imagen)
    };
    
    registros.push(nuevoRegistro);
    guardarRegistros(registros);
    mostrarRegistros();
    
    formulario.reset();
  });
  
  // Función para eliminar un registro
  function eliminarRegistro(index) {
    registros.splice(index, 1);
    guardarRegistros(registros);
    mostrarRegistros();
  }
  
  // Función para mostrar los registros en la tabla
  function mostrarRegistros() {
    // Limpiar la tabla
    tabla.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Imagen</th>
        <th>Acciones</th>
      </tr>
    `;
    
    // Agregar cada registro a la tabla
    registros.forEach(function(registro, index) {
      const row = tabla.insertRow();
      const cellNombre = row.insertCell();
    cellNombre.innerHTML = registro.nombre;
    
    const cellImagen = row.insertCell();
    const imagen = document.createElement('img');
    imagen.src = registro.imagen;
    imagen.width = 100;
    cellImagen.appendChild(imagen);
    
    const cellAcciones = row.insertCell();
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn');
    btnEliminar.addEventListener('click', function() {
      eliminarRegistro(index);
    });
    cellAcciones.appendChild(btnEliminar);
  });
}

// Mostrar los registros al cargar la página
mostrarRegistros();