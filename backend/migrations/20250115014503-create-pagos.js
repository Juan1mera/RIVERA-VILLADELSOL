'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pagos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      propietario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'propietarios', // Nombre de la tabla de referencia
          key: 'id', // Clave primaria en la tabla de referencia
        },
        allowNull: false, // No puede ser null, debe estar asociado a un propietario
        onDelete: 'CASCADE', // Si se elimina un propietario, se eliminan los pagos asociados
        onUpdate: 'CASCADE', // Si se actualiza un propietario, se actualiza la clave foránea
      },
      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      fecha_pago: {
        type: Sequelize.DATEONLY, // Solo la fecha (sin tiempo)
        allowNull: false,
      },
      concepto: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'pagado', 'vencido'),
        defaultValue: 'pendiente',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pagos');
  }
};
