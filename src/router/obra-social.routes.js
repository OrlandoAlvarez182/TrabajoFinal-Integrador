import {Router} from 'express';
import ObraSocialController from '../controllers/obra-social.controller.js'; 

 const obraSocialRouter = Router();

 const OScontroller = new ObraSocialController();

 obraSocialRouter.get('/:id', OScontroller.obraSocialPorID);
 obraSocialRouter.post('/', OScontroller.create);

 export default obraSocialRouter;
