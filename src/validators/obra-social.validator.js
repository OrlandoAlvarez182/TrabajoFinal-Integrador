// AGREGÁ "default" AQUÍ
export default class ObraSocialValidator {
    
    static validarDatosCreacion(datos) {
        const errores = [];
        const { nombre, porcentaje_descuento } = datos;

        const nombreRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;

        if (!nombre || nombre.trim().length < 3) {
            errores.push("El nombre es obligatorio (mínimo 3 caracteres).");
        } else if (!nombreRegex.test(nombre)) {
            errores.push("El nombre no debe contener números ni símbolos.");
        }

        if (porcentaje_descuento !== undefined) {
            const desc = parseFloat(porcentaje_descuento);
            if (isNaN(desc) || desc < 0 || desc > 100) {
                errores.push("El descuento debe ser entre 0 y 100.");
            }
        }

        return {
            esValido: errores.length === 0,
            errores: errores
        };
    }
}