import {
    param,
    validationResult
} from 'express-validator';

export const validarParamEspecialidad = [
    param('nombreEspecialidad')
    .trim()
    .notEmpty().withMessage('El nombre de la especialidad es obligatorio en la URL')
    .isAlpha('es-ES', {
        ignore: ' '
    }).withMessage('La especialidad solo puede contener letras y espacios')
    .isLength({
        min: 3,
        max: 30
    }).withMessage('La especialidad debe tener entre 3 y 30 caracteres'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                exito: false,
                mensaje: "La especialidad enviada en la URL no es válida",
                errores: errores.array().map(err => ({
                    campo: err.path,
                    mensaje: err.msg
                }))
            });
        }
        next();
    }
];