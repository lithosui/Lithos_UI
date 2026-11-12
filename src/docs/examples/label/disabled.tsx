import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const DisabledLabelExample = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={id} disabled className="mb-2">
        Account ID
      </Label>
      <Input id={id} name="accountId" defaultValue="LITHOS-001" disabled />
    </div>
  )
}
