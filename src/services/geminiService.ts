import { Recipe } from '../types';

const mockRecipe: Recipe = {
  title: "Macarrão ao Pesto Clássico",
  description: "Uma receita italiana rápida e vibrante, perfeita para uma refeição de semana. O frescor do manjericão e o sabor marcante do alho e parmesão criam um prato inesquecível.",
  prepTime: "20 minutos",
  servings: "2 porções",
  difficulty: "Fácil",
  ingredients: [
    "200g de espaguete ou seu macarrão favorito",
    "2 xícaras de folhas de manjericão fresco",
    "1/2 xícara de queijo parmesão ralado na hora",
    "1/4 xícara de pinoli ou nozes",
    "2 dentes de alho grandes, descascados",
    "1/2 xícara de azeite de oliva extra virgem",
    "Sal e pimenta do reino a gosto"
  ],
  instructions: [
    "Cozinhe o macarrão em água fervente com sal conforme as instruções da embalagem até ficar 'al dente'.",
    "Enquanto o macarrão cozinha, prepare o molho pesto. Em um processador, bata o manjericão, o parmesão, os pinoli e o alho até picar bem.",
    "Com o processador ligado, adicione o azeite em um fio lento e contínuo até formar uma emulsão cremosa.",
    "Tempere com sal e pimenta a gosto. Se o pesto estiver muito denso, adicione uma colher de sopa da água do cozimento do macarrão.",
    "Escorra o macarrão, reservando um pouco da água do cozimento.",
    "Misture o macarrão quente com o molho pesto, adicionando a água reservada aos poucos se necessário para atingir a consistência desejada.",
    "Sirva imediatamente, com mais queijo parmesão por cima."
  ],
  tips: [
    "Para um sabor extra, toste os pinoli ou nozes em uma frigideira seca antes de usar.",
    "Guarde o pesto que sobrar na geladeira com uma camada de azeite por cima para evitar a oxidação."
  ],
  imageUrl: `https://picsum.photos/seed/MacarraoPesto/1200/600`
};

export const generateRecipe = async (ingredients: string, time: string, difficulty: string): Promise<Recipe> => {
    console.log(`Gerando receita de exemplo com base em: Ingredientes=${ingredients}, Tempo=${time}, Dificuldade=${difficulty}`);

    await new Promise(resolve => setTimeout(resolve, 1500));

    return mockRecipe;
};
