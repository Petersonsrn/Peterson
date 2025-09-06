require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const geminiRoutes = require('./routes/geminiRoutes');

const app = express();

// Middleware
// Em um ambiente de produção, você deve restringir a origem:
// app.use(cors({ origin: 'https://seu-site-frontend.com' }));
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
