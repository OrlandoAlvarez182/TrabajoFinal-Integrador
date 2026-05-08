import {Router} from 'express';
import ObraSocialController from '../controllers/obra-social.controller.js'; 
import { validarObraSocial } from '../middleware/obrasocial.validator.js';

 const obraSocialRouter = Router();

 const OScontroller = new ObraSocialController();

 obraSocialRouter.get('/:id', OScontroller.obraSocialPorID);
 obraSocialRouter.post('/', OScontroller.create);
 obraSocialRouter.put('/:id', validarObraSocial, OScontroller.obraSocialActualizar);

 export default obraSocialRouter;
