const { Router } = require('express');
const { getProfesor, getAsignaturas, pasarAsistencia } = require('../controllers/eventosProfesor');
const router = Router();

//obtener datos de profesor
router.get('/', getProfesor );

//obtener asignaruras de profesor
router.post('/asignaturas', getAsignaturas);

//pasar asistencia ( envia la lista de asistentes a la base de datos )
router.post('/asistencia', pasarAsistencia);





module.exports = router;
