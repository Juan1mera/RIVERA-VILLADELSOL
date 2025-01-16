const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config/config');
const Propietario = require('../../models/propietario');
const ResponseFormatter = require('../utils/responseFormatter');

const authController = {
  async login(req, res, next) {
    console.log("Intentando iniciar sesión...");
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return ResponseFormatter.error(res, 'Por favor ingrese correo y contraseña', 400);
      }
      console.log(`Correo recibido: ${email}`);

      const propietario = await Propietario.findOne({ where: { email } });
      if (!propietario) {
        console.log("¡Propietario no encontrado!");
        return ResponseFormatter.error(res, 'Credenciales inválidas', 401);
      }

      console.log(`Contraseña proporcionada (sin espacios): ${password.trim()}`);
      console.log(`Contraseña almacenada (encriptada): ${propietario.password}`);

      // Comparar las contraseñas correctamente
      const isValidPassword = await bcrypt.compare(password.trim(), propietario.password);
      console.log(`¿Contraseña válida?: ${isValidPassword}`);

      if (!isValidPassword) {
        console.log("¡Contraseña inválida!");
        return ResponseFormatter.error(res, 'Credenciales inválidas', 401);
      }

      // Generar el token
      const token = jwt.sign(
        { id: propietario.id, email: propietario.email },
        jwtSecret,
        { expiresIn: '24h' }
      );
      console.log("¡Token generado!");

      return ResponseFormatter.success(res, { token }, 'Login exitoso', 200);
    } catch (error) {
      console.error("Error en el login:", error);
      return ResponseFormatter.error(res, 'Error en el servidor', 500);
    }
  },

  async register(req, res) {
    console.log("Intentando registrar un propietario...");
    try {
      const { nombre, email, password } = req.body;
      if (!nombre || !email || !password) {
        return ResponseFormatter.error(res, 'Todos los campos son requeridos', 400);
      }
      console.log(`Datos recibidos para registro: Nombre: ${nombre}, Email: ${email}`);
  
      // Verificar si ya existe un propietario con el mismo email
      const existingUser = await Propietario.findOne({ where: { email } });
      if (existingUser) {
        console.log("¡El correo ya está registrado!");
        return ResponseFormatter.error(res, 'El correo ya está registrado', 400);
      }
  
      // Hashear la contraseña antes de guardarla
      console.log("Hasheando contraseña...");
      const hashedPassword = await bcrypt.hash(password.trim(), 10);  // Limpiar espacios antes de hashear
      console.log("Contraseña hasheada con éxito");

      console.log(`Contraseña antes de guardar: ${password}`);
      console.log(`Contraseña encriptada: ${hashedPassword}`);

      // Crear un nuevo propietario
      console.log("Creando propietario...");
      const nuevoPropietario = await Propietario.create({
        nombre,
        email,
        password: hashedPassword,  // Guardar la contraseña hasheada
      });
      console.log(`Nuevo propietario creado: ${nuevoPropietario.id}`);
  
      return ResponseFormatter.success(res, 'Usuario registrado exitosamente', { id: nuevoPropietario.id }, 201);
    } catch (error) {
      console.error("Error durante el registro:", error);
      return ResponseFormatter.error(res, 'Error en el servidor', 500);
    }
  }
};

module.exports = authController;
