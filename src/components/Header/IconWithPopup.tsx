import React, { memo } from 'react';
import PopupContainer from '../PopupContainer';

interface IconWithPopupProps {
  title: string;
  icon: React.ElementType;
  count: number;
  onClick: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const IconWithPopup: React.FC<IconWithPopupProps> = memo(
  ({ title, icon: Icon, count, onClick, isOpen, children }) => (
    <div className="relative cursor-pointer">
      <Icon size={20} onClick={onClick} />

      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-medium w-4 h-4 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
      {isOpen && (
        <PopupContainer title={title} onClose={onClick} isOpen={isOpen}>
          {children}
        </PopupContainer>
      )}
    </div>
  ),
);

export default IconWithPopup;
