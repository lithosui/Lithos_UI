/**
 * @fileoverview The live preview sandbox for the Theme Builder.
 * Renders various Lithos UI components (cards, inputs, badges) in a grid to demonstrate
 * how the current theme tokens apply to real-world UI elements.
 */
import React, { useState } from 'react'
import { Button, ButtonGroup } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Card, CardContent, CardTitle, CardDescription } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { Alert } from '../../../components/ui/Alert'
import { Accordion } from '../../../components/ui/Accordion'
import { AvatarGroup } from '../../../components/ui/Avatar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../../../components/ui/Breadcrumb'
import { Checkbox } from '../../../components/ui/Checkbox'
import { Toggle } from '../../../components/ui/Toggle'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../components/ui/Dialog'
import { KineticGrid } from '../../../components/ui/KineticGrid'
import { Popover, PopoverTrigger, PopoverContent } from '../../../components/ui/Popover'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../../components/ui/Tooltip'
import { CodeViewer } from '../../../components/ui/CodeViewer'
import { PropsTable } from '../../../components/ui/PropsTable'
import { PANEL } from '../utils/constants'
import { AccentColorProvider } from '../../../core/AccentColorProvider'
import { getContrastText } from '../../../utils/yiq'
import { useToast, ToastProvider } from '../../../components/ui/Toast'
import { IconHome } from '../../../components/ui/icons/IconHome'
import { IconMaximize } from '../../../components/ui/icons/IconMaximize'
import { IconMinimize } from '../../../components/ui/icons/IconMinimize'
import { IconChevronDown } from '../../../components/ui/icons/IconChevronDown'

const LandingPageContent = ({ style }: { style?: React.CSSProperties }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [yearlyBilling, setYearlyBilling] = useState(true)
  const [role, setRole] = useState('Developer')
  const [email, setEmail] = useState('')
  const [unlimited, setUnlimited] = useState(true)
  const [premium, setPremium] = useState(true)
  const [support, setSupport] = useState(false)
  const { addToast } = useToast()

  const handleSubscribe = () => {
    if (!email) return
    addToast({
      title: 'Subscribed',
      message: 'You have been added to the waitlist.',
      intent: 'accent',
    })
    setEmail('')
  }

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-[100] overflow-y-auto bg-(--lithos-bg) text-(--lithos-text)'
    : 'relative w-full overflow-x-hidden @container'

  return (
    <div className={containerClasses}>
      {/* Navbar */}
      <header className="px-4 @md:px-6 py-4 border-b border-(--lithos-border)/15 bg-(--lithos-surface) sticky top-0 z-40 shadow-sm w-full">
        <div className="flex flex-wrap items-center justify-between space-y-4 space-x-4">
          {/* 1. Logo (Always left) */}
          <div className="font-black tracking-tight text-xl shrink-0 order-1">LITHOS</div>

          {/* 2. Actions (Mobile: Top Right | Desktop: Far Right) */}
          <div className="flex items-center space-x-2 @md:space-x-4 shrink-0 order-2 @md:order-3">
            <Button
              variant="secondary"
              onClick={toggleFullscreen}
              className="p-2"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <IconMinimize size={16} /> : <IconMaximize size={16} />}
            </Button>
            <div>
              <Popover modal={false}>
                <PopoverTrigger asChild>
                  <Button variant="primary" className="whitespace-nowrap shrink-0 space-x-2">
                    Actions
                    <IconChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  portaled={false}
                  className="p-2 w-48 shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) theme-builder-floating"
                >
                  <ButtonGroup mode="vertical" className="w-full">
                    <Button variant="secondary" fullWidth className="hover:bg-(--lithos-accent) justify-start">
                      Settings
                    </Button>
                    <Button variant="secondary" fullWidth className="hover:bg-(--lithos-accent) justify-start">
                      Logout
                    </Button>
                  </ButtonGroup>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* 3. Breadcrumb (Mobile: Bottom Row Full Width | Desktop: Middle Flexible) */}
          <div className="order-3 @md:order-2 basis-full @md:basis-auto w-full @md:w-auto @md:flex-1 min-w-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center min-w-max py-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                      <IconHome className="mr-1.5 inline-block" strokeWidth="3" />
                      Home
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Platform</BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Features</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <KineticGrid
        baseOpacity="opacity-20"
        className="py-16 sm:py-24 md:py-32 border-b border-(--lithos-border)/15 w-full min-w-0"
      >
        <div className="w-full max-w-5xl mx-auto text-center px-4 sm:px-6 flex flex-col items-center space-y-6 sm:space-y-8">
          <div className="flex justify-center w-full min-w-0 px-2">
            <Alert intent="accent" size="sm" title="Lithos V2.0" className="text-left w-full sm:w-auto max-w-lg">
              <span className="text-(--lithos-muted)">
                Discover the new set of components in our brutalist design system.
              </span>
            </Alert>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black tracking-tight uppercase leading-[1.1] sm:leading-none w-full wrap-break-word">
            Build The Future <br className="hidden sm:block" />
            <span className="text-(--lithos-accent) drop-shadow-[3px_3px_0_var(--lithos-shadow)] sm:drop-shadow-[5px_5px_0_var(--lithos-shadow)] block sm:inline mt-2 sm:mt-0">
              Fast.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl opacity-75 font-medium max-w-2xl mx-auto font-body px-2">
            Without fighting your design system. Use the full suite of Lithos UI components to create brutalist,
            accessible, and stunning interfaces.
          </p>

          <div className="flex flex-wrap justify-center items-center -m-2 pt-4 w-full px-2 sm:px-4">
            <div className="p-2 w-full sm:w-auto flex">
              <Tooltip placement="top">
                <TooltipTrigger asChild>
                  <Button
                    variant="accent"
                    className="flex-1 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-bold shrink-0 whitespace-nowrap"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Explore Components
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="rounded-(--lithos-radius) theme-builder-floating">
                  Interactive Demo
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="p-2 w-full sm:w-auto flex">
              <Button
                variant="secondary"
                className="flex-1 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-bold shrink-0 whitespace-nowrap"
              >
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </KineticGrid>

      {/* Social Proof */}
      <section className="flex flex-col sm:flex-row flex-wrap justify-center items-center space-y-3 sm:space-x-4 sm:space-y-0 pt-4 w-full sm:w-auto px-2 sm:px-4">
        <span className="text-xs sm:text-sm font-bold text-(--lithos-muted) uppercase tracking-widest shrink-0">
          Trusted by builders
        </span>
        <div className="flex justify-end sm:justify-center items-center min-w-0 pr-2 pb-2 pt-2">
          <div className="flex shrink-0">
            <AvatarGroup
              size="md"
              items={[
                { alt: 'Alice Smith' },
                { alt: 'Bob Jones' },
                { alt: 'Charlie Brown' },
                { alt: 'David Lee' },
                { alt: 'Eve Torres' },
                { alt: 'Frank Wright' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 w-full max-w-7xl mx-auto flex flex-wrap space-x-12 lg:space-x-16 space-y-12 lg:space-y-16 min-w-0 justify-items-center">
        {/* Left Column: Component Demo */}
        <div className="flex flex-col space-y-8 flex-1 min-w-[280px] w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-black uppercase border-b-4 border-(--lithos-border) self-start pb-2">
            Component Demo
          </h2>
          <Tabs defaultValue="preview" variant="default" className="w-full min-w-0">
            <TabsList className="w-full flex-wrap space-x-2 sm:space-x-0 [&>*:not(:first-child)]:ml-0 sm:[&>*:not(:first-child)]:ml-4">
              <TabsTrigger value="preview" className="flex-1 sm:flex-none">
                Live Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1 sm:flex-none">
                Source Code
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="preview"
              className="bg-transparent outline-none shadow-transparent border-none w-full min-w-0 flex justify-center sm:justify-start pt-4"
            >
              <Card
                interactive
                className="w-full max-w-full sm:max-w-sm relative z-10 sm:rotate-1 sm:hover:rotate-0 transition-transform duration-300 shadow-[6px_6px_0_0_var(--lithos-shadow)] sm:shadow-[8px_8px_0_0_var(--lithos-shadow)] bg-(--lithos-surface) rounded-(--lithos-radius)"
              >
                <CardContent spacing="md" className="p-5">
                  <div className="flex flex-col space-y-4 mb-6 w-full">
                    <div className="flex justify-between items-center w-full">
                      <Badge
                        intent="accent"
                        className="font-black tracking-widest text-[10px] px-2 py-1 shadow-none border-[3px] border-(--lithos-border)"
                      >
                        OPEN SOURCE
                      </Badge>
                      <span className="text-[10px] font-black text-(--lithos-muted) uppercase tracking-widest block">
                        Forever
                      </span>
                    </div>
                    <div className="flex justify-between items-end w-full">
                      <CardTitle className="text-xl font-black uppercase tracking-tight truncate pr-2">
                        Lithos UI
                      </CardTitle>
                      <h2 className="text-4xl font-black leading-none tracking-tighter shrink-0">FREE</h2>
                    </div>
                  </div>

                  <CardDescription className="text-sm font-bold text-(--lithos-text) leading-relaxed">
                    Unleash the full power of neo-brutalism. Build bold, beautiful interfaces faster than ever.
                  </CardDescription>

                  <div className="flex flex-col space-y-4 pt-6 border-t-[3px] border-(--lithos-border) border-dashed mt-6 w-full">
                    <Checkbox
                      checked={unlimited}
                      onChange={(e) => setUnlimited(e.target.checked)}
                      label={
                        <span
                          className={`font-bold text-sm sm:text-base wrap-break-word ${!unlimited && 'text-(--lithos-muted)'}`}
                        >
                          Unlimited Components
                        </span>
                      }
                    />
                    <Checkbox
                      checked={premium}
                      onChange={(e) => setPremium(e.target.checked)}
                      label={
                        <span
                          className={`font-bold text-sm sm:text-base wrap-break-word ${!premium && 'text-(--lithos-muted)'}`}
                        >
                          Premium Themes
                        </span>
                      }
                    />
                    <Checkbox
                      checked={support}
                      onChange={(e) => setSupport(e.target.checked)}
                      label={
                        <span
                          className={`font-bold text-sm sm:text-base wrap-break-word ${!support && 'text-(--lithos-muted)'}`}
                        >
                          Dedicated Support
                        </span>
                      }
                    />
                  </div>

                  <div className="pt-8 w-full">
                    <Button
                      variant="primary"
                      fullWidth
                      className="group relative overflow-hidden text-base sm:text-lg font-black py-4 sm:py-6 border-[3px] border-(--lithos-border) rounded-(--lithos-radius)"
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block tracking-widest uppercase">
                        Start Building
                      </span>
                      <div className="absolute inset-0 bg-black/10 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="code"
              className="bg-transparent outline-none shadow-transparent border-none w-full min-w-0 pt-4"
            >
              <div className="w-full max-w-full overflow-hidden shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) border border-(--lithos-border)">
                <div className="w-full overflow-x-auto min-w-0">
                  <CodeViewer
                    language="tsx"
                    className="border-none shadow-none rounded-none w-full"
                    code={`<Card interactive className="w-full max-w-sm rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0_0_var(--lithos-shadow)]">
  <CardContent spacing="md" className="p-5">
    <div className="flex flex-col space-y-4 mb-6 w-full">
      <div className="flex justify-between items-center w-full">
        <Badge intent="accent" className="font-black tracking-widest text-[10px] px-2 py-1 shadow-none border-[3px]">
          OPEN SOURCE
        </Badge>
        <span className="text-[10px] font-black text-muted uppercase tracking-widest block">
          Forever
        </span>
      </div>
      <div className="flex justify-between items-end w-full">
        <CardTitle className="text-xl font-black uppercase tracking-tight pr-2">Lithos UI</CardTitle>
        <h2 className="text-4xl font-black leading-none tracking-tighter shrink-0">FREE</h2>
      </div>
    </div>

    <CardDescription className="text-sm font-bold leading-relaxed">
      Unleash the full power of neo-brutalism. Build bold, beautiful interfaces faster than ever.
    </CardDescription>

    <div className="space-y-4 pt-6 border-t-[3px] border-border border-dashed mt-6">
      <Checkbox checked={true} label={<span className="font-bold">Unlimited Components</span>} />
      <Checkbox checked={true} label={<span className="font-bold">Premium Themes</span>} />
      <Checkbox checked={false} label={<span className="font-bold text-muted">Dedicated Support</span>} />
    </div>

    <div className="pt-8">
      <Button variant="primary" fullWidth className="text-lg font-black py-6 border-[3px]">
        START BUILDING
      </Button>
    </div>
  </CardContent>
</Card>`}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Configuration Panel */}
        <div className="flex flex-col space-y-8 flex-1 min-w-[280px] w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-black uppercase border-b-4 border-(--lithos-border) self-start pb-2">
            Configuration
          </h2>
          <Card interactive className="w-full rounded-(--lithos-radius) shadow-[4px_4px_0_0_var(--lithos-shadow)]">
            <CardContent spacing="lg" className="p-6 sm:p-8">
              <CardTitle className="text-xl sm:text-2xl">System Settings</CardTitle>
              <CardDescription className="text-(--lithos-muted)">Interactive state demonstration.</CardDescription>

              <div className="flex flex-col space-y-6 mt-6 w-full min-w-0">
                <div className="flex flex-wrap items-center justify-between space-x-4 border-b border-(--lithos-border)/10 pb-4 w-full">
                  <span className="font-bold text-sm sm:text-base">Yearly Billing</span>
                  <div className="shrink-0">
                    <Toggle
                      checked={yearlyBilling}
                      onToggle={() => setYearlyBilling(!yearlyBilling)}
                      label="Toggle yearly billing"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-3 border-b border-(--lithos-border)/10 pb-4 w-full min-w-0">
                  <span className="font-bold text-sm sm:text-base block">Primary Role</span>
                  <div className="flex flex-wrap -m-1 w-full">
                    {['Developer', 'Designer', 'Manager'].map((r) => (
                      <div key={r} className="p-1 flex-1 sm:flex-none">
                        <Button
                          variant={role === r ? 'primary' : 'secondary'}
                          onClick={() => setRole(r)}
                          className="w-full text-xs sm:text-sm py-2 px-4 rounded-(--lithos-radius)"
                        >
                          {r}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 w-full">
                  <Checkbox
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    label={<span className="text-sm sm:text-base">Subscribe to newsletter</span>}
                    description={
                      <span className="text-xs sm:text-sm text-(--lithos-muted)">
                        Get the latest updates from Lithos UI.
                      </span>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Docs / API Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-(--lithos-surface) border-y border-(--lithos-border)/15 w-full min-w-0">
        <div className="w-full max-w-5xl mx-auto flex flex-col space-y-8 sm:space-y-12 min-w-0">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-center w-full">Extensive API</h2>

          <div className="w-full bg-(--lithos-bg) rounded-(--lithos-radius) border border-(--lithos-border) overflow-hidden shadow-[4px_4px_0_0_var(--lithos-shadow)]">
            <div className="w-full overflow-x-auto min-w-0 p-4 sm:p-6">
              <PropsTable
                data={[
                  {
                    name: 'variant',
                    type: "'primary' | 'secondary'",
                    defaultValue: "'primary'",
                    description: 'The visual style variant of the component.',
                  },
                  {
                    name: 'intent',
                    type: "'default' | 'accent' | 'error'",
                    defaultValue: "'default'",
                    description: 'Contextual color intent.',
                  },
                  {
                    name: 'disabled',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Prevents user interaction.',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-center mb-8 sm:mb-12">FAQ</h2>
        <div className="flex flex-col space-y-4 w-full min-w-0">
          <Accordion title="Is this free to use?">
            <p className="p-4 m-0 font-body text-sm sm:text-base text-(--lithos-text)">
              Yes, Lithos UI is completely open-source and free to use in your projects.
            </p>
          </Accordion>
          <Accordion title="How do I customize the theme?">
            <p className="p-4 m-0 font-body text-sm sm:text-base text-(--lithos-text)">
              Use the Theme Builder to adjust colors, radii, and mode, then export the JSON configuration directly into
              your codebase.
            </p>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-(--lithos-accent) text-(--lithos-bg) text-center border-t border-(--lithos-border)/15 w-full min-w-0">
        <div className="w-full max-w-3xl mx-auto flex flex-col space-y-8 min-w-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight">
            Ready to Start?
          </h2>

          <div
            className={`${PANEL} p-4 sm:p-6 flex flex-wrap -m-2 bg-(--lithos-surface) text-(--lithos-text) w-full rounded-(--lithos-radius) shadow-[6px_6px_0_0_var(--lithos-shadow)] justify-start`}
          >
            <div className="p-2 flex-auto min-w-[250px]">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full min-w-0 rounded-(--lithos-radius)"
              />
            </div>
            <div className="p-2 flex-auto min-w-[150px]">
              <Button
                variant="primary"
                onClick={handleSubscribe}
                fullWidth
                className="px-8 py-3 font-bold rounded-(--lithos-radius)"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog overlay */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        size="md"
        style={style}
        className="theme-builder-floating"
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-black uppercase">Terms of Service</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="mb-4 text-sm sm:text-base text-(--lithos-text)">
            By proceeding, you agree to the Lithos UI terms of service and privacy policy.
          </p>
          <p className="font-bold text-sm sm:text-base text-(--lithos-text)">
            Are you ready to create something amazing?
          </p>
        </DialogBody>
        <DialogFooter className="flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0">
          <Button
            variant="text"
            onClick={() => setIsDialogOpen(false)}
            className="w-full sm:w-auto rounded-(--lithos-radius)"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsDialogOpen(false)}
            className="w-full sm:w-auto rounded-(--lithos-radius)"
          >
            Accept
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export const SpecimenGrid = ({ style, accentColor }: { style: React.CSSProperties; accentColor?: string }) => {
  const currentAccent = accentColor || '#00FF00'
  const accentText = getContrastText(currentAccent)

  const cssOverrides = Object.entries(style)
    .map(([key, value]) => `${key}: ${value} !important;`)
    .join('\n        ')

  return (
    <div
      id="specimen-grid-container"
      className="rounded-none overflow-hidden overflow-y-auto overflow-x-hidden bg-(--lithos-bg) text-(--lithos-text) h-full w-full min-w-0"
      style={style}
    >
      <style>{`
        #specimen-grid-container,
        #specimen-grid-container *,
        .theme-builder-floating,
        .theme-builder-floating * {
          ${cssOverrides}
          --lithos-accent-text: ${accentText} !important;
        }
      `}</style>
      <ToastProvider className="theme-builder-floating !z-[150]">
        <AccentColorProvider color={currentAccent}>
          <LandingPageContent style={{ ...style, '--lithos-accent-text': accentText } as React.CSSProperties} />
        </AccentColorProvider>
      </ToastProvider>
    </div>
  )
}
