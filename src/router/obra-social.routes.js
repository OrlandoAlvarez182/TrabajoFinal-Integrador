import {
    Router
} from 'express';
import ObraSocialController from '../controllers/obra-social.controller.js';
import {
    validarObraSocial
} from '../middleware/obrasocial.validator.js';

const obraSocialRouter = Router();

const OScontroller = new ObraSocialController();

obraSocialRouter.get('/', OScontroller.obtenerTodas);
obraSocialRouter.get('/:id', OScontroller.obraSocialPorID);
obraSocialRouter.post('/', validarObraSocial, OScontroller.create);
obraSocialRouter.put('/:id', validarObraSocial, OScontroller.obraSocialActualizar);
obraSocialRouter.delete('/:id', OScontroller.borrarObraSocial);


export default obraSocialRouter;