import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        {children}
        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-sm text-gray-600 hover:underline">
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};