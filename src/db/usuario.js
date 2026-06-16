import {
    pool
} from "./conexion.js";

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

    obtenerPorId = async (id) => {
        const sql = `SELECT id_usuario, documento, apellido, nombres, email, contrasenia, foto_path, rol, activo 
                     FROM usuarios 
                     WHERE id_usuario = ?;`;

        const [result] = await pool.execute(sql, [id]);
        return result[0] || null;
    }

    insertar = async (datos) => {
        const sql = `INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo) 
                     VALUES (?, ?, ?, ?, SHA2(?, 256), ?, ?, 1);`;

        const [result] = await pool.execute(sql, [
            datos.documento,
            datos.apellido,
            datos.nombres,
            datos.email,
            datos.contrasenia,
            datos.foto_path,
            datos.rol
        ]);

        return {
            id_usuario: result.insertId,
            ...datos
        };
    }

    listar = async () => {
        const sql = `SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo 
                     FROM usuarios 
                     WHERE activo = 1;`;

        const [result] = await pool.execute(sql);
        return result;
    }

    actualizar = async (id, datos) => {
        const sql = `UPDATE usuarios SET 
                        documento = ?, 
                        apellido = ?, 
                        nombres = ?, 
                        email = ?, 
                        contrasenia = CASE WHEN LENGTH(?) = 64 THEN ? ELSE SHA2(?, 256) END,
                        foto_path = ?, 
                        rol = ?, 
                        activo = ? 
                     WHERE id_usuario = ?;`;

        await pool.execute(sql, [
            datos.documento,
            datos.apellido,
            datos.nombres,
            datos.email,
            datos.contrasenia,
            datos.contrasenia,
            datos.contrasenia,
            datos.foto_path,
            datos.rol,
            datos.activo,
            id
        ]);

        return {
            id_usuario: id,
            ...datos
        };
    }

    eliminar = async (id) => {
        const sql = `UPDATE usuarios SET activo = 0 WHERE id_usuario = ?;`;
        const [result] = await pool.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}