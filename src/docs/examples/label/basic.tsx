import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const BasicLabel = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} className="mb-2">
        Email
      </Label>
      <Input id={id} type="email" placeholder="you@example.com" />
    </div>
  )
}
