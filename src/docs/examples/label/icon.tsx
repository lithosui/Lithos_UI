import { Label } from '../../../components/ui/Label'
import { IconBell } from '../../../components/ui/icons/IconBell'

export const IconLabel = () => (
  <Label className="inline-flex items-center normal-case">
    <IconBell aria-hidden="true" focusable="false" className="me-2 shrink-0" />
    Notifications
  </Label>
)
