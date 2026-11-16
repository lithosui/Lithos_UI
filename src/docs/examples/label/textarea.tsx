import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Textarea } from '../../../components/ui/Textarea'

export const LabelTextareaExample = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} className="mb-2">
        Message
      </Label>
      <Textarea id={id} name="message" placeholder="Tell us more" />
    </div>
  )
}
