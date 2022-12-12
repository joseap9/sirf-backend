const { Router } = require('express');
const { getProfesor, getAsignaturas, pasarAsistencia, asistenciaPorFecha, agregarAlumno } = require('../controllers/eventosProfesor');
const router = Router();

//obtener datos de profesor necesita un rut y una contraseña para buscar el profesor
router.post('/profesor', getProfesor );

//obtener asignaruras de profesor necesita el rut del profesor para buscar las asignaturas
router.post('/asignaturas', getAsignaturas)

//pasar asistencia ( envia la lista de asistentes a la base de datos )
router.post('/asistencia', pasarAsistencia);

//mostrar asistentes por fecha necesita la fecha y el nombre de la asignatura que se desea buscar
router.post('/datos', asistenciaPorFecha);

//agrega un alumno
router.post('/agregar', agregarAlumno);


module.exports = router;
