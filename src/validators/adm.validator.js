import { param, body, validationResult } from 'express-validator';

export const validarAsociacionObraSocial = [
    param('idPaciente')
        .isInt({ min: 1 })
        .withMessage('El ID del paciente debe ser un número entero válido mayor a 0.'),
    body('obra_social_id')
        .isInt({ min: 1 })
        .withMessage('El ID de la obra social debe ser un número entero válido mayor a 0.'),
    
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                exito: false,
                mensaje: "Error de validación en los datos de entrada.",
                datos: errores.array()
            });
        }
        next();
    }
];