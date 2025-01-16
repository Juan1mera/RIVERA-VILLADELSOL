const Propietario = require('../../models/propietario');
const ResponseFormatter = require('../utils/responseFormatter');

const propietarioController = {
  async getAll(req, res) {
    console.log("Obteniendo todos los propietarios...");
    try {
      const propietarios = await Propietario.findAll({
        attributes: { exclude: ['password'] },
      });
      console.log(`Se encontraron ${propietarios.length} propietarios`);
      return ResponseFormatter.success(res, propietarios);
    } catch (error) {
      console.error("Error al obtener los propietarios:", error);
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async getById(req, res) {
    console.log(`Obteniendo propietario por ID: ${req.params.id}`);
    try {
      const propietario = await Propietario.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
      });
      if (!propietario) {
        console.log("¡Propietario no encontrado!");
        return ResponseFormatter.error(res, 'Propietario no encontrado', 404);
      }
      return ResponseFormatter.success(res, propietario);
    } catch (error) {
      console.error("Error al obtener propietario por ID:", error);
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async create(req, res) {
    console.log("Creando nuevo propietario...");
    try {
      const propietario = await Propietario.create(req.body);
      console.log(`Nuevo propietario creado: ${propietario.id}`);
      const propietarioSinPassword = {
        ...propietario.toJSON(),
        password: undefined,
      };
      return ResponseFormatter.success(res, propietarioSinPassword, 'Propietario creado exitosamente', 201);
    } catch (error) {
      console.error("Error al crear propietario:", error);
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async update(req, res) {
    console.log(`Actualizando propietario con ID: ${req.params.id}`);
    try {
      const propietario = await Propietario.findByPk(req.params.id);
      if (!propietario) {
        console.log("¡Propietario no encontrado!");
        return ResponseFormatter.error(res, 'Propietario no encontrado', 404);
      }
      await propietario.update(req.body);
      return ResponseFormatter.success(res, propietario);
    } catch (error) {
      console.error("Error al actualizar propietario:", error);
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async delete(req, res) {
    console.log(`Eliminando propietario con ID: ${req.params.id}`);
    try {
      const propietario = await Propietario.findByPk(req.params.id);
      if (!propietario) {
        console.log("¡Propietario no encontrado!");
        return ResponseFormatter.error(res, 'Propietario no encontrado', 404);
      }
      await propietario.destroy();
      console.log("¡Propietario eliminado!");
      return ResponseFormatter.success(res, null, 'Propietario eliminado exitosamente');
    } catch (error) {
      console.error("Error al eliminar propietario:", error);
      return ResponseFormatter.error(res, error.message, 500);
    }
  },
};

module.exports = propietarioController;
