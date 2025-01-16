'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('visitantes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      apartamento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'apartamentos', // Nombre de la tabla de referencia
          key: 'id', // Clave primaria en la tabla de referencia
        },
        allowNull: false, // No puede ser null, debe estar asociado a un apartamento
        onDelete: 'CASCADE', // Si se elimina un apartamento, se eliminan los visitantes asociados
        onUpdate: 'CASCADE', // Si se actualiza un apartamento, se actualiza la clave foránea
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      documento: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      fecha_entrada: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_salida: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM('activo', 'finalizado'),
        defaultValue: 'activo',
      },
      motivo_visita: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('visitantes');
  }
};
