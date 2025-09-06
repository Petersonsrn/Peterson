import React from 'react';
import { SpeakerIcon } from '../icons/SpeakerIcon';
import { SpeakerOffIcon } from '../icons/SpeakerOffIcon';

interface InstructionsPanelProps {
  instructions: string[];
  onToggleSpeech: () => void;
  isSpeaking: boolean;
}

export const InstructionsPanel: React.FC<InstructionsPanelProps> = ({ instructions, onToggleSpeech, isSpeaking }) => (
  <div className="lg:col-span-2">
    <div className="flex items-center justify-between gap-4 mb-4 border-b-4 border-amber-300 pb-2">
      <h3 className="text-3xl font-bold text-amber-900 font-display">Instruções</h3>
      <button
          onClick={onToggleSpeech}
          className="p-2 rounded-full hover:bg-amber-100 transition-colors"
          aria-label={isSpeaking ? "Parar leitura das instruções" : "Ler instruções em voz alta"}
      >
          {isSpeaking ? (
              <SpeakerOffIcon className="h-9 w-9 text-amber-800" />
          ) : (
              <SpeakerIcon className="h-9 w-9 text-gray-800" />
          )}
      </button>
    </div>
    <ol className="space-y-4 text-lg text-gray-800">
      {instructions.map((step, index) => (
        <li key={index} className="flex gap-4">
          <span className="flex-shrink-0 bg-amber-800 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">{index + 1}</span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  </div>
);