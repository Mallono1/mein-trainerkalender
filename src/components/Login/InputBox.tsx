import React, { ComponentProps } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputBoxProps {
  id?: string;
  name: string;
  placeholder: string;
  icon?: LucideIcon;
  type?: string;
  value: string;
  disabled?: boolean;
  autoComplete?: string;
  error?: string;
}

const InputBox: React.FC<ComponentProps<'input'> & InputBoxProps> = React.memo(
  ({
    id,
    name,
    placeholder,
    icon: Icon,
    error,
    ...rest
  }) => {
    return (
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        )}
        <input
          id={id || name}
          name={name}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-invalid={!!error}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-full text-sm focus:ring-2 focus:ring-[#90e0ef] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

export default InputBox;
