import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { format, addYears, isBefore, startOfToday, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Plus, CalendarIcon } from 'lucide-react';
import { Student } from './ui/weekly-schedule';
import { MultiSelect, Option } from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AddScheduleDialogProps {
  students: Student[];
  currentCoachId: string;
  onAddSchedule: (schedule: {
    coachId: string;
    studentIds: string[];
    hour: number;
    date: Date;
    isRecurring?: boolean;
    endDate?: Date;
  }) => any;
}

export function AddScheduleDialog({
  students,
  currentCoachId,
  onAddSchedule,
}: AddScheduleDialogProps) {
  // State for the add schedule dialog
  const [scheduleType, setScheduleType] = useState<'single' | 'recurring'>(
    'single',
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Radio options for schedule type
  const scheduleOptions = [
    { value: 'single', label: 'Single Schedule' },
    { value: 'recurring', label: 'Recurring Schedule' },
  ];

  // Date constraints
  const today = startOfToday();
  const maxDate = addYears(today, 1);

  // Generate hours for select
  const hours = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 7;
    return {
      value: hour.toString(),
      label: `${hour}:00${
        hour < 12 ? ' AM' : hour === 12 ? ' PM' : hour > 12 ? ' PM' : ''
      }`,
    };
  });

  // Convert students to options format for MultiSelect
  const studentOptions: Option[] = students.map((student) => ({
    label: `${student.firstName} ${student.lastName}`,
    value: student._id,
  }));

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setScheduleType('single');
      setStartDate(undefined);
      setEndDate(undefined);
      setSelectedHour('');
      setSelectedStudents([]);
    }
  }, [open]);

  // Set default end date when start date is selected (for recurring schedule)
  useEffect(() => {
    if (scheduleType === 'recurring' && startDate && !endDate) {
      setEndDate(addDays(startDate, 7)); // Default to 1 week
    }
  }, [scheduleType, startDate, endDate]);

  // Handle form submission
  const handleAddSchedule = () => {
    if (scheduleType === 'single') {
      if (!startDate || !selectedHour || selectedStudents.length === 0) return;

      onAddSchedule({
        coachId: currentCoachId,
        studentIds: selectedStudents,
        hour: Number.parseInt(selectedHour),
        date: new Date(startDate),
        isRecurring: false,
      });
    } else {
      if (
        !startDate ||
        !endDate ||
        !selectedHour ||
        selectedStudents.length === 0
      )
        return;

      onAddSchedule({
        coachId: currentCoachId,
        studentIds: selectedStudents,
        hour: Number.parseInt(selectedHour),
        date: new Date(startDate),
        isRecurring: true,
        endDate: new Date(endDate),
      });
    }

    setOpen(false);
  };

  // Check if form is valid
  const isFormValid =
    selectedHour &&
    selectedStudents.length > 0 &&
    startDate &&
    (scheduleType === 'single' || (scheduleType === 'recurring' && endDate));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          {/* Schedule Type Selection */}
          <div className="grid gap-2">
            <Label>Schedule Type</Label>
            <RadioGroup
              options={scheduleOptions}
              value={scheduleType}
              onValueChange={(value) =>
                setScheduleType(value as 'single' | 'recurring')
              }
            />
          </div>

          {/* Date Selection */}
          {scheduleType === 'single' ? (
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground',
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
                <PopoverContent className="w-auto p-0" align="start">
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
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="startDate"
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, 'PPP')
                      ) : (
                        <span>Start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="endDate"
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !endDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>End date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) =>
                        (startDate && isBefore(date, startDate)) ||
                        isBefore(date, today) ||
                        isBefore(maxDate, date) ||
                        startDate?.getDay() !== date.getDay()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {/* Time Selection */}
          <div className="grid gap-2">
            <Label htmlFor="hour">Time</Label>
            <Select value={selectedHour} onValueChange={setSelectedHour}>
              <SelectTrigger id="hour">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour.value} value={hour.value}>
                    {hour.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Student Selection */}
          <div className="grid gap-2">
            <Label htmlFor="students">Students</Label>
            <MultiSelect
              options={studentOptions}
              selected={selectedStudents}
              onChange={setSelectedStudents}
              placeholder="Select students"
              emptyMessage="No students found"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddSchedule} disabled={!isFormValid}>
            {scheduleType === 'single'
              ? 'Add Schedule'
              : 'Add Recurring Schedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
