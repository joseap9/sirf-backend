const { Router } = require('express');
const { getProfesor, getAsignaturas, pasarAsistencia, asistenciaPorFecha, agregarAlumno } = require('../controllers/eventosProfesor');
const router = Router();

//obtener datos de profesor
router.get('/profesores', getProfesor );

//obtener asignaruras de profesor
router.post('/asignaturas', getAsignaturas)

//pasar asistencia ( envia la lista de asistentes a la base de datos )
router.post('/asistencia', pasarAsistencia);

//mostrar asistentes por fecha 
router.post('/datos', asistenciaPorFecha);

//agrega un alumno
router.post('/agregar', agregarAlumno);


module.exports = router;
