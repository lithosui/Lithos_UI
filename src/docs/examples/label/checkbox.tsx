import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { PlainCheckbox } from '../../../components/ui/Checkbox'

export const CheckboxLabel = () => {
  const id = useId()
  return (
    <div className="flex items-center">
      <PlainCheckbox id={id} />
      <Label htmlFor={id} className="ms-3 normal-case">
        Send me product updates
      </Label>
    </div>
  )
}
