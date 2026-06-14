import { pool } from "./conexion.js";

export default class Usuario {
    buscar = async (email, contrasenia) => {
        const sql = `SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido) as usuario, u.rol
                     FROM usuarios AS u
                     WHERE u.email = ? 
                         AND u.contrasenia = SHA2(?, 256) 
                         AND u.activo = 1;`;

        const [result] = await pool.execute(sql, [email, contrasenia]);
        return result[0];
    }
}