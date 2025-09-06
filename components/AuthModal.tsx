import React, { useState } from 'react';
import * as api from '../services/apiService';
import { LoadingSpinner } from './icons/LoadingSpinner';

// FIX: Define props for the AuthModal component.
interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (token: string, user: any) => void;
}

// FIX: Implement the AuthModal component.
export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // FIX: Handle form submission for both login and registration.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      let data;
      if (isLoginView) {
        data = await api.loginUser({ email, password });
      } else {
        data = await api.registerUser({ username, email, password });
      }
      onAuthSuccess(data.token, data.user);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: Render the modal with login/register forms.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center text-amber-900 mb-4">{isLoginView ? 'Entrar' : 'Criar Conta'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de usuário</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-400">
            {isLoading ? <LoadingSpinner className="h-5 w-5"/> : (isLoginView ? 'Entrar' : 'Registrar')}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLoginView ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <button onClick={() => { setIsLoginView(!isLoginView); setError(null); }} className="font-medium text-amber-600 hover:text-amber-500 ml-1">
            {isLoginView ? 'Crie uma' : 'Entre'}
          </button>
        </p>
      </div>
    </div>
  );
};
