const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// Middleware de autorização JWT
function authorizeToken(request, response, next) {
  //Captura o header de autorizacao
  const authHeader = request.headers['authorization'];

  //Captura o token do header
  const token = authHeader && authHeader.split(' ')[1];

  //Checa existencia do token
  if (!token) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token não fornecido ou incorreto'
    });
  }

  //Verifica o token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return response.status(StatusCodes.FORBIDDEN).json({
        message: 'Token inválido. Sem permissão'
      });
    }
    request.user = user;
    next();
  });
}

module.exports.authorizeToken = authorizeToken;
