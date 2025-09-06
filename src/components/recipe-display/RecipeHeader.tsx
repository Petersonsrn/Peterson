import React from 'react';

interface RecipeHeaderProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ imageUrl, title, description }) => (
  <div className="relative">
    <img
      src={imageUrl || `https://picsum.photos/seed/${title.replace(/\s/g, '')}/1200/600`}
      alt={title}
      className="w-full h-64 md:h-96 object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 md:p-8">
      <h2 className="text-4xl md:text-5xl font-bold text-white font-display">{title}</h2>
      <p className="text-xl text-white/90 mt-2 max-w-3xl">{description}</p>
    </div>
  </div>
);