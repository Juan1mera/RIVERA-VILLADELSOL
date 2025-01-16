const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const { port } = require('./src/config/config'); // Verifica si `port` está definido correctamente
const ErrorHandler = require('./src/utils/errorHandler');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const propietarioRoutes = require('./src/routes/propietarioRoutes');
const apartamentoRoutes = require('./src/routes/apartamentoRoutes');
const pagoRoutes = require('./src/routes/pagoRoutes');
const visitanteRoutes = require('./src/routes/visitanteRoutes');

const PORT = process.env.PORT || port || 4000; // Asegúrate de que `port` esté definido correctamente

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/propietarios', propietarioRoutes);
app.use('/api/apartamentos', apartamentoRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/visitantes', visitanteRoutes);

// Error handling
app.use(ErrorHandler.handle);

// Database connection and server start
sequelize
  .sync({ alter: true }) // Sincroniza las tablas sin eliminarlas
  .then(() => {
    console.log('Las tablas han sido sincronizadas con éxito');
    // Iniciar el servidor después de sincronizar las tablas
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar las tablas:', err);
  });
