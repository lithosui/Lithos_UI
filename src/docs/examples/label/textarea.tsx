import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Textarea } from '../../../components/ui/Textarea'

export const TextareaLabel = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} className="mb-2">
        Your message
      </Label>
      <Textarea id={id} name="message" placeholder="Tell us what you have in mind..." />
    </div>
  )
}
