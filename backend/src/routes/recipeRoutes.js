const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

// Protege todas as rotas de receitas
router.use(authMiddleware);

router.get('/favorites', recipeController.getFavorites);
router.post('/favorites', recipeController.addFavorite);
router.delete('/favorites', recipeController.removeFavorite);

module.exports = router;
