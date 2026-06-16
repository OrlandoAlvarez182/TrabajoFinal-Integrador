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

    insertarMedico = async (datosUsuario, datosMedico) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlUsuario = `INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol) 
                            VALUES (?, ?, ?, ?, SHA2(?, 256), ?, 1);`;
            const [resultUsuario] = await conexion.execute(sqlUsuario, [
                datosUsuario.documento, datosUsuario.apellido, datosUsuario.nombres, datosUsuario.email, datosUsuario.contrasenia, datosUsuario.foto_path
            ]);

            const nuevoIdUsuario = resultUsuario.insertId;

            const sqlMedico = `INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) 
                           VALUES (?, ?, ?, ?, ?);`;
            await conexion.execute(sqlMedico, [
                nuevoIdUsuario, datosMedico.id_especialidad, datosMedico.matricula, datosMedico.descripcion, datosMedico.valor_consulta
            ]);

            await conexion.commit();
            return {
                exito: true,
                id_usuario: nuevoIdUsuario
            };

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }

    insertarPaciente = async (datosUsuario, datosPaciente) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const sqlUsuario = `INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo) 
                                VALUES (?, ?, ?, ?, SHA2(?, 256), ?, 2, 1);`;

            const [resultadoUsuario] = await conexion.execute(sqlUsuario, [
                datosUsuario.documento,
                datosUsuario.apellido,
                datosUsuario.nombres,
                datosUsuario.email,
                datosUsuario.contrasenia,
                datosUsuario.foto_path
            ]);

            const nuevoIdUsuario = resultadoUsuario.insertId;

            const sqlPaciente = `INSERT INTO pacientes (id_usuario, id_obra_social, activo) 
                                 VALUES (?, ?, 1);`;

            await conexion.execute(sqlPaciente, [
                nuevoIdUsuario,
                datosPaciente.id_obra_social
            ]);

            await conexion.commit();

            return {
                id_usuario: nuevoIdUsuario,
                ...datosUsuario,
                ...datosPaciente
            };

        } catch (error) {
            await conexion.rollback();
            console.error(`Error en la transacción de insertarPaciente: ${error.message}`);
            throw new Error(`No se pudo registrar el paciente: ${error.message}`);
        } finally {
            conexion.release();
        }
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