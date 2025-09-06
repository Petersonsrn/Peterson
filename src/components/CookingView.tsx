import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Recipe } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { SpeakerOffIcon } from './icons/SpeakerOffIcon';

interface CookingViewProps {
  recipe: Recipe;
  onClose: () => void;
}

export const CookingView: React.FC<CookingViewProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const { isSpeaking, speak, cancel } = useSpeechSynthesis();

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const speechButtonRef = useRef<HTMLButtonElement>(null);

  const totalSteps = recipe.instructions.length;
  const currentInstruction = recipe.instructions[currentStep];

  const focusableElements = useMemo(() => {
    return [
      closeButtonRef.current,
      speechButtonRef.current,
      prevButtonRef.current,
      nextButtonRef.current,
    ].filter((el): el is HTMLButtonElement => el !== null && !el.disabled);
  }, [currentStep, totalSteps]);

  const speakInstruction = useCallback(() => {
    if (isSpeechEnabled && currentInstruction) {
      speak(currentInstruction);
    }
  }, [isSpeechEnabled, currentInstruction, speak]);
  
  useEffect(() => {
    speakInstruction();
    return () => {
      if (isSpeaking) {
        cancel();
      }
    };
  }, [currentStep, speakInstruction, isSpeaking, cancel]);
  
  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const toggleSpeech = () => {
    setIsSpeechEnabled(prev => {
        const newState = !prev;
        if (!newState) {
            cancel();
        } else {
            speak(currentInstruction);
        }
        return newState;
    });
  };

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        if (currentStep > 0) handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        if (currentStep < totalSteps - 1) handleNext();
        return;
      }
      if (e.key === 'Tab') {
        if (focusableElements.length < 2) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handlePrev, handleNext, focusableElements, currentStep, totalSteps]);


  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 md:p-8 animate-fade-in">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 font-display">{recipe.title}</h2>
          <p className="text-lg text-gray-700">Modo de Cozinha</p>
        </div>
        <button 
          ref={closeButtonRef}
          onClick={onClose} 
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Fechar Modo de Cozinha"
        >
          <CloseIcon className="h-8 w-8 text-gray-800" />
        </button>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <div className="w-full max-w-4xl">
            <p className="text-xl md:text-2xl font-semibold text-gray-600 mb-4">
                Passo {currentStep + 1} de {totalSteps}
            </p>
            <p className="text-3xl md:text-5xl font-serif text-gray-800 leading-tight">
                {currentInstruction}
            </p>
        </div>
      </main>

      <footer className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto">
            <button
                ref={speechButtonRef}
                onClick={toggleSpeech}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full text-lg font-semibold transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
                {isSpeechEnabled ? <SpeakerIcon className="h-6 w-6" /> : <SpeakerOffIcon className="h-6 w-6" />}
                <span>{isSpeechEnabled ? 'Voz Ativada' : 'Voz Desativada'}</span>
            </button>
        </div>
        <div className="flex items-center gap-4">
            <button
                ref={prevButtonRef}
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="p-4 rounded-full bg-amber-800 text-white disabled:bg-gray-400 transition-colors"
                aria-label="Passo Anterior"
            >
                <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button
                ref={nextButtonRef}
                onClick={handleNext}
                disabled={currentStep === totalSteps - 1}
                className="p-4 rounded-full bg-amber-800 text-white disabled:bg-gray-400 transition-colors"
                aria-label="Próximo Passo"
            >
                <ChevronRightIcon className="h-8 w-8" />
            </button>
        </div>
      </footer>
    </div>
  );
};
