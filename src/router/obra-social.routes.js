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

obraSocialRouter.get('/', OScontroller.obtenerTodas);
obraSocialRouter.get('/:id', OScontroller.obraSocialPorID);

obraSocialRouter.post(
    '/',
    verificarToken,
    permitirRoles(3),
    validarObraSocial,
    transformarDTO.obrasSocialesCrearDTO,
    OScontroller.create
);

obraSocialRouter.put('/:id', validarObraSocial, OScontroller.obraSocialActualizar);
obraSocialRouter.delete('/:id', OScontroller.borrarObraSocial);


export default obraSocialRouter;