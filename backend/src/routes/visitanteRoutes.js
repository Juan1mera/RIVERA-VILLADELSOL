const express = require('express');
const { body } = require('express-validator');
const visitanteController = require('../controllers/visitanteController');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validator');

const router = express.Router();

router.use(auth);

router.get('/', visitanteController.getAll);
router.get('/:id', visitanteController.getById);
router.post('/', [
  body('apartamento_id').isInt(),
  body('nombre').notEmpty(),
  body('documento').notEmpty(),
  body('fecha_entrada').isISO8601(),
  body('motivo_visita').notEmpty(),
  validate
], visitanteController.create);
router.put('/:id', [
  body('fecha_salida').optional().isISO8601(),
  body('estado').optional().isIn(['activo', 'finalizado']),
  validate
], visitanteController.update);
router.delete('/:id', visitanteController.delete);

module.exports = router;