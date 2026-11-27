import { useId, useState } from 'react'
import { Label } from '../../../components/ui/Label'
import { Toggle } from '../../../components/ui/Toggle'

export const SwitchLabel = () => {
  const id = useId()
  const [notifications, setNotifications] = useState(false)
  const [updates, setUpdates] = useState(true)

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="flex items-center">
        <Toggle
          id={`${id}-notifications`}
          type="button"
          role="switch"
          className="shrink-0"
          checked={notifications}
          onToggle={() => setNotifications((value) => !value)}
          label=""
          aria-labelledby={`${id}-notifications-label`}
          aria-checked={notifications}
          aria-pressed={undefined}
        />
        <Label htmlFor={`${id}-notifications`} className="ms-3 normal-case">
          <span id={`${id}-notifications-label`}>Notifications</span>
          <span aria-hidden="true" className="inline-block min-w-[5ch] text-start">
            : {notifications ? 'On' : 'Off'}
          </span>
        </Label>
      </div>
      <div className="flex items-center">
        <Toggle
          id={`${id}-updates`}
          type="button"
          role="switch"
          className="shrink-0"
          checked={updates}
          onToggle={() => setUpdates((value) => !value)}
          label=""
          aria-labelledby={`${id}-updates-label`}
          aria-checked={updates}
          aria-pressed={undefined}
        />
        <Label htmlFor={`${id}-updates`} className="ms-3 normal-case">
          <span id={`${id}-updates-label`}>Automatic updates</span>
          <span aria-hidden="true" className="inline-block min-w-[5ch] text-start">
            : {updates ? 'On' : 'Off'}
          </span>
        </Label>
      </div>
    </div>
  )
}
