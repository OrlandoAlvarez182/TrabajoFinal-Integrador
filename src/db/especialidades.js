import {
    pool
} from "./conexion.js";

export default class Especialidades {

    buscarEspecialidades = async () => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1';
        const [especialidades] = await pool.query(sql);
        return especialidades;
    }

    buscarPorNombre = async (especialidad) => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1 AND nombre = ?';
        const [especialidades] = await pool.execute(sql, [especialidad]);
        return especialidades;
    }

    buscarIdEspecialidades = async (id_especialidad) => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
        const [especialidades] = await pool.execute(sql, [id_especialidad]);
        return especialidades;
    }

    buscarLosMedicosPorEspecialidad = async (nombreEspecialidad) => {
        const sql = `
            SELECT
            m.id_medico,
                m.matricula,
                m.descripcion,
                m.valor_consulta,
                u.apellido,
                u.nombres,
                u.email,
                u.foto_path
            FROM medicos AS m
            INNER JOIN usuarios AS u
            ON m.id_usuario = u.id_usuario
            INNER JOIN especialidades AS e
            ON m.id_especialidad = e.id_especialidad
            WHERE e.nombre = ? 
            AND m.activo = 1
            AND u.activo = 1
            AND e.activo = 1;
        `;
        const [medicos] = await pool.execute(sql, [nombreEspecialidad]);
        return medicos;
    }

    crear = async (especialidad) => {

        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [especialidad]);

        if (result.affectedRows === 0) {
            return null;
        }

        return result.insertId;
    }

    // 👈 Movimos "modificar" para que quede ADENTRO de la clase
    modificar = async (id_especialidad, nombre) => {

        const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';
        const [result] = await pool.execute(sql, [nombre, id_especialidad]);

        if (result.affectedRows === 0) {
            return null;
        }

        return id_especialidad;
    }

    // 👈 Movimos "eliminar" para que quede ADENTRO de la clase
    eliminar = async (id_especialidad) => {
        const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';
        const [result] = await pool.execute(sql, [id_especialidad]);
        if (result.affectedRows === 0) {
            return null;
        }
        return true;
    }


}