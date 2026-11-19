import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const RequiredLabelExample = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} required className="mb-2">
        Email
      </Label>
      <Input id={id} name="email" type="email" placeholder="you@example.com" required />
    </div>
  )
}
