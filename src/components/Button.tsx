import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  additionalStyle?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  title,
  additionalStyle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx([
        'h-full flex justify-center items-center text-sm text-center relative overflow-hidden text-white px-6 rounded-lg cursor-pointer transition-all duration-500 hover:bg-[length:200%_100%] hover:bg-right',
        additionalStyle,
      ])}
    >
      {children || title}
    </button>
  );
};

export default Button;
