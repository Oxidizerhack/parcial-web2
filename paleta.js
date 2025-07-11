// Array de colores predefinidos
const colores = [
    '#3498DB', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6',
    '#1ABC9C', '#E67E22', '#34495E', '#E91E63', '#FF5722',
    '#795548', '#607D8B', '#FF9800', '#4CAF50', '#2196F3',
    '#9C27B0', '#00BCD4', '#FFEB3B', '#FF4081', '#536DFE',
    '#CA3250', '#6A1B9A', '#00ACC1', '#FFC107', '#8BC34A',
    '#FF6F00', '#5E35B1', '#0097A7', '#FFA000', '#689F38'
];

// Variables generales
let colorActual = '#3498DB';
let historialColores = [];

// Elementos del DOM
const colorName = document.getElementById('color-name');
const changeColorBtn = document.getElementById('change-color-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const colorHistory = document.getElementById('color-history');

// Función para generar un color aleatorio
function generarColorAleatorio() {
    return colores[Math.floor(Math.random() * colores.length)];
}

// Función para cambiar el color de toda la página
function cambiarColor() {
    let nuevoColor;
    do {
        nuevoColor = generarColorAleatorio();
    } while (nuevoColor === colorActual); // Evitar el mismo color
    
    colorActual = nuevoColor;
    
    // Actualizar CSS custom property
    document.documentElement.style.setProperty('--current-color', colorActual);
    
    // Actualizar el nombre del color mostrado
    colorName.textContent = colorActual;
    
    // Agregar al historial
    agregarAlHistorial(colorActual);
    
    // Animación de cambio
    document.body.style.transform = 'scale(1.02)';
    setTimeout(() => {
        document.body.style.transform = 'scale(1)';
    }, 200);
}

// Función para agregar color al historial
function agregarAlHistorial(color) {
    // Evitar duplicados consecutivos
    if (historialColores.length === 0 || historialColores[historialColores.length - 1] !== color) {
        historialColores.push(color);
        
        // Limitar historial a 20 colores
        if (historialColores.length > 20) {
            historialColores.shift();
        }
        
        actualizarHistorialDOM();
    }
}

// Función para actualizar el historial en el DOM
function actualizarHistorialDOM() {
    colorHistory.innerHTML = '';
    
    historialColores.forEach((color, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-text">${color}</div>
        `;
        
        // Agregar evento click para seleccionar color del historial
        historyItem.addEventListener('click', () => {
            seleccionarColorHistorial(color);
        });
        
        colorHistory.appendChild(historyItem);
    });
}


// Función para borrar el historial
function borrarHistorial() {
    historialColores = [];
    colorHistory.innerHTML = '';
    
    // Animación de borrado
    colorHistory.style.opacity = '0.5';
    setTimeout(() => {
        colorHistory.style.opacity = '1';
    }, 300);
}

// Event listeners
changeColorBtn.addEventListener('click', cambiarColor);
clearHistoryBtn.addEventListener('click', borrarHistorial);

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Establecer color inicial
    document.documentElement.style.setProperty('--current-color', colorActual);
    colorName.textContent = colorActual;
    
    // Agregar el color inicial al historial
    agregarAlHistorial(colorActual);
    
    console.log('🎨 Aplicación de cambio de colores iniciada correctamente');
    console.log('📋 Colores disponibles:', colores.length);
});

