import {
    Router
} from 'express';
import ObraSocialController from '../controllers/obra-social.controller.js';
import {
    validarObraSocial
} from '../middleware/obrasocial.validator.js';
import {
    verificarToken,
    permitirRoles
} from '../middleware/auth.validarSession.js';
import TransformarDTO from '../middleware/transformarDTO.js';

const obraSocialRouter = Router();
const transformarDTO = new TransformarDTO();

const OScontroller = new ObraSocialController();

obraSocialRouter.get('/',
    verificarToken,
    permitirRoles(3),
    OScontroller.obtenerTodas
);

obraSocialRouter.get('/:id',
    verificarToken,
    permitirRoles(3),
    OScontroller.obraSocialPorID
);

obraSocialRouter.post(
    '/',
    verificarToken,
    permitirRoles(3),
    transformarDTO.obrasSocialesCrearDTO,
    validarObraSocial,
    OScontroller.create
);

obraSocialRouter.put(
    '/:id',
    verificarToken,
    permitirRoles(3),
    transformarDTO.obrasSocialesActualizarDTO,
    validarObraSocial,
    OScontroller.obraSocialActualizar
);

obraSocialRouter.delete(
    '/:id',
    verificarToken,
    permitirRoles(3),
    OScontroller.borrarObraSocial
);

export default obraSocialRouter;