const Apartamento = require('../../models/apartamento');
const ResponseFormatter = require('../utils/responseFormatter');

const apartamentoController = {
  async getAll(req, res) {
    try {
      const apartamentos = await Apartamento.findAll();
      return ResponseFormatter.success(res, apartamentos);
    } catch (error) {
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async getById(req, res) {
    try {
      const apartamento = await Apartamento.findByPk(req.params.id);
      if (!apartamento) {
        return ResponseFormatter.error(res, 'Apartamento no encontrado', 404);
      }
      return ResponseFormatter.success(res, apartamento);
    } catch (error) {
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async create(req, res) {
    try {
      const apartamento = await Apartamento.create(req.body);
      return ResponseFormatter.success(res, apartamento, 'Apartamento creado exitosamente', 201);
    } catch (error) {
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async update(req, res) {
    try {
      const apartamento = await Apartamento.findByPk(req.params.id);
      if (!apartamento) {
        return ResponseFormatter.error(res, 'Apartamento no encontrado', 404);
      }
      await apartamento.update(req.body);
      return ResponseFormatter.success(res, apartamento);
    } catch (error) {
      return ResponseFormatter.error(res, error.message, 500);
    }
  },

  async delete(req, res) {
    try {
      const apartamento = await Apartamento.findByPk(req.params.id);
      if (!apartamento) {
        return ResponseFormatter.error(res, 'Apartamento no encontrado', 404);
      }
      await apartamento.destroy();
      return ResponseFormatter.success(res, null, 'Apartamento eliminado exitosamente');
    } catch (error) {
      return ResponseFormatter.error(res, error.message, 500);
    }
  },
};

module.exports = apartamentoController;