/**
 * Clase de utilidades matemáticas para cálculos combinatorios
 * Contiene funciones para calcular factorial, permutación y combinación
 */
class MatematicasUtil {
    /**
     * Calcula el factorial de un número
     * @param {number} n - El número para calcular su factorial
     * @returns {number} - El factorial de n
     */
    static factorial(n) {
        // Casos base: 0! = 1! = 1
        if (n === 0 || n === 1) return 1;
        
        // Verificamos si el número es demasiado grande para evitar desbordamiento
        if (n > 170) throw new Error("Número demasiado grande para calcular el factorial");
        
        // Calculamos el factorial multiplicando todos los números desde 2 hasta n
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }

    /**
     * Calcula la permutación P(n,r) = n! / (n-r)!
     * @param {number} n - Número total de elementos
     * @param {number} r - Número de elementos a seleccionar
     * @returns {number} - El valor de la permutación
     */
    static permutacion(n, r) {
        // Si r es mayor que n, no hay permutaciones posibles
        if (r > n) return 0;
        
        // Verificamos si el número es demasiado grande
        if (n > 170) throw new Error("Número demasiado grande para calcular la permutación");
        
        // Para números grandes, calculamos directamente sin computar factoriales completos
        // Esto es más eficiente que calcular n! y (n-r)! por separado
        let resultado = 1;
        for (let i = n - r + 1; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }

    /**
     * Calcula la combinación C(n,r) = n! / (r! * (n-r)!)
     * @param {number} n - Número total de elementos
     * @param {number} r - Número de elementos a seleccionar
     * @returns {number} - El valor de la combinación
     */
    static combinacion(n, r) {
        // Si r es mayor que n, no hay combinaciones posibles
        if (r > n) return 0;
        
        // Verificamos si el número es demasiado grande
        if (n > 170) throw new Error("Número demasiado grande para calcular la combinación");
        
        // Usamos el valor más pequeño para mayor eficiencia
        r = Math.min(r, n - r);
        
        // Calculamos la combinación de forma eficiente
        let resultado = 1;
        for (let i = 1; i <= r; i++) {
            resultado *= (n - (i - 1));
            resultado /= i;
        }
        return resultado;
    }
}