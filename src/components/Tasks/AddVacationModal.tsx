import React, { useState, useEffect } from 'react';
import ModalContainer from '../ModalContainer';
import { Calendar as CalendarIcon, Plane } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, isBefore, startOfToday, addYears } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddVacationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vacation: {
    startDate: string;
    endDate: string;
    reason: string;
  }) => void;
}

const AddVacationModal: React.FC<AddVacationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  // Date constraints
  const today = startOfToday();
  const maxDate = addYears(today, 1);

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setStartDate(undefined);
      setEndDate(undefined);
      setReason('');
      setErrors({
        startDate: '',
        endDate: '',
        reason: '',
      });
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {
      startDate: '',
      endDate: '',
      reason: '',
    };
    let isValid = true;

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
      isValid = false;
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
      isValid = false;
    } else if (startDate && isBefore(endDate, startDate)) {
      newErrors.endDate = 'End date must be after start date';
      isValid = false;
    }

    if (!reason.trim()) {
      newErrors.reason = 'Reason is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm() && startDate && endDate) {
      onAdd({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        reason,
      });
      onClose();
    }
  };

  return (
    <ModalContainer
      title={
        <div className="flex items-center gap-2">
          <Plane className="text-[#0077b6]" size={24} />
          <span>Add Vacation</span>
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
      position="center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground',
                    errors.startDate && 'border-red-500',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[1100]" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) =>
                    isBefore(date, today) || isBefore(maxDate, date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-red-500 text-xs">{errors.startDate}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground',
                    errors.endDate && 'border-red-500',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[1100]" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) =>
                    isBefore(date, startDate || today) ||
                    isBefore(maxDate, date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.endDate && (
              <p className="text-red-500 text-xs">{errors.endDate}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter vacation reason..."
            className={`p-3 border ${
              errors.reason ? 'border-red-500' : 'border-gray-200'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077b6] h-[calc(100%-2rem)] resize-none bg-gray-50 text-gray-700`}
          />
          {errors.reason && (
            <p className="text-red-500 text-xs">{errors.reason}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90"
          >
            <Plane className="mr-2 h-4 w-4" />
            Add Vacation
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddVacationModal;
