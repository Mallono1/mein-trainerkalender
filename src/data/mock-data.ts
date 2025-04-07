import type { Coach, Student, ISchedule } from "@/types"

// Mock data for coaches
export const coaches: Coach[] = [
  { _id: "coach1", name: "Coach Johnson" },
  { _id: "coach2", name: "Coach Williams" },
  { _id: "coach3", name: "Coach Davis" },
  { _id: "coach4", name: "Coach Miller" },
  { _id: "coach5", name: "Coach Wilson" },
]

// Mock data for students
export const students: Student[] = [
  { _id: "student1", name: "Alex Thompson" },
  { _id: "student2", name: "Jamie Parker" },
  { _id: "student3", name: "Casey Morgan" },
  { _id: "student4", name: "Taylor Reed" },
  { _id: "student5", name: "Jordan Bailey" },
  { _id: "student6", name: "Riley Cooper" },
  { _id: "student7", name: "Quinn Murphy" },
  { _id: "student8", name: "Avery Collins" },
]

// Initial mock schedules
export const initialSchedules: ISchedule[] = [
  {
    _id: "s1",
    coachId: "coach1", // Coach Johnson
    studentId: "student1",
    hour: 9,
    day: 0,
    month: 2,
    year: 2025,
    expiresAt: "2025-03-30",
  },
  {
    _id: "s2",
    coachId: "coach2",
    studentId: "student2",
    hour: 14,
    day: 0,
    month: 2,
    year: 2025,
    expiresAt: "2025-03-30",
  },
  {
    _id: "s3",
    coachId: "coach3",
    studentId: "student3",
    hour: 17,
    day: 0,
    month: 2,
    year: 2025,
    expiresAt: "2025-03-30",
  },
  {
    _id: "s4",
    coachId: "coach1", // Coach Johnson
    studentId: "student4",
    hour: 10,
    day: 1,
    month: 2,
    year: 2025,
    expiresAt: "2025-03-31",
  },
  {
    _id: "s5",
    coachId: "coach4",
    studentId: "student5",
    hour: 13,
    day: 1,
    month: 2,
    year: 2025,
    expiresAt: "2025-03-31",
  },
  {
    _id: "s6",
    coachId: "coach2",
    studentId: "student6",
    hour: 16,
    day: 2,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-01",
  },
  {
    _id: "s7",
    coachId: "coach5",
    studentId: "student7",
    hour: 11,
    day: 3,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-02",
  },
  {
    _id: "s8",
    coachId: "coach3",
    studentId: "student8",
    hour: 15,
    day: 3,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-02",
  },
  {
    _id: "s9",
    coachId: "coach4",
    studentId: "student1",
    hour: 9,
    day: 4,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-03",
  },
  {
    _id: "s10",
    coachId: "coach1", // Coach Johnson
    studentId: "student3",
    hour: 14,
    day: 4,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-03",
  },
  {
    _id: "s11",
    coachId: "coach5",
    studentId: "student5",
    hour: 10,
    day: 5,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-04",
  },
  {
    _id: "s12",
    coachId: "coach2",
    studentId: "student7",
    hour: 16,
    day: 5,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-04",
  },
  {
    _id: "s13",
    coachId: "coach3",
    studentId: "student2",
    hour: 11,
    day: 6,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-05",
  },
  {
    _id: "s14",
    coachId: "coach1", // Coach Johnson
    studentId: "student4",
    hour: 13,
    day: 6,
    month: 2,
    year: 2025,
    expiresAt: "2025-04-05",
  },
]

// Days of the week
export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Card colors for each day
export const cardColors = [
  "bg-red-50 dark:bg-red-950", // Sunday
  "bg-yellow-50 dark:bg-yellow-950", // Monday
  "bg-green-50 dark:bg-green-950", // Tuesday
  "bg-blue-50 dark:bg-blue-950", // Wednesday
  "bg-purple-50 dark:bg-purple-950", // Thursday
  "bg-pink-50 dark:bg-pink-950", // Friday
  "bg-orange-50 dark:bg-orange-950", // Saturday
]

// Header colors for each day
export const headerColors = [
  "bg-red-100 dark:bg-red-900", // Sunday
  "bg-yellow-100 dark:bg-yellow-900", // Monday
  "bg-green-100 dark:bg-green-900", // Tuesday
  "bg-blue-100 dark:bg-blue-900", // Wednesday
  "bg-purple-100 dark:bg-purple-900", // Thursday
  "bg-pink-100 dark:bg-pink-900", // Friday
  "bg-orange-100 dark:bg-orange-900", // Saturday
]

