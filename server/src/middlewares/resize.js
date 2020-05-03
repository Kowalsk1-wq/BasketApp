const sharp = require('sharp');

function ResizeFile(request, response, next) {
  // Middleware responsável por pegar uma imagem e diminuí-la

  next();
}

module.exports = ResizeFile;
