import { pool } from "./conexion.js";

export default class Especialidades {

    buscarEspecialidades = async () => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1';
        const [especialidades] = await pool.query(sql);
        return especialidades;
    }

    buscarIdEspecialidades = async (id_especialidad) => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
        const [especialidades] = await pool.execute(sql, [id_especialidad]);
        return especialidades;
    }

    crear = async (especialidad) => {

        const {
            nombre
        } = especialidad;
        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [nombre]);

        if (result.affectedRows === 0) {
            return null;
        }

        return result.insertId;
    }

    // 👈 Movimos "modificar" para que quede ADENTRO de la clase
    modificar = async (id_especialidad, especialidad) => {
        const {
            nombre
        } = especialidad;
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
