import { useId, useState } from 'react'
import { Label } from '../../../components/ui/Label'
import { Select, SelectTrigger, SelectContent, SelectItem } from '../../../components/ui/Select'

export const SelectLabel = () => {
  const id = useId()
  const [country, setCountry] = useState('')
  return (
    <div className="w-full max-w-sm">
      <Label id={`${id}-label`} htmlFor={id} className="mb-2">
        Country
      </Label>
      <Select value={country} onChange={setCountry}>
        <SelectTrigger id={id} aria-labelledby={`${id}-label`} className="w-full">
          {country || 'Choose a country'}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="India" index={0}>
            India
          </SelectItem>
          <SelectItem value="Canada" index={1}>
            Canada
          </SelectItem>
          <SelectItem value="Nigeria" index={2}>
            Nigeria
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
