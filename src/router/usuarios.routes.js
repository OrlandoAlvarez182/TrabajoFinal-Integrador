import {
    Router
} from "express";
import {
    upload
} from "../config/multer.js";
import TransformarDTO from "../middleware/transformarDTO.js";
import UsuariosController from "../controllers/usuarios.controller.js";
import {
    permitirRoles,
    verificarToken
} from "../middleware/auth.validarSession.js";

const usuariosRouter = Router();
const transformarDTO = new TransformarDTO();
const usuariosControlador = new UsuariosController();

usuariosRouter.post(
    "/medico",
    verificarToken,
    permitirRoles(3), 
    transformarDTO.usuariosCrearMedicoDTO, 
    usuariosControlador.registrarMedico
);

usuariosRouter.put('/:id_usuario',
    verificarToken,
    permitirRoles(1, 2, 3),
    upload.single('foto'),
    transformarDTO.usuariosActualizarDTO,
    usuariosControlador.usuarioActualizar
);

export default usuariosRouter;