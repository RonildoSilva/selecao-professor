
require('dotenv').config();

const express = require('express');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

const { authorizeToken } = require('./middleware');
const users = require('./users');

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Desenvolvimento WEB');
});


app.post('/signin', (request, response) => {
    // Caputurar informações do corpo da requisição
    const { username, password } = request.body;

    // Capturar usuario que tenha os atributos específicos
    const user = users.find(u => u.username === username && u.password === password);

    //Checar existencia do usuario
    if(user) {
    // Gerar o token
      const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
      const token = jwt.sign(
        {
            username: user.username,
            email: user.email
        },
            process.env.JWT_SECRET,
        {
            expiresIn: jwtExpiresIn
        }
      );
      return response.json({ token });
    }
    else{
        return response.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Credenciais inválidas'
        });
    }
});


// Endpoint público que simula autenticação (mas não exige token)
app.get('/dash', (request, response) => {
  response.json({
    message: 'Quantidade de usuários cadastrados',
    number_users: users.length
  });
});

app.get('/me', authorizeToken, (request, response) => {
    return response.json({
      username: request.user.username
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
