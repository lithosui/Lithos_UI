import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { Toggle } from '../components/ui/Toggle'
import { KineticGrid } from '../components/ui/KineticGrid'
import { ToastItem } from '../components/ui/Toast'
import { Button } from '../components/ui/Button'
import { Card, CardImage, CardContent } from '../components/ui/Card'
import { useLithosTheme } from '../core/useLithosTheme'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { Alert } from '../components/ui/Alert'
import { Accordion } from '../components/ui/Accordion'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Calendar } from '../components/ui/Calendar'
import { Carousel, CarouselSlide } from '../components/ui/Carousel'
import { Checkbox } from '../components/ui/Checkbox'
import { IconClose } from '../components/ui/icons/IconClose'

interface ComponentsIndexProps {
  isDarkMode: boolean
  toggleObsidian: () => void
}

const TogglePreview = () => {
  const [on, setOn] = useState(true)
  return <Toggle checked={on} onToggle={() => setOn(!on)} />
}

const ToastPreview = () => {
  const { accentColor } = useLithosTheme()
  return (
    <div className="w-[120%] scale-[0.7] origin-center pointer-events-none mt-6">
      <ToastItem
        toast={{ id: 'prev-toast', message: 'Yummy toast', intent: 'success', color: accentColor, title: 'SUCCESS' }}
        onRemove={() => {}}
      />
    </div>
  )
}

const AlertPreview = () => {
  const { accentColor } = useLithosTheme()
  return (
    <div className="w-[140%] scale-[0.55] origin-center pointer-events-none">
      <Alert color={accentColor} title="Notice">
        Structural review pending.
      </Alert>
    </div>
  )
}

const CarouselPreview = () => {
  const slideClass = 'h-[4rem] flex items-center justify-center font-black text-sm'

  return (
    <Carousel title="LITHOS UI!" hideControls hidePagination playInfinite playInterval={3000}>
      <CarouselSlide className={slideClass}>Slide 1</CarouselSlide>
      <CarouselSlide className={slideClass}>Slide 2</CarouselSlide>
      <CarouselSlide className={slideClass}>Slide 3</CarouselSlide>
    </Carousel>
  )
}

const DialogPreview = () => (
  <div className="w-[130%] scale-[0.45] origin-center pointer-events-none border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[6px_6px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
    <div className="flex items-center justify-between p-4 border-b-2 border-(--lithos-border)">
      <p className="font-black uppercase tracking-tight leading-none m-0 text-lg">Confirm</p>
      <IconClose aria-hidden="true" className="w-4 h-4" />
    </div>
    <div className="p-4 font-body text-sm opacity-70">Delete this item?</div>
    <div className="flex items-center justify-end p-4 border-t-2 border-(--lithos-border)">
      <Button className="text-sm">Delete</Button>
    </div>
  </div>
)

const componentsList = [
  {
    name: 'Alert',
    to: '/docs/alert',
    preview: <AlertPreview />,
  },
  {
    name: 'Avatar',
    to: '/docs/avatar',
    preview: <Avatar variant="solid" alt="Jane Doe" />,
  },
  {
    name: 'Accordion',
    to: '/docs/accordion',
    preview: (
      <Accordion
        title="Is this product free?"
        classes={{ container: 'min-w-20', header: 'text-sm', content: 'text-xs' }}
      >
        Yeah! This product is 100% free.
      </Accordion>
    ),
  },
  {
    name: 'Badge',
    to: '/docs/badge',
    preview: (
      <Badge intent="accent" size="md">
        Feature
      </Badge>
    ),
  },
  {
    name: 'Breadcrumb',
    to: '/docs/breadcrumb',
    preview: (
      <div className="scale-[0.75] origin-center">
        <Breadcrumb
          items={[
            { label: 'Home', href: '#' },
            { label: 'Docs', active: true },
          ]}
        />
      </div>
    ),
  },
  {
    name: 'Button',
    to: '/docs/button',
    preview: <Button className="cursor-pointer">Button</Button>,
  },
  {
    name: 'Calendar',
    to: '/docs/calendar',
    preview: <Calendar className="pointer-events-none scale-[0.32] origin-center" />,
  },
  {
    name: 'Card',
    to: '/docs/card',
    preview: (
      <Card
        variant="accent"
        className="pointer-events-none w-32 group-hover/link:bg-(--lithos-accent) group-hover/link:text-(--lithos-accent-text) transition-colors"
      >
        <CardImage src="https://picsum.photos/600/400?1" alt="Preview" className="h-16!" />
        <CardContent className="p-2">
          <p className="font-black uppercase text-[10px] tracking-tight leading-none mb-1">Accent Card</p>
          <p className="font-body opacity-70 text-[8px] leading-tight">Hover to see fill.</p>
        </CardContent>
      </Card>
    ),
  },
  {
    name: 'Carousel',
    to: '/docs/carousel',
    preview: <CarouselPreview />,
  },
  {
    name: 'Checkbox',
    to: '/docs/checkbox',
    preview: (
      <div className="flex flex-col items-start [&>*:not(:first-child)]:mt-2 pointer-events-none">
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Unchecked" />
      </div>
    ),
  },
  {
    name: 'Dialog',
    to: '/docs/dialog',
    preview: <DialogPreview />,
  },
  {
    name: 'Toast',
    to: '/docs/toast',
    preview: <ToastPreview />,
  },
  {
    name: 'Toggle',
    to: '/docs/toggle',
    preview: <TogglePreview />,
  },
]

export const ComponentsIndex = ({ isDarkMode, toggleObsidian }: ComponentsIndexProps) => (
  <>
    <Navbar isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
    <main className="pt-24 min-h-screen bg-(--lithos-bg) text-(--lithos-text)">
      <section className="border-b-2 border-(--lithos-border) bg-(--lithos-bg)">
        <KineticGrid baseOpacity="opacity-10" className="py-12 md:py-24 w-full">
          <div className="mx-auto max-w-7xl px-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
            <div className="w-full text-center lg:text-left flex flex-col items-center lg:items-start">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-(--lithos-text) opacity-60">
                EVERY PRIMITIVE. ONE SOURCE.
              </p>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
                THE PARTS THAT <br /> DON'T BREAK
              </h1>
              <h2 className="mt-4 text-3xl sm:text-4xl font-display md:text-5xl italic text-(--lithos-accent) max-w-4xl mx-auto lg:mx-0">
                Every primitive is built with strict adherence to structural integrity.
              </h2>
            </div>
          </div>
        </KineticGrid>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap -m-3">
            {componentsList.map((comp) => (
              <div key={comp.name} className="w-full sm:w-[50%] md:w-[33.333%] lg:w-[25%] p-3">
                <Link to={comp.to} className="block group/link h-full outline-none">
                  <Card interactive className="h-full flex flex-col p-0">
                    {/* Top Zone: Live Preview */}
                    <div className="w-full aspect-4/3 sm:aspect-3/2 md:aspect-video flex items-center justify-center bg-(--lithos-surface) p-2 overflow-hidden relative border-b-2 border-(--lithos-border) font-normal tracking-normal leading-normal">
                      {comp.preview}
                    </div>

                    {/* Bottom Zone: Thin Label Strip */}
                    <CardContent spacing="sm" className="grow flex flex-col justify-center">
                      <h2 className="text-xl font-black tracking-tighter leading-none text-(--lithos-text)">
                        {comp.name}
                      </h2>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <div className="mt-24">
      <Footer />
    </div>
  </>
)
