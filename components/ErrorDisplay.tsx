import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

interface ErrorDisplayProps {
  error: string | null;
  onRetry?: () => void;
  onDismiss: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="my-8 p-6 bg-red-100 border-2 border-red-300 text-red-800 rounded-2xl shadow-lg max-w-2xl mx-auto" role="alert">
      <div className="flex items-start">
        <WarningIcon className="h-8 w-8 text-red-500 mr-4 flex-shrink-0" />
        <div className="flex-grow">
          <h4 className="font-bold text-lg">Oops! Algo deu errado.</h4>
          <p className="text-sm mt-1">{error}</p>
          <div className="mt-4 flex gap-4">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Tentar Novamente
              </button>
            )}
            <button
              onClick={onDismiss}
              className="px-4 py-2 bg-transparent text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors text-sm"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};