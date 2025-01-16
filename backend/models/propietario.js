'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');
const bcrypt = require('bcryptjs');

// Importar los modelos necesarios
const Apartamento = require('./apartamento');
const Pago = require('./pago');

const Propietario = sequelize.define('Propietario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

// Encriptar la contraseña antes de crear el propietario
Propietario.beforeCreate(async (propietario) => {
  console.log("Contraseña antes de guardar:", propietario.password);  // Verifica que la contraseña no tenga caracteres extraños
  const salt = await bcrypt.genSalt(10);
  propietario.password = await bcrypt.hash(propietario.password.trim(), salt);  // Eliminar espacios antes de encriptar
  console.log("Contraseña encriptada:", propietario.password);  // Verifica la contraseña encriptada
});

// Relación con Apartamento
Propietario.hasMany(Apartamento, { foreignKey: 'propietario_id' });
Apartamento.belongsTo(Propietario, { foreignKey: 'propietario_id' });

// Relación con Pago
Propietario.hasMany(Pago, { foreignKey: 'propietario_id' });
Pago.belongsTo(Propietario, { foreignKey: 'propietario_id' });

module.exports = Propietario;
