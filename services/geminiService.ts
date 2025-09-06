import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

// A chave da API é esperada nas variáveis de ambiente da implantação.
// Se a chave estiver ausente, a chamada à API falhará e o aplicativo exibirá uma mensagem de erro,
// em vez de travar e mostrar uma página em branco.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const generateRecipe = async (ingredients: string, time: string, difficulty: string): Promise<Recipe> => {
    try {
        let prompt = `Gere uma receita criativa e deliciosa usando os seguintes ingredientes: ${ingredients}.`;
        if (time && time !== 'any') {
            prompt += ` O tempo de preparo deve ser de no máximo ${time} minutos.`;
        }
        if (difficulty && difficulty !== 'any') {
            prompt += ` A dificuldade deve ser ${difficulty}.`;
        }
        prompt += " A receita deve ser apresentada em português do Brasil.";
        
        // 1. Gera o conteúdo da receita
        const recipeResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });
        
        const recipeJsonText = recipeResponse.text;
        if (!recipeJsonText) {
            throw new Error("A API não retornou conteúdo para a receita.");
        }
        const recipeData = JSON.parse(recipeJsonText);

        // 2. Gera a imagem da receita
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

        return { ...recipeData, imageUrl };

    } catch (error) {
        console.error("Erro ao gerar receita:", error);
        if (error instanceof Error) {
            throw new Error(`Falha na geração da receita: ${error.message}`);
        }
        throw new Error("Ocorreu um erro desconhecido ao gerar a receita.");
    }
};