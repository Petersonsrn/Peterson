const express = require('express');
const router = express.Router();
const { GoogleGenAI, Type } = require("@google/genai");

// Inicializa o cliente Gemini com a chave do ambiente
if (!process.env.API_KEY) {
    throw new Error("A chave da API (API_KEY) do Gemini não foi encontrada no ambiente.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema da receita para garantir a saída em JSON
const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    prepTime: { type: Type.STRING },
    servings: { type: Type.STRING },
    difficulty: { type: Type.STRING },
    ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
    instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
    tips: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["title", "description", "prepTime", "servings", "difficulty", "ingredients", "instructions"]
};

router.post('/generate', async (req, res) => {
    const { ingredients, time, difficulty } = req.body;
    
    if (!ingredients) {
        return res.status(400).json({ message: 'Ingredientes são obrigatórios.' });
    }

    try {
        let prompt = `Gere uma receita criativa e deliciosa usando os seguintes ingredientes: ${ingredients}.`;
        if (time && time !== 'any') {
            prompt += ` O tempo de preparo deve ser de no máximo ${time}.`;
        }
        if (difficulty && difficulty !== 'any') {
            prompt += ` A dificuldade deve ser ${difficulty}.`;
        }
        prompt += " A receita deve ser apresentada em português do Brasil.";
        
        // Gera o conteúdo da receita
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });
        
        const recipeJsonText = response.text;
        if (!recipeJsonText) {
            throw new Error("A API não retornou conteúdo para a receita.");
        }
        const recipeData = JSON.parse(recipeJsonText);

        // Gera a imagem da receita
        const imagePrompt = `Uma foto de comida profissional e apetitosa da seguinte receita: ${recipeData.title}. Foco na textura e nos ingredientes frescos, com iluminação natural. Estilo de fotografia de comida de revista.`;

        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        const base64ImageBytes = imageResponse.generatedImages[0]?.image?.imageBytes;
        if (!base64ImageBytes) {
            throw new Error("Não foi possível gerar a imagem para a receita.");
        }
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

        const fullRecipe = { ...recipeData, imageUrl };
        res.status(200).json(fullRecipe);

    } catch (error) {
        console.error("Erro no proxy do Gemini:", error);
        res.status(500).json({ message: 'Erro ao gerar receita através do servidor.' });
    }
});

module.exports = router;
