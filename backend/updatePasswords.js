const bcrypt = require('bcryptjs');
const { Propietario } = require('./models');  // Asegúrate de que la ruta a tu modelo es correcta

async function actualizarContraseñas() {
  const propietarios = await Propietario.findAll();
  for (const propietario of propietarios) {
    if (!propietario.password.startsWith('$2a$')) { // Si no es un hash bcrypt
      const hashedPassword = await bcrypt.hash(propietario.password, 10);
      propietario.password = hashedPassword;
      await propietario.save();
      console.log(`Contraseña actualizada para el propietario ${propietario.email}`);
    }
  }
}

actualizarContraseñas();