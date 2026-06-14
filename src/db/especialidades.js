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
<<<<<<< HEAD
        const { nombre } = especialidad;
=======

        const {
            nombre
        } = especialidad;
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [nombre]);

        if (result.affectedRows === 0) {
            return null;
        }

        return result.insertId;
    }
<<<<<<< HEAD
=======

>>>>>>> 174632510fdae290e91003275af0697469d6bfdd

    // 👈 Movimos "modificar" para que quede ADENTRO de la clase
    modificar = async (id_especialidad, especialidad) => {
<<<<<<< HEAD
        const { nombre } = especialidad;
=======
        const {
            nombre
        } = especialidad;
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
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
<<<<<<< HEAD
        if (result.affectedRows === 0){
=======
        if (result.affectedRows === 0) {
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
            return null;
        }
        return true;
    }
<<<<<<< HEAD
} // 👈 La llave de cierre de la clase AHORA VA ACÁ, al final de todo.
=======


}
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
