import React from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface WidgetCardProps {
  title: string;
  amount?: number;
  increase?: number;
  children?: React.ReactNode;
  className?: string;
}

const WidgetCard: React.FC<WidgetCardProps> = React.memo(
  ({ title, amount, increase, children, className }) => {
    const increaseValue =
      typeof increase === 'number' && increase !== 0 ? (
        <span
          className="text-sm flex items-center gap-1 
        ${increase > 0 ? 'text-green-600' : 'text-red-600'}"
        >
          {increase > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {increase}% {increase > 0 ? 'increase' : 'decrease'}
        </span>
      ) : null;

    return (
      <div className={`h-full max-h-[35rem] p-6 bg-white shadow-md rounded-2xl border border-gray-200 ${className || ''}`}>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-lg font-semibold text-gray-700'>{title}</h2>
            {amount && (
              <p className='text-2xl font-bold text-gray-900'>{amount}</p>
            )}
            {amount && increaseValue && (
              <p className='text-sm text-green-600 flex items-center gap-1'>
                {increaseValue}
              </p>
            )}
          </div>
          {amount && increaseValue && increase && (
            <div
              className={`${
                increase > 0 ? 'bg-green-200' : 'bg-red-200'
              } p-3 rounded-full`}
            >
              {increase > 0 ? (
                <ArrowUpRight size={24} className='text-green-500' />
              ) : (
                <ArrowDownRight size={24} className='text-red-500' />
              )}
            </div>
          )}
        </div>

        {children && <div className='h-full'>{children}</div>}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.title === nextProps.title &&
    prevProps.amount === nextProps.amount &&
    prevProps.increase === nextProps.increase
);

export default WidgetCard;
