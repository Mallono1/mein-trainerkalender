import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface PopupContainerProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
}

const PopupContainer: React.FC<PopupContainerProps> = React.memo(
  ({ isOpen, onClose, title, children }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    // Memoize handleClickOutside to avoid unnecessary re-renders
    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          popupRef.current &&
          !popupRef.current.contains(event.target as Node)
        ) {
          onClose?.();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, handleClickOutside]); // Ensure this only updates when necessary

    if (!isOpen) return null;

    return (
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className='absolute -right-4 top-13 w-64 bg-white shadow-lg rounded-2xl p-4 border border-gray-300'
      >
        <h4 className='text-lg font-semibold'>{title}</h4>
        <div className='mt-2'>{children}</div>
      </motion.div>
    );
  }
);

export default PopupContainer;
