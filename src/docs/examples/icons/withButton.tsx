import { Button } from '../../../components/ui/Button'
import { IconDownload } from '../../../components/ui/icons/IconDownload'
import { IconExternalLink } from '../../../components/ui/icons/IconExternalLink'
import { IconTrash } from '../../../components/ui/icons/IconTrash'

export const WithButtonExample = () => {
  return (
    <div className="flex flex-wrap items-center space-x-4">
      <Button variant="primary" iconLeft={<IconDownload size={16} />}>
        Download
      </Button>
      <Button variant="secondary" iconRight={<IconExternalLink size={16} />}>
        Visit Docs
      </Button>
      <Button variant="accent" iconLeft={<IconTrash size={16} />}>
        Delete
      </Button>
    </div>
  )
}
