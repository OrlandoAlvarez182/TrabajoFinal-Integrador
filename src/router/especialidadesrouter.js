import { check, ExpressValidator, param } from "express-validator";
import { check, param } from "express-validator";
import {validarcampos} from '../middleware/validarcampos.js';
import EspecialidadesControlador from "../controllers/especialidadescontrolador.js";

const router = ExpressValidator.router();

const especialidadescontrolador = new EspecialidadesControlador();

router.get('/:id', especialidadescontrolador.buscarTodas);

router.get('/:id_especialidad',
[
    param('id_especialidad', 'El parámetro debe ser entero').isInt(),
    validarcampos
],
especialidadescontrolador.buscarPorId)

router.post('/',
    [
        check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({max:120}).withMessage('El nombre debe ser mayor a 120 caracteres.'),
        validarcampos
    ],
especialidadescontrolador.crear);

router.put('/:id_especialidad',
    [
        check('nombre')
        .notEmpty().withMessage('El nombre es obligatoio.')
        .isLength({max:120}).withMessage('El nombre no debe ser mayor a 120 carateres.'),
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),
        validarcampos
    ],
especialidadescontrolador.modificar);

router.delete('/:id_especialidad',
    [
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),
        validarcampos
    ],
especialidadescontrolador.eliminar);

export ( Router );