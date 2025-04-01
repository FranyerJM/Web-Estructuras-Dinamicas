/**
 * Script principal para la calculadora de combinatoria
 * Maneja la interaccion del usuario y muestra los problemas
 */

// Esperamos a que el DOM este completamente cargado antes de ejecutar el codigo
document.addEventListener('DOMContentLoaded', function() {
    // Configuramos la calculadora "Hazlo Tu Mismo"
    configurarCalculadora();
    
    // Mostramos los problemas resueltos
    mostrarProblemas();
});

/**
 * Objeto de utilidades matematicas para calculos combinatorios
 * Implementa las funciones de factorial, permutacion y combinacion
 */
const MatematicasUtil = {
    /**
     * Calcula el factorial de un numero de forma iterativa
     * @param {number} n - El numero para calcular su factorial
     * @returns {number} - El factorial de n
     */
    factorial: function(n) {
        if (n === 0 || n === 1) return 1;
        if (n > 170) throw new Error("Numero demasiado grande para calcular el factorial");
        
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    },
    
    /**
     * Calcula la permutacion P(n,r) = n! / (n-r)!
     * @param {number} n - Numero total de elementos
     * @param {number} r - Numero de elementos a seleccionar
     * @returns {number} - El valor de la permutacion
     */
    permutacion: function(n, r) {
        if (r > n) return 0;
        if (n > 170) throw new Error("Numero demasiado grande para calcular la permutacion");
        
        // Para numeros grandes, calculamos directamente sin computar factoriales completos
        let resultado = 1;
        for (let i = n - r + 1; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    },
    
    /**
     * Calcula la combinacion C(n,r) = n! / (r! * (n-r)!)
     * @param {number} n - Numero total de elementos
     * @param {number} r - Numero de elementos a seleccionar
     * @returns {number} - El valor de la combinacion
     */
    combinacion: function(n, r) {
        if (r > n) return 0;
        if (n > 170) throw new Error("Numero demasiado grande para calcular la combinacion");
        
        // Usamos el valor mas pequeño para mayor eficiencia
        r = Math.min(r, n - r);
        
        let resultado = 1;
        for (let i = 1; i <= r; i++) {
            resultado *= (n - (i - 1));
            resultado /= i;
        }
        return resultado;
    }
};

/**
 * Configura la calculadora interactiva "Hazlo Tu Mismo"
 * Maneja los eventos de usuario y muestra los resultados
 */
function configurarCalculadora() {
    // Obtenemos referencias a los elementos del DOM
    const selectorFormula = document.getElementById('formula');
    const inputValorN = document.getElementById('n-value');
    const contenedorValorR = document.getElementById('r-value-container');
    const inputValorR = document.getElementById('r-value');
    const botonCalcular = document.getElementById('calculate-btn');
    const alertaError = document.getElementById('error-alert');
    const mensajeError = document.getElementById('error-message');
    const contenedorResultado = document.getElementById('result-container');
    const elementoResultado = document.getElementById('result');

    // Mostramos/ocultamos el campo de valor r segun la formula seleccionada
    selectorFormula.addEventListener('change', function() {
        if (selectorFormula.value === 'factorial') {
            contenedorValorR.style.display = 'none';
        } else {
            contenedorValorR.style.display = 'block';
        }
        
        // Reiniciamos resultados y errores
        alertaError.classList.add('d-none');
        contenedorResultado.classList.add('d-none');
    });

    // Estado inicial: si la formula es factorial, ocultamos el campo r
    if (selectorFormula.value === 'factorial') {
        contenedorValorR.style.display = 'none';
    }

    // Manejador de eventos para el boton de calcular
    botonCalcular.addEventListener('click', function() {
        // Reiniciamos resultados y errores previos
        alertaError.classList.add('d-none');
        contenedorResultado.classList.add('d-none');

        // Obtenemos los valores ingresados por el usuario
        const formula = selectorFormula.value;
        const valorN = parseInt(inputValorN.value);
        const valorR = parseInt(inputValorR.value);

        try {
            // Calculamos segun la formula seleccionada
            if (formula === 'factorial') {
                // Validamos el valor de n para factorial
                if (isNaN(valorN) || valorN < 0) {
                    throw new Error("Por favor, introduce un numero entero no negativo para n.");
                }

                // Calculamos el factorial y mostramos el resultado
                const resultadoCalculado = MatematicasUtil.factorial(valorN);
                elementoResultado.textContent = `${valorN}! = ${resultadoCalculado}`;
                contenedorResultado.classList.remove('d-none');
            } 
            else if (formula === 'permutacion') {
                // Validamos los valores de n y r para permutacion
                if (isNaN(valorN) || isNaN(valorR) || valorN < 0 || valorR < 0) {
                    throw new Error("Por favor, introduce numeros enteros no negativos para n y r.");
                }

                if (valorR > valorN) {
                    throw new Error("r no puede ser mayor que n en una permutacion.");
                }

                // Calculamos la permutacion y mostramos el resultado
                const resultadoCalculado = MatematicasUtil.permutacion(valorN, valorR);
                elementoResultado.textContent = `P(${valorN},${valorR}) = ${resultadoCalculado}`;
                contenedorResultado.classList.remove('d-none');
            } 
            else if (formula === 'combinacion') {
                // Validamos los valores de n y r para combinacion
                if (isNaN(valorN) || isNaN(valorR) || valorN < 0 || valorR < 0) {
                    throw new Error("Por favor, introduce numeros enteros no negativos para n y r.");
                }

                if (valorR > valorN) {
                    throw new Error("r no puede ser mayor que n en una combinacion.");
                }

                // Calculamos la combinacion y mostramos el resultado
                const resultadoCalculado = MatematicasUtil.combinacion(valorN, valorR);
                elementoResultado.textContent = `C(${valorN},${valorR}) = ${resultadoCalculado}`;
                contenedorResultado.classList.remove('d-none');
            }
        } catch (e) {
            // Mostramos el mensaje de error si ocurre alguna excepcion
            mensajeError.textContent = e.message;
            alertaError.classList.remove('d-none');
        }
    });
}

/**
 * Muestra los problemas resueltos en la pagina
 * Crea dinamicamente las tarjetas de problemas con sus soluciones
 */
function mostrarProblemas() {
    // Obtenemos el contenedor donde se mostraran los problemas
    const contenedorProblemas = document.getElementById('problems-container');
    
    // Array con todos los problemas y sus soluciones
    const problemas = [
        {
            id: 1,
            pregunta: "¿De cuantas maneras pueden sentarse 10 personas en un banco si hay 4 sitios disponibles?",
            solucion: function() {
                // Este es un problema de permutacion: P(10,4)
                return MatematicasUtil.permutacion(10, 4);
            },
            explicacion: "Este es un problema de permutacion. Tenemos 10 personas y necesitamos seleccionar 4 de ellas para sentarse en el banco, donde el orden importa. Usamos la formula P(10,4) = 10! / (10-4)! = 10! / 6! = 5040."
        },
        {
            id: 2,
            pregunta: "En una clase de 21 alumnos van a distribuirse 3 premios. Averiguar de cuantos modos puede hacerse si: a) los premios son diferentes. b) los premios son iguales.",
            solucion: function() {
                const premiosDiferentes = MatematicasUtil.permutacion(21, 3);
                const premiosIguales = MatematicasUtil.combinacion(21, 3);
                return `a) Premios diferentes: ${premiosDiferentes}\nb) Premios iguales: ${premiosIguales}`;
            },
            explicacion: "a) Cuando los premios son diferentes, es una permutacion: P(21,3) = 21! / (21-3)! = 21! / 18! = 7980.\nb) Cuando los premios son iguales, es una combinacion: C(21,3) = 21! / (3! × (21-3)!) = 21! / (3! × 18!) = 1330."
        },
        {
            id: 3,
            pregunta: "Las diagonales de un poligono se obtienen uniendo pares de vertices no adyacentes. Obtener el numero de diagonales del cuadrado, hexagono y decaedro.",
            solucion: function() {
                // Formula para diagonales en un poligono de n lados: n(n-3)/2
                const diagonalesCuadrado = (4 * (4 - 3)) / 2;
                const diagonalesHexagono = (6 * (6 - 3)) / 2;
                const diagonalesDecagono = (10 * (10 - 3)) / 2;
                return `Cuadrado: ${diagonalesCuadrado} diagonales\nHexagono: ${diagonalesHexagono} diagonales\nDecagono: ${diagonalesDecagono} diagonales`;
            },
            explicacion: "Para un poligono de n lados, el numero de diagonales es n(n-3)/2.\nCuadrado (n=4): 4(4-3)/2 = 2 diagonales\nHexagono (n=6): 6(6-3)/2 = 9 diagonales\nDecagono (n=10): 10(10-3)/2 = 35 diagonales"
        },
        {
            id: 4,
            pregunta: "Hay que colocar a 8 hombres y 7 mujeres en una fila de modo que las mujeres ocupen los lugares pares. ¿De cuantas maneras pueden hacerse?",
            solucion: function() {
                // Posiciones: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
                // Posiciones pares (para mujeres): 2, 4, 6, 8, 10, 12, 14 (7 posiciones)
                // Posiciones impares (para hombres): 1, 3, 5, 7, 9, 11, 13, 15 (8 posiciones)
                const ordenacionesMujeres = MatematicasUtil.factorial(7); // Permutaciones de 7 mujeres en 7 posiciones pares
                const ordenacionesHombres = MatematicasUtil.factorial(8); // Permutaciones de 8 hombres en 8 posiciones impares
                return ordenacionesMujeres * ordenacionesHombres;
            },
            explicacion: "Tenemos 15 posiciones en total. Las mujeres deben ocupar las 7 posiciones pares (2, 4, 6, 8, 10, 12, 14) y los hombres las 8 posiciones impares (1, 3, 5, 7, 9, 11, 13, 15).\n\nPara las mujeres: 7! formas de ordenar a 7 mujeres en 7 posiciones.\nPara los hombres: 8! formas de ordenar a 8 hombres en 8 posiciones.\n\nTotal: 7! × 8! = 5040 × 40320 = 203,212,800 maneras diferentes."
        },
        {
            id: 5,
            pregunta: "¿Cuantos numeros de 4 digitos se pueden formar con las cifras 1,2,...,9? 1. Permitiendo repeticiones 2. Sin repeticiones 3. Si el ultimo digito ha de ser 1 y no se permiten repeticiones",
            solucion: function() {
                // 1. Con repeticiones: 9^4 (9 opciones para cada una de las 4 posiciones)
                const conRepeticiones = Math.pow(9, 4);
                
                // 2. Sin repeticiones: P(9,4)
                const sinRepeticiones = MatematicasUtil.permutacion(9, 4);
                
                // 3. ultimo digito es 1, sin repeticiones: P(8,3)
                // Fijamos el ultimo digito como 1, y necesitamos ordenar 3 digitos mas de los 8 restantes
                const ultimoDigitoUno = MatematicasUtil.permutacion(8, 3);
                
                return `1. Permitiendo repeticiones: ${conRepeticiones}\n2. Sin repeticiones: ${sinRepeticiones}\n3. ultimo digito es 1, sin repeticiones: ${ultimoDigitoUno}`;
            },
            explicacion: "1. Con repeticiones: 9⁴ = 6561 (9 opciones para cada una de las 4 posiciones)\n2. Sin repeticiones: P(9,4) = 9! / (9-4)! = 9! / 5! = 3024\n3. Si el ultimo digito es 1 y sin repeticiones: Fijamos el ultimo digito como 1, y necesitamos ordenar 3 digitos mas de los 8 restantes: P(8,3) = 8! / (8-3)! = 8! / 5! = 336"
        },
        {
            id: 6,
            pregunta: "En un grupo de 15 amigos, ¿Cuantas distribuciones de sus fechas de cumpleaños pueden darse?",
            solucion: function() {
                // Asumiendo 365 dias posibles para cumpleaños, con repeticiones permitidas
                return Math.pow(365, 15);
            },
            explicacion: "Cada persona puede nacer en cualquiera de los 365 dias del año. Como las fechas de cumpleaños pueden repetirse (varias personas pueden cumplir años el mismo dia), tenemos 365 opciones para cada una de las 15 personas.\n\nTotal: 365¹⁵ = 1.899 × 10³⁹ distribuciones posibles."
        },
        {
            id: 7,
            pregunta: "¿Cuantas letras de 5 signos con 3 rayas y 2 puntos podrian tener el alfabeto Morse?",
            solucion: function() {
                // Este es un problema de permutacion con repeticion
                // Necesitamos ordenar 3 rayas y 2 puntos en 5 posiciones
                // Esto es equivalente a C(5,3) o C(5,2)
                return MatematicasUtil.combinacion(5, 3);
            },
            explicacion: "Este problema equivale a elegir las posiciones para las 3 rayas (o alternativamente, para los 2 puntos) entre las 5 posiciones disponibles. Esto es una combinacion: C(5,3) = 5! / (3! × (5-3)!) = 5! / (3! × 2!) = 10 letras posibles."
        },
        {
            id: 8,
            pregunta: "Cuando se arrojan simultaneamente 4 monedas: a) ¿Cuales son los resultados posibles que se pueden obtener? b) ¿Cuantos casos hay en que salgan 2 caras y 2 cruces?",
            solucion: function() {
                // a) Total de resultados posibles: 2^4 = 16
                const totalResultados = Math.pow(2, 4);
                
                // b) Casos con 2 caras y 2 cruces: C(4,2) = 6
                const dosCarasDosCruces = MatematicasUtil.combinacion(4, 2);
                
                return `a) Resultados posibles: ${totalResultados}\nb) Casos con 2 caras y 2 cruces: ${dosCarasDosCruces}`;
            },
            explicacion: "a) Cada moneda puede caer en cara o cruz (2 posibilidades). Con 4 monedas, tenemos 2⁴ = 16 resultados posibles.\n\nb) Para obtener exactamente 2 caras y 2 cruces, necesitamos elegir cuales de las 4 monedas mostraran cara. Esto es una combinacion: C(4,2) = 4! / (2! × (4-2)!) = 4! / (2! × 2!) = 6 casos."
        },
        {
            id: 9,
            pregunta: "5 libros de matematicas, 7 de control de proyecto y 3 de interfaces han de ser colocados en una biblioteca. ¿Cuantas colocaciones distintas admiten si: a) los libros de cada materia han de estar juntos; b) Solo los de matematicas tienen que estar juntos?",
            solucion: function() {
                // a) Los libros de cada materia deben estar juntos
                // Tenemos 3 grupos, y dentro de cada grupo, los libros pueden ordenarse de 5!, 7! y 3! formas
                // Los grupos en si pueden ordenarse de 3! formas
                const todasMateriasJuntas = MatematicasUtil.factorial(5) * MatematicasUtil.factorial(7) * MatematicasUtil.factorial(3) * MatematicasUtil.factorial(3);
                
                // b) Solo los libros de matematicas deben estar juntos
                // Consideramos los libros de matematicas como 1 unidad, que puede ordenarse internamente de 5! formas
                // Ahora tenemos 1 + 7 + 3 = 11 unidades para ordenar en 11! formas
                const soloMatematicasJuntas = MatematicasUtil.factorial(5) * MatematicasUtil.factorial(11);
                
                return `a) Todos los libros de cada materia juntos: ${todasMateriasJuntas}\nb) Solo los libros de matematicas juntos: ${soloMatematicasJuntas}`;
            },
            explicacion: "a) Si los libros de cada materia deben estar juntos, tenemos 3 grupos que pueden ordenarse entre si de 3! formas. Dentro de cada grupo, los libros pueden ordenarse de 5!, 7! y 3! formas respectivamente.\nTotal: 3! × 5! × 7! × 3! = 6 × 120 × 5040 × 6 = 21,772,800 colocaciones.\n\nb) Si solo los libros de matematicas deben estar juntos, los consideramos como una unidad que puede ordenarse internamente de 5! formas. Ahora tenemos 1 + 7 + 3 = 11 unidades para ordenar en 11! formas.\nTotal: 5! × 11! = 120 × 39,916,800 = 4,790,016,000 colocaciones."
        },
        {
            id: 10,
            pregunta: "Consideremos los cuatro libros de matematicas como una unidad. Se tendria entonces una unidad correspondiente a matematicas, 6 unidades diferentes de fisica y dos unidades diferentes de quimica. ¿De cuantas formas se pueden ordenar?",
            solucion: function() {
                // Tenemos 1 + 6 + 2 = 9 unidades para ordenar
                // La unidad de matematicas puede ordenarse internamente de 4! formas
                return MatematicasUtil.factorial(9) * MatematicasUtil.factorial(4);
            },
            explicacion: "Tenemos 1 unidad de matematicas, 6 unidades de fisica y 2 unidades de quimica, para un total de 9 unidades. Estas unidades pueden ordenarse de 9! formas. Ademas, los 4 libros dentro de la unidad de matematicas pueden ordenarse internamente de 4! formas.\n\nTotal: 9! × 4! = 362,880 × 24 = 8,709,120 formas diferentes."
        },
        {
            id: 11,
            pregunta: "Un alumno tiene que elegir 7 de las 10 preguntas de un examen. ¿De cuantas maneras puede elegirlas? ¿Y si las 4 primeras son obligatorias?",
            solucion: function() {
                // a) Elegir cualquier 7 de 10: C(10,7)
                const cualquierSieteDeDiez = MatematicasUtil.combinacion(10, 7);
                
                // b) Las 4 primeras son obligatorias, necesitamos elegir 3 mas de las 6 restantes: C(6,3)
                const tresDeLasSeisSobrantes = MatematicasUtil.combinacion(6, 3);
                
                return `a) Elegir cualquier 7 de 10: ${cualquierSieteDeDiez}\nb) Con las 4 primeras obligatorias: ${tresDeLasSeisSobrantes}`;
            },
            explicacion: "a) Para elegir 7 preguntas de 10, usamos la combinacion: C(10,7) = 10! / (7! × (10-7)!) = 10! / (7! × 3!) = 120\n\nb) Si las 4 primeras son obligatorias, necesitamos elegir 3 preguntas mas de las 6 restantes: C(6,3) = 6! / (3! × (6-3)!) = 6! / (3! × 3!) = 20 maneras."
        },
        {
            id: 12,
            pregunta: "Una linea de ferrocarril tiene 25 estaciones. ¿Cuantos billetes diferentes habra que imprimir si cada billete lleva impresas las estaciones de origen y destino?",
            solucion: function() {
                // Necesitamos elegir 2 estaciones de 25, donde el orden importa (origen y destino)
                // Pero no podemos tener la misma estacion como origen y destino
                // Asi que es P(25,2) = 25 * 24 = 600
                return 25 * 24;
            },
            explicacion: "Necesitamos elegir 2 estaciones de las 25, donde el orden importa (origen y destino) y no podemos tener la misma estacion como origen y destino. Esto es una variacion de la permutacion: P(25,2) = 25 × 24 = 600 billetes diferentes."
        },
        {
            id: 13,
            pregunta: "Tres atletas toman parte en una competicion. ¿De cuantas maneras podran llegar a la meta? (Pueden llegar juntos)",
            solucion: function() {
                // Este es un problema de particiones con repeticiones permitidas
                // Los atletas pueden terminar: 1º, 2º, 3º (todos diferentes)
                // O: 1º, 1º, 2º (dos empatados en 1º)
                // O: 1º, 1º, 1º (todos empatados)
                // Total: 3! + 3 + 1 = 10
                return 10;
            },
            explicacion: "Consideremos las posibles formas en que pueden llegar:\n\n1. Los tres atletas llegan en momentos diferentes (6 formas: 3! = 6)\n2. Dos atletas llegan empatados en primer lugar y uno en segundo lugar (3 formas)\n3. Los tres atletas llegan empatados (1 forma)\n\nTotal: 6 + 3 + 1 = 10 maneras diferentes."
        },
        {
            id: 14,
            pregunta: "En un hospital se utilizan cinco simbolos para clasificar las historias clinicas de sus pacientes, de manera que los dos primeros son letras y los tres ultimos son digitos. Suponiendo que hay 25 letras, ¿cuantas historias clinicas podrian hacerse si: 1. No hay restricciones sobre letras y numeros; 2. Las dos letras no pueden ser iguales.",
            solucion: function() {
                // 1. Sin restricciones: 25 opciones para cada letra, 10 opciones para cada digito
                const sinRestricciones = Math.pow(25, 2) * Math.pow(10, 3);
                
                // 2. Las letras no pueden ser iguales: 25 opciones para la primera letra, 24 para la segunda, 10 para cada digito
                const letrasDiferentes = 25 * 24 * Math.pow(10, 3);
                
                return `1. Sin restricciones: ${sinRestricciones}\n2. Letras diferentes: ${letrasDiferentes}`;
            },
            explicacion: "1. Sin restricciones: 25 opciones para cada letra y 10 opciones para cada digito.\nTotal: 25² × 10³ = 625 × 1000 = 625,000 historias clinicas.\n\n2. Letras diferentes: 25 opciones para la primera letra, 24 para la segunda (ya que no puede repetirse), y 10 opciones para cada digito.\nTotal: 25 × 24 × 10³ = 600 × 1000 = 600,000 historias clinicas."
        }
    ];

    // Creamos el HTML para cada problema
    problemas.forEach((problema, indice) => {
        const tarjetaProblema = document.createElement('div');
        tarjetaProblema.className = 'card problem-card mb-4';
        
        tarjetaProblema.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">Problema ${problema.id}</h3>
                <p class="card-text">${problema.pregunta}</p>
                
                <button class="btn btn-outline-primary toggle-solution" data-index="${indice}">
                    Mostrar solucion
                </button>
                
                <div class="solution-container d-none" id="solution-${indice}">
                    <h4 class="fw-medium mb-2">Solucion:</h4>
                    <p class="solution-text">${problema.solucion()}</p>
                    <h4 class="fw-medium mt-4 mb-2">Explicacion:</h4>
                    <p class="explanation">${problema.explicacion}</p>
                </div>
            </div>
        `;
        
        contenedorProblemas.appendChild(tarjetaProblema);
    });

    // Agregamos event listeners a los botones de mostrar/ocultar solucion
    document.querySelectorAll('.toggle-solution').forEach(boton => {
        boton.addEventListener('click', function() {
            const indice = this.getAttribute('data-index');
            const contenedorSolucion = document.getElementById(`solution-${indice}`);
            
            if (contenedorSolucion.classList.contains('d-none')) {
                contenedorSolucion.classList.remove('d-none');
                this.textContent = 'Ocultar solucion';
            } else {
                contenedorSolucion.classList.add('d-none');
                this.textContent = 'Mostrar solucion';
            }
        });
    });
}