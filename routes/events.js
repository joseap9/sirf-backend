const { Router } = require('express');
const { getProfesor } = require('../controllers/events');
const router = Router();

router.get('/', getProfesor );

module.exports = router;
