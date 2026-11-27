import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const OptionalLabel = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} className="mb-2">
        Phone number (optional)
      </Label>
      <Input id={id} name="phone" type="tel" autoComplete="tel" />
    </div>
  )
}
