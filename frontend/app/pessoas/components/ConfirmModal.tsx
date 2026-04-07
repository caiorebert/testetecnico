'use client';

import { mdiAlert } from '@mdi/js';
import Icon from '@mdi/react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export default function ConfirmModal({ 
  isOpen, onClose, onConfirm, title, message, loading 
}: ConfirmModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (Fundo escuro) */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <Icon path={mdiAlert} size={1} />
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                fechar
            </button>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer com Ações */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
          <button
            disabled={loading}
            onClick={onConfirm}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'carregando' : 'Excluir'}
          </button>
          <button
            disabled={loading}
            onClick={onClose}
            className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}