import { Button } from '../../../components/ui/Button'
import { IconHome } from '../../../components/ui/icons/IconHome'
import { IconSettings } from '../../../components/ui/icons/IconSettings'

export const WithIconButtonsExample = () => (
  <div className="flex items-center">
    <Button iconLeft={<IconHome />}>Home</Button>
    <Button variant="secondary" iconRight={<IconSettings />} className="ml-3">
      Settings
    </Button>
  </div>
)
