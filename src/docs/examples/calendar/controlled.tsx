import { useState } from 'react'
import { Calendar, type CalendarValue } from '../../../components/ui/Calendar'

export const ControlledCalendar = () => {
  const [value, setValue] = useState<CalendarValue>(null)
  const [month, setMonth] = useState(new Date())

  return <Calendar mode="single" value={value} onChange={setValue} month={month} onMonthChange={setMonth} />
}
