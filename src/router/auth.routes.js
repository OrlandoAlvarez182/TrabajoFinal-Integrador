import {
    Router
} from 'express';
import {
    AuthController
} from '../controllers/auth.controller.js';
import {
    validarLogin
} from '../middleware/auth.validator.js';


const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', validarLogin, authController.login);

export default authRouter;