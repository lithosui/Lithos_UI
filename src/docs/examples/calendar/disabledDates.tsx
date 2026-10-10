import { Calendar } from '../../../components/ui/Calendar'

const bookedDates = [10, 11, 18]

export const DisabledDatesCalendar = () => {
  return <Calendar mode="single" disabledDates={bookedDates} minDate={new Date()} />
}
