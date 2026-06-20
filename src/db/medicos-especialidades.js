import {
    pool
} from "./conexion.js";

export default class MedicosEspecialidades {
    relacionarConEspecialidades = async (id_medico, especialidades) => {

        const idEspecialidad = especialidades[0].id_especialidad;
        const sql = `
            UPDATE medicos 
            SET id_especialidad = ? 
            WHERE id_medico = ? AND activo = 1;
        `;

        await pool.execute(sql, [idEspecialidad, id_medico]);
        return true;
    }
}