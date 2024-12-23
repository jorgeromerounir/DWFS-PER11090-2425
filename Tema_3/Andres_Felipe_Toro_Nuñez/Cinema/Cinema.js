// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

/**
 * Busca los asientos consecutivos libres por cada fila empezando desde la fila mas lejana a la pantalla.
 * Si no encuentra suficientes asientos, retorna un array vacío
 */
function findSeatsInRow(row, numSeats) {
    let consecutives = [];
    let bestSeats = [];
    let j = 0;

    while (j < N && bestSeats.length < numSeats) {
        if (!row[j].estado) {
            consecutives.push(row[j].id);
            row[j].estado = true;
            if (consecutives.length === numSeats) {
                bestSeats = [...consecutives];
            }
        } else {
            consecutives = [];
        }
        j++;
    }
    return bestSeats;
}


// Función que reserva las sillas requeridas en una fila
function suggest (numSeats) {
    let butacas = setup();
    if (numSeats > N || numSeats <= 0) {
        return new Set();
    }
    let result = [];
    let i = N - 1;
    let seatsComplete = false;

    while (i >= 0 && i< N && !seatsComplete) {
        const foundSeats = findSeatsInRow(butacas[i], numSeats);
        if (foundSeats.length === numSeats) {
            result = foundSeats;
            seatsComplete = true;
        }
        i--;
    }

    return new Set(result);
}


function seatsSet(valueSeats) {
    let seats = suggest( parseInt(valueSeats) );
    document.getElementById("seats-selected").innerHTML = "Los asientos reservados fueron: " + Array.from(seats).join(", ");
}


