const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middleware/validator');

const router = express.Router();

// Ruta para el login de propietarios
router.post('/login', [
  body('email').isEmail().withMessage('Debe ser un correo válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validate  // Middleware para manejar errores de validación
], authController.login);

// Ruta para el registro de nuevos propietarios
router.post('/register', [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un correo válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validate  // Middleware para manejar errores de validación
], authController.register);

module.exports = router;
