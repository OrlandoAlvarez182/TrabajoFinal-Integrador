import Especialidades from"../db/especialidades.js"

export default class EspecialidadesService {
    constructor(){
        this.especialidades = new Especialidades();
    }
    
    buscarTodas = () => {
        return this.especialidades.buscarTodas();
    }

    buscarPorId = (id_especialidad) => {
        return this.especialidades.buscarPorId(id_especialidad);
    }


    modificar = async (id_especialidad, especialidad) => {
        const modificado = await this.especialidades.modificar(id_especialidad, especialidad);
        return this.buscarPorId(modificado);
    }


    crear = async (especialidad) => {
        const nuevo_id = await this.especialidades.crear(especialidad);
        return this.buscarPorId(nuevo_id);
    }


    eliminar = async (id_especialidad) => {
        const existe = await this.especialidades.buscarPorId(id_especialidad);
        if(existe.length === 0) {
            return null;
        }
        return this.especialidades.eliminar(id_especialidad);
    }
}