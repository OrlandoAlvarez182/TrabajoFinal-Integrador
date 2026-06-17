Trabajo Final Integrador - UNER

Rutas:

URL = localhosta:3000/api/v1

Médico (ROL = 1) 
    ● Iniciar sesión.                                       -> URL/auth/login
    ● Listar turnos propios.                                -> URL/medicos/turnos/propios
    ● Marcar un turno como atendido.                        -> URL/turnos/:id/atendido

Paciente (ROL = 2) 
    ● Iniciar sesión.                                       -> URL/auth/login
    ● Crear reservas (turnos propios). 
    ● Listar turnos propios.                                -> URL/pacientes/turnosPropiosDePaciente
    ● Listar especialidades.                                -> URL/especialidades/
    ● Listar todos los médicos y de una especialidad.       -> URL/especialidades/:porEspecialidad

Administrador (ROL = 3) 
    ● Iniciar sesión.                                       -> URL/auth/login
    ● Listar, crear y editar especialidades.                -> En Rutas Especialidades(POST, PUT, DELETE)
    ● Asociar médicos con especialidades.                   -> URL/medicos/:id_medico/especialidades
    ● Listar, crear y editar obras sociales.                -> En Rutas Obra Sociales(POST, PUT, DELETE)
    ● Asociar médicos con obras sociales.                   -> URL/medicos/:id_medico/obras-sociales
    ● Asociar pacientes con obras sociales.                 -> URL/adm/pacientes/:idPaciente/obra-social
    ● Registrar un turno para un paciente, médico y fecha.  -> URL/adm/registrarTurno
    ● Obtener estadísticas de atenciones.                   -> URL/pacientes/informe/turnos-paciente
