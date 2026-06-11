import {
    body,
    validationResult
} from 'express-validator';

export const validarLogin = [
    body('email')
    .isEmail().withMessage('Debe ingresar un email válido')
    .notEmpty().withMessage('El email es requerido'),
    body('contrasenia')
    .notEmpty().withMessage('La contraseña es requerida'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                exito: false,
                errores: errores.array()
            });
        }
        next();
    }
];