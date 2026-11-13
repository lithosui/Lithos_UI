import { useId } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'

export const LabelSizesExample = () => {
  const id = useId()
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <Label htmlFor={`${id}-sm`} size="sm" className="mb-2">
          Small
        </Label>
        <Input id={`${id}-sm`} size="sm" placeholder="Small input" />
      </div>
      <div>
        <Label htmlFor={`${id}-default`} className="mb-2">
          Default
        </Label>
        <Input id={`${id}-default`} placeholder="Default input" />
      </div>
      <div>
        <Label htmlFor={`${id}-md`} size="md" className="mb-2">
          Medium
        </Label>
        <Input id={`${id}-md`} size="md" placeholder="Medium input" />
      </div>
      <div>
        <Label htmlFor={`${id}-lg`} size="lg" className="mb-2">
          Large
        </Label>
        <Input id={`${id}-lg`} size="lg" placeholder="Large input" />
      </div>
    </div>
  )
}
