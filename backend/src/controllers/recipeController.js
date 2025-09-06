const db = require('../models/db');

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query('SELECT recipe_data FROM favorite_recipes WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    const favorites = result.rows.map(row => row.recipe_data);
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    res.status(500).json({ message: 'Erro ao buscar receitas favoritas.' });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeData = req.body;

    if (!recipeData || !recipeData.title) {
        return res.status(400).json({ message: 'Dados da receita inválidos.' });
    }

    const result = await db.query(
      "INSERT INTO favorite_recipes (user_id, recipe_data) VALUES ($1, $2) ON CONFLICT (user_id, (recipe_data->>'title')) DO NOTHING RETURNING recipe_data",
      [userId, JSON.stringify(recipeData)]
    );
    
    if (result.rows.length > 0) {
        res.status(201).json(result.rows[0].recipe_data);
    } else {
        res.status(200).json(recipeData);
    }
    
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ message: 'Erro ao adicionar receita aos favoritos.' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Título da receita é obrigatório.' });
    }

    await db.query(
      "DELETE FROM favorite_recipes WHERE user_id = $1 AND (recipe_data->>'title') = $2",
      [userId, title]
    );
    
    res.status(200).json({ message: 'Receita removida dos favoritos com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    res.status(500).json({ message: 'Erro ao remover receita dos favoritos.' });
  }
};
