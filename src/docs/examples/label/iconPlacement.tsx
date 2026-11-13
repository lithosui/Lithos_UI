import { Card, CardContent } from '../../../components/ui/Card'
import { Label } from '../../../components/ui/Label'
import { Typography } from '../../../components/ui/Typography'
import { IconFolder } from '../../../components/ui/icons'

export const LabelIconPlacementExample = () => (
  <div className="w-full max-w-sm space-y-6">
    <Card>
      <CardContent>
        <Label icon={<IconFolder />} iconPosition="left" className="mb-2 cursor-default">
          Project overview
        </Label>
        <Typography as="p" variant="small">
          Keep your project notes, tasks, and updates together in one place.
        </Typography>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Label icon={<IconFolder />} iconPosition="top" className="mb-2 cursor-default">
          Project overview
        </Label>
        <Typography as="p" variant="small">
          Keep your project notes, tasks, and updates together in one place.
        </Typography>
      </CardContent>
    </Card>
  </div>
)
