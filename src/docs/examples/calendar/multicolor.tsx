import { Calendar } from '../../../components/ui/Calendar'

const gymColors = [
  { dates: [4, 5], color: '#ff6b6b' },
  { dates: [17, 18, 19], color: '#4dabf7' },
]

export const MultiColorCalendar = () => {
  return <Calendar mode="multiple" dateColors={gymColors} />
}
