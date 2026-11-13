import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Checkbox } from '../../../components/ui/Checkbox'

export const LabelCheckboxExample = () => {
  const id = useId()
  return (
    <div className="flex items-center">
      <Checkbox id={id} name="updates" className="mr-2" />
      <Label htmlFor={id}>Send me updates</Label>
    </div>
  )
}
