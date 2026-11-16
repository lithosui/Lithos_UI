import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'
import { Typography } from '../../../components/ui/Typography'

export const LabelDescriptionExample = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} className="mb-2">
        Display name
      </Label>
      <Input id={id} name="displayName" aria-describedby={`${id}-description`} placeholder="Your public name" />
      <Typography as="p" variant="small" id={`${id}-description`} className="mt-2 text-(--lithos-text)/70">
        This name appears on your profile.
      </Typography>
    </div>
  )
}
