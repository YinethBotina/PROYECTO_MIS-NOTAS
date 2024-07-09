document.addEventListener('DOMContentLoaded', () => {
    // Area de texto donde el usuario escribe las notas
    const noteInput = document.getElementById('Notas_Entrada');
    // Botón de crear nota
    const createNoteButton = document.getElementById('Boton');
    // Lista de notas
    const notesList = document.getElementById('Lista_Notas');

    // Carga las notas guardadas desde localStorage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Función para mostrar las notas en la lista
    function Mostar_Notas () {
        // Limpia la lista de notas
        notesList.innerHTML = '';
        // Itera sobre cada nota y la agrega a la lista
        notes.forEach((note, index) => {
            // Crea un elemento de lista para cada nota
            const li = document.createElement('li');
            li.textContent = note;
            // Crea un botón de borrar para cada nota
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Borrar';
            // Agrega un evento al botón de borrar
            deleteButton.addEventListener('click', () => {
                // Elimina la nota de la lista
                notes.splice(index, 1);
                // Actualiza localStorage con las notas restantes
                updateLocalStorage();
                // Vuelve a mostar las notas
                Mostar_Notas();
            });
            // Añade el botón de borrar al elemento de la lista
            li.appendChild(deleteButton);
            // Añade el elemento de la lista a la lista de notas
            notesList.appendChild(li);
        });
    };

    // Función para actualizar localStorage con las notas actuales
    function updateLocalStorage () {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Agrega un event listener al botón de crear nota
    createNoteButton.addEventListener('click', () => {
        // Obtiene el texto de la nueva nota
        const noteText = noteInput.value.trim();
        // Verifica que el texto no esté vacío
        if (noteText ) {
            // Agrega la nueva nota a la lista
            notes.push(noteText);
            // Limpia el área de texto
            noteInput.value = '';
            // Actualiza localStorage con la nueva nota
            updateLocalStorage();
            // Vuelve a mostrar las notas
            Mostar_Notas();
        }
    });

    // Muestra las notas al cargar la página
    Mostar_Notas();
    
});
