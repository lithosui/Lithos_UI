import { useId, useState } from 'react'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'

export const ValidationLabel = () => {
  const id = useId()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  return (
    <form
      className="w-full max-w-sm"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        setError(name.trim() ? '' : 'Enter your full name.')
      }}
    >
      <Label htmlFor={id} required className="mb-2">
        Full name
      </Label>
      <Input
        id={id}
        name="fullName"
        autoComplete="name"
        required
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          setError('')
        }}
        invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-hint${error ? ` ${id}-error` : ''}`}
      />
      <p id={`${id}-hint`} className="mt-2 text-sm">
        * Required field
      </p>
      <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-bold">
        {error}
      </p>
      <Button type="submit" className="mt-4">
        Save profile
      </Button>
    </form>
  )
}
