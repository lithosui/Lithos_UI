import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const BasicLabelExample = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} className="mb-2">
        Name
      </Label>
      <Input id={id} name="name" placeholder="Your name" />
    </div>
  )
}
