import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { PlainCheckbox } from '../../../components/ui/Checkbox'

export const GroupLabel = () => {
  const id = useId()
  return (
    <fieldset className="w-full max-w-sm border-2 border-(--lithos-border) p-4">
      <legend className="px-2 font-extrabold">Contact preferences</legend>
      <div className="flex items-center">
        <PlainCheckbox id={`${id}-email`} name="contact" value="email" />
        <Label htmlFor={`${id}-email`} className="ms-3 normal-case">
          Email updates
        </Label>
      </div>
      <div className="mt-4 flex items-center">
        <PlainCheckbox id={`${id}-sms`} name="contact" value="sms" />
        <Label htmlFor={`${id}-sms`} className="ms-3 normal-case">
          SMS updates
        </Label>
      </div>
    </fieldset>
  )
}
