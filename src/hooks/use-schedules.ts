"use client"

import { useState } from "react"
import type { ISchedule, NewScheduleData } from "@/types"

// Custom hook to manage schedules
export function useSchedules(initialSchedules: ISchedule[]) {
  const [schedules, setSchedules] = useState<ISchedule[]>(initialSchedules)

  // Add a new schedule
  const addSchedule = (newScheduleData: NewScheduleData) => {
    const newSchedule: ISchedule = {
      _id: `s${schedules.length + 1}`,
      coachId: newScheduleData.coachId,
      studentId: newScheduleData.studentId,
      hour: newScheduleData.hour,
      day: newScheduleData.date.getDay(),
      month: newScheduleData.date.getMonth(),
      year: newScheduleData.date.getFullYear(),
      expiresAt: newScheduleData.date.toISOString(),
      date: new Date(newScheduleData.date),
    }

    setSchedules((prevSchedules) => [...prevSchedules, newSchedule])
  }

  // Filter schedules for a specific coach
  const getCoachSchedules = (coachId: string) => {
    return schedules.filter((schedule) => schedule.coachId === coachId)
  }

  return {
    schedules,
    addSchedule,
    getCoachSchedules,
  }
}

