import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const HelperTextLabel = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} className="mb-2">
        Username
      </Label>
      <Input id={id} name="username" autoComplete="username" aria-describedby={`${id}-hint`} />
      <p id={`${id}-hint`} className="mt-2 text-sm">
        Use the name you want others to see.
      </p>
    </div>
  )
}
