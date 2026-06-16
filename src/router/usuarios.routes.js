import {
    Router
} from "express";
import {
    upload
} from "../config/multer.js";
import TransformarDTO from "../middleware/transformarDTO.js";
import UsuariosController from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();
const transformarDTO = new TransformarDTO();
const usuariosControlador = new UsuariosController();

usuariosRouter.put('/:id_usuario',
    upload.single('foto'),
    transformarDTO.usuariosActualizarDTO,
    usuariosControlador.usuarioActualizar
);

export default usuariosRouter;