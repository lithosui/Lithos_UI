import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const RequiredLabel = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} required className="mb-2">
        Full name
      </Label>
      <Input id={id} required autoComplete="name" placeholder="Alex Morgan" />
      <p className="mt-2 text-sm">* Required field</p>
    </div>
  )
}
