class ResponseFormatter {
  static success(res, message, data, statusCode = 200) {
    console.log("Enviando respuesta exitosa...");
    return res.status(statusCode).json({
      status: 'success',
      message,   // Ahora se pasa el mensaje como un campo separado
      data,      // Los datos de la respuesta
    });
  }

  static error(res, message, statusCode = 500) {
    console.log("Enviando respuesta de error...");
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  }
}

module.exports = ResponseFormatter;
