import { Calendar } from '../../../components/ui/Calendar'

export const BoundedYearsCalendar = () => {
  return <Calendar mode="single" yearRange={[1940, new Date().getFullYear()]} />
}
