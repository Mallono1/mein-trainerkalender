import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { AddScheduleDialog } from '@/components/add-schedule-dialog';
import api from '@/lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addDays, format } from 'date-fns';
import WidgetCard from '../Dashboard/WidgetCard';
import { Button } from '@/components/ui/Button';

// Mock data types based on the provided interface
interface ISchedule {
  _id: string;
  coachId: string;
  studentId: string;
  expiresAt: string;
  invoice: IInvoice;
  date: Date; // For easier date handling
}

interface IInvoice {
  _id: string;
  coachId: string;
  studentId: string;
  scheduleId: string;
  date: Date;
  currency: 'EUR' | 'USD';
  amount: number;
  status: 'unpaid' | 'email sent' | 'paid';
  expiresAt: Date;
}

interface AddSchedulePayload {
  coachId: string;
  studentId: string[];
  date: Date; // For easier date handling
}

interface Coach {
  _id: string;
  name: string;
}

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  postalCode: string;
  phoneNumber: string;
  houseNumber: string;
  country: string;
  city: string;
  street: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function WeeklySchedule() {
  // Current coach - hardcoded for this example
  const currentCoachId = useSelector((state: RootState) => state.user.userId);
  const currentCoachName = useSelector(
    (state: RootState) => state.user.userName,
  );

  // Today's day of week (0-6, where 0 is Sunday)
  const todayDayOfWeek = new Date().getDay();

  // Get current coach details
  const currentCoach = { _id: currentCoachId, name: currentCoachName };

  const fetchStudents = async () => {
    await api.get('coach/getStudents').then((res) => {
      setStudents(res.data);
    });
  };

  const fetchSchedules = async () => {
    await api.get('coach/getSchedules').then((res) => {
      setSchedules(res.data);
    });
  };

  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    fetchSchedules();
    fetchStudents();
  }, []);

  // Mock schedules
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  // Filter schedules for the current coach
  const coachSchedules = schedules.filter(
    (schedule) => schedule.coachId === currentCoachId,
  );

  // Days of the week
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // Card colors for each day
  const cardColors = [
    'bg-red-50 dark:bg-red-950', // Sunday
    'bg-yellow-50 dark:bg-yellow-950', // Monday
    'bg-green-50 dark:bg-green-950', // Tuesday
    'bg-blue-50 dark:bg-blue-950', // Wednesday
    'bg-purple-50 dark:bg-purple-950', // Thursday
    'bg-pink-50 dark:bg-pink-950', // Friday
    'bg-orange-50 dark:bg-orange-950', // Saturday
  ];

  // Header colors for each day
  const headerColors = [
    'bg-red-100 dark:bg-red-900', // Sunday
    'bg-yellow-100 dark:bg-yellow-900', // Monday
    'bg-green-100 dark:bg-green-900', // Tuesday
    'bg-blue-100 dark:bg-blue-900', // Wednesday
    'bg-purple-100 dark:bg-purple-900', // Thursday
    'bg-pink-100 dark:bg-pink-900', // Friday
    'bg-orange-100 dark:bg-orange-900', // Saturday
  ];

  // Function to get student name by ID
  const getStudentName = (studentId: string) => {
    const student = students.find((s) => s._id === studentId);
    return student
      ? `${student.firstName} ${student.lastName}`
      : 'Unknown Student';
  };

  // Function to get student name by ID
  const getStudentInfo = (studentId: string): Student | null => {
    const student = students.find((s) => s._id === studentId);
    return student ? student : null;
  };

  // Function to get schedules for a specific day and hour for the current coach
  const getCoachScheduleForHourAndDay = (hour: number, day: number) => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return coachSchedules.filter((s) => {
      const scheduleDate = new Date(s.date);
      return (
        scheduleDate.getHours() === hour &&
        scheduleDate.getDay() === day &&
        scheduleDate >= startOfWeek &&
        scheduleDate <= endOfWeek
      );
    });
  };

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Add new state to track current visible day
  const [currentVisibleDay, setCurrentVisibleDay] = useState(todayDayOfWeek);

  // Add scroll event listener to update current visible day
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollContainer) {
        const cardWidth = 316; // 300px width + 16px padding
        const scrollPosition = scrollContainer.scrollLeft;
        const currentDay = Math.round(scrollPosition / cardWidth);
        setCurrentVisibleDay(currentDay);
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to today's card when component mounts
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 300 + 16; // card width + padding
      scrollContainerRef.current.scrollTo({
        left: todayDayOfWeek * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [todayDayOfWeek]);

  // Modify scroll functions to update current visible day
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newDay = Math.max(0, currentVisibleDay - 1);
      const cardWidth = 316; // 300px width + 16px padding
      scrollContainerRef.current.scrollTo({
        left: newDay * cardWidth,
        behavior: 'smooth',
      });
      setCurrentVisibleDay(newDay);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const newDay = Math.min(6, currentVisibleDay + 1);
      const cardWidth = 316; // 300px width + 16px padding
      scrollContainerRef.current.scrollTo({
        left: newDay * cardWidth,
        behavior: 'smooth',
      });
      setCurrentVisibleDay(newDay);
    }
  };

  // Update the pagination dots click handler
  const handleDotClick = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 316; // 300px width + 16px padding
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentVisibleDay(index);
    }
  };

  // Count total sessions for the coach
  const totalSessions = coachSchedules.length;

  // Handle adding a new schedule
  const handleAddSchedule = async (newScheduleData: {
    coachId: string;
    studentIds: string[];
    hour: number;
    date: Date;
    isRecurring?: boolean;
    endDate?: Date;
  }) => {
    if (newScheduleData.isRecurring && newScheduleData.endDate) {
      // Prepare the request payload for the new endpoint
      const recurringSchedulePayload = {
        coachId: newScheduleData.coachId,
        studentIds: newScheduleData.studentIds,
        startDate: newScheduleData.date,
        endDate: newScheduleData.endDate,
        hour: newScheduleData.hour,
      };

      // Make a single API call to create all recurring schedules
      await api
        .post('coach/addSchedules', recurringSchedulePayload)
        .then((res) => {
          // Extract schedules from the response
          const createdItems = res.data.data || [];
          const createdSchedules = createdItems.map(
            (item: { schedule: any }) => item.schedule,
          );

          // Update state with all new schedules
          setSchedules((prevSchedules) => [
            ...prevSchedules,
            ...createdSchedules,
          ]);

          // Show success message
          alert(
            `Created ${
              createdSchedules.length
            } recurring schedules from ${format(
              newScheduleData.date,
              'PP',
            )} to ${format(newScheduleData.endDate!, 'PP')}`,
          );
        })
        .catch((error) => {
          // Show error message to user
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            alert(`Error: ${error.response.data.message}`);
          } else {
            alert('Failed to create recurring schedules. Please try again.');
          }
        });
    } else {
      // Handle single schedule (original implementation unchanged)
      const newSchedule: AddSchedulePayload = {
        coachId: newScheduleData.coachId,
        studentId: newScheduleData.studentIds,
        date: new Date(
          newScheduleData.date.getFullYear(),
          newScheduleData.date.getMonth(),
          newScheduleData.date.getDate(),
          newScheduleData.hour, // This will be the exact hour in UTC
        ),
      };

      await api
        .post('coach/addSchedule', newSchedule)
        .then((res) => {
          setSchedules((prevSchedules) => [
            ...prevSchedules,
            ...res.data.data.map((data) => {
              return { ...data.schedule, invoice: data.invoice };
            }),
          ]);
        })
        .catch((error) => {
          // Show error message to user
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            alert(`Error: ${error.response.data.message}`);
          } else {
            alert('Failed to create schedule. Please try again.');
          }
        });
    }
  };

  // handle invoice status update
  const handleInvoiceStatusUpdate = async (id: string, scheduleId: string) => {
    const res = await api.post('coach/updateInvoice/' + id).then((r) => {
      setSchedules((prev) => {
        return prev.map((schedule: ISchedule) => {
          if (schedule._id.toString() !== scheduleId.toString()) {
            return schedule;
          }
          return { ...schedule, invoice: r.data };
        });
      });
    });
  };
  return (
    <div className="container mx-auto pb-6">
      <div className="flex flex-col md:flex-row justify-between  mb-6">
        <h1 className="text-3xl font-bold  md:text-left">Coach Dashboard</h1>
        <div className="flex items-center mt-2 md:mt-0">
          <div className="flex items-center bg-primary-foreground p-2 rounded-lg shadow-sm mr-4">
            <div className="bg-primary rounded-full p-2 mr-3">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium">{currentCoach?.name}</p>
              <p className="text-sm text-muted-foreground">
                {totalSessions} scheduled sessions
              </p>
            </div>
          </div>

          <AddScheduleDialog
            students={students}
            currentCoachId={currentCoachId}
            onAddSchedule={handleAddSchedule}
          />
        </div>
      </div>

      {/* Add the four metric boxes here */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <WidgetCard
          title="Today's Sessions"
          amount={5}
          className="hover:shadow-lg transition-shadow duration-300"
        />
        <WidgetCard
          title="Upcoming Sessions"
          amount={12}
          className="hover:shadow-lg transition-shadow duration-300"
        />
        <WidgetCard
          title="Total Hours"
          amount={24}
          className="hover:shadow-lg transition-shadow duration-300"
        />
        <WidgetCard
          title="Revenue"
          amount={1200}
          increase={15}
          className="hover:shadow-lg transition-shadow duration-300"
        />
      </div>

      <div className="relative">
        {/* Navigation buttons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-5">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md bg-background"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-5">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md bg-background"
            onClick={scrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 pt-2 px-2 -mx-2 snap-x scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {daysOfWeek.map((day, dayIndex) => {
            // Count sessions for this day
            const daySessionsCount = coachSchedules.filter((s) => {
              const scheduleDate = new Date(s.date);
              const today = new Date();
              const startOfWeek = new Date(today);
              startOfWeek.setDate(today.getDate() - today.getDay());
              startOfWeek.setHours(0, 0, 0, 0);

              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              endOfWeek.setHours(23, 59, 59, 999);

              return (
                scheduleDate.getDay() === dayIndex &&
                scheduleDate >= startOfWeek &&
                scheduleDate <= endOfWeek
              );
            }).length;

            // Check if this is today
            const isToday = dayIndex === todayDayOfWeek;

            return (
              <div
                key={dayIndex}
                className="flex-none w-[300px] px-2 snap-center"
              >
                <div className={`relative ${isToday ? ' ' : ''}`}>
                  {isToday && (
                    <div className="absolute  left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-sm font-medium  shadow-md">
                      Today
                    </div>
                  )}
                  <Card
                    className={`${cardColors[dayIndex]} border-2 h-[600px] ${
                      isToday ? 'ring-4 ring-primary shadow-xl' : ''
                    }`}
                  >
                    <CardHeader
                      className={`${headerColors[dayIndex]} py-3 ${
                        isToday ? '' : ''
                      }`}
                    >
                      <CardTitle className="text-center flex items-center justify-center">
                        {day}
                        {daySessionsCount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {daySessionsCount}{' '}
                            {daySessionsCount === 1 ? 'session' : 'sessions'}
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 h-[90%]">
                      <ScrollArea className="h-full pr-3">
                        <div className="space-y-2">
                          {Array.from({ length: 24 }, (_, hourIndex) => {
                            if (hourIndex < 7 || hourIndex > 22) {
                              return <></>;
                            }
                            const schedules = getCoachScheduleForHourAndDay(
                              hourIndex,
                              dayIndex,
                            );
                            const currentHour = new Date().getHours();
                            const isCurrentHour =
                              isToday && hourIndex === currentHour;

                            return (
                              <div
                                key={hourIndex}
                                className={`p-2 rounded-md ${
                                  schedules.length > 0
                                    ? 'bg-white dark:bg-gray-800 shadow-sm border-l-4 border-primary'
                                    : isCurrentHour
                                    ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30'
                                    : 'bg-gray-100 dark:bg-gray-900'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`font-medium ${
                                      isCurrentHour ? 'text-primary' : ''
                                    }`}
                                  >
                                    {hourIndex}:00
                                    {isCurrentHour && (
                                      <span className="ml-2 text-xs font-bold ">
                                        ← Now
                                      </span>
                                    )}
                                  </span>
                                  <div>
                                    {/* {schedule && (
                                      <Badge variant="outline" className="ml-2">
                                        Booked
                                      </Badge>
                                    )} */}
                                    {schedules.length > 0 && isCurrentHour && (
                                      <Badge variant="outline" className="ml-2">
                                        Happening now
                                      </Badge>
                                    )}

                                    {schedules.length > 0 &&
                                      schedules[0].invoice && (
                                        <Badge
                                          variant={
                                            schedules[0].invoice.status ===
                                            'unpaid'
                                              ? 'invoice_unpaid'
                                              : schedules[0].invoice.status ===
                                                'email sent'
                                              ? 'invoice_sent'
                                              : 'invoice_paid'
                                          }
                                          className="ml-2"
                                        >
                                          <span className="mix-blend-exclusion ">
                                            {schedules[0].invoice.status}
                                          </span>
                                        </Badge>
                                      )}
                                  </div>
                                </div>
                                {schedules.length > 0 &&
                                  schedules[0].invoice && (
                                    <>
                                      <div className="mt-1 text-sm">
                                        <div>
                                          <span className="font-semibold">
                                            Students:
                                          </span>{' '}
                                          {schedules.map((schedule) => {
                                            return (
                                              <p>
                                                {getStudentName(
                                                  schedule.studentId,
                                                )}
                                              </p>
                                            );
                                          })}
                                        </div>
                                      </div>
                                      <div className="mt-2 text-sm flex-row-reverse flex">
                                        <Button
                                          onClick={() => {
                                            handleInvoiceStatusUpdate(
                                              schedules[0].invoice._id,
                                              schedules[0]._id,
                                            );
                                          }}
                                          size={'sm'}
                                          disabled={
                                            schedules[0].invoice.status ===
                                            'paid'
                                          }
                                          variant={
                                            schedules[0].invoice.status ===
                                            'unpaid'
                                              ? 'invoice_unpaid'
                                              : schedules[0].invoice.status ===
                                                'email sent'
                                              ? 'invoice_sent'
                                              : 'invoice_paid'
                                          }
                                        >
                                          {schedules[0].invoice.status ===
                                          'unpaid'
                                            ? 'Send Invoice'
                                            : schedules[0].invoice.status ===
                                              'email sent'
                                            ? 'Mark as Paid'
                                            : 'Paid'}
                                        </Button>
                                      </div>
                                    </>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    {isToday && (
                      <div className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none" />
                    )}
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Update the pagination dots section */}
      <div className="flex justify-center mt-4 space-x-1">
        {daysOfWeek.map((_, index) => {
          const hasSession = coachSchedules.some(
            (s) => new Date(s.date).getDay() === index,
          );
          const isToday = index === todayDayOfWeek;
          const isCurrentVisible = index === currentVisibleDay;

          return (
            <div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
                isCurrentVisible
                  ? 'bg-primary ring-2 ring-primary/30 w-3 h-3'
                  : hasSession
                  ? 'bg-primary/40'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-primary/30'
              }`}
              onClick={() => handleDotClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
