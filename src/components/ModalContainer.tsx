import { X } from 'lucide-react';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: any;
  description?: string;
  children: React.ReactNode;
  position?: 'center' | 'top' | 'right';
};

const ModalContainer: React.FC<ModalProps> = React.memo(
  ({ isOpen, onClose, title, description, children, position = 'center' }) => {
    if (!isOpen) return null;

    let positionClasses = '';

    switch (position) {
      case 'top':
        positionClasses = 'top-4 left-1/2 transform -translate-x-1/2';
        break;
      case 'right':
        positionClasses = 'right-0 top-0 h-full w-1/3';
        break;
      case 'center':
      default:
        positionClasses =
          'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }

    return (
      <div className="fixed inset-0  z-[1000] flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div
          className={`fixed bg-white p-4 rounded-md shadow-lg transition-transform duration-200 ${positionClasses}`}
        >
          <div className="flex justify-between w-[80vw] lg:w-auto items-center">
            {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
            <button
              onClick={onClose}
              className="text-black py-1 px-3 rounded-lg transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          {description && <p className="text-gray-500 mb-4">{description}</p>}
          <div>{children}</div>
        </div>
      </div>
    );
  },
);

export default ModalContainer;
