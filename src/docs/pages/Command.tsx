import { useState, useEffect } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandItemDescription,
  CommandShortcut,
  CommandBadge,
  CommandSeparator,
  CommandFooter,
  CommandDialog,
} from '../../components/ui/Command'
import { PropsAccordion } from '../../components/ui/PropsTable'
import {
  commandPropsData,
  commandInputPropsData,
  commandItemPropsData,
  commandGroupPropsData,
  commandDialogPropsData,
} from '../propsData/command'
import { SetupGuide } from '../layout/SetupGuide'
import { IconSettings } from '../../components/ui/icons/IconSettings'
import { IconFileText } from '../../components/ui/icons/IconFileText'
import { IconSearch } from '../../components/ui/icons/IconSearch'
import { IconFolder } from '../../components/ui/icons/IconFolder'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Command.tsx'

export const CommandDoc = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  // Global ⌘K / Ctrl+K keyboard shortcut listener for demonstration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpenDialog((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const basicCode = {
    body: `export const BasicCommand = () => {
  return (
    <Command className="max-w-md mx-auto">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => alert('Create Document')}>
            <IconFileText className="mr-2 shrink-0" />
            <div className="flex flex-col">
              <span>Create Document</span>
              <CommandItemDescription>Start a new markdown draft</CommandItemDescription>
            </div>
            <CommandBadge intent="accent" size="sm" className="ml-2">New</CommandBadge>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => alert('Open Folder')}>
            <IconFolder className="mr-2 shrink-0" />
            <div className="flex flex-col">
              <span>Open Folder</span>
              <CommandItemDescription>Browse workspace directories</CommandItemDescription>
            </div>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Preferences & Tools">
          <CommandItem onSelect={() => alert('Search Project')}>
            <IconSearch className="mr-2 shrink-0" />
            <div className="flex flex-col">
              <span>Search Project</span>
              <CommandItemDescription>Full-text symbol and file search</CommandItemDescription>
            </div>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => alert('Settings')}>
            <IconSettings className="mr-2 shrink-0" />
            <div className="flex flex-col">
              <span>Settings</span>
              <CommandItemDescription>Manage theme and editor options</CommandItemDescription>
            </div>
            <CommandBadge size="sm" className="ml-2">Config</CommandBadge>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <CommandFooter />
    </Command>
  )
}`,
    componentNames: [
      'Command',
      'CommandInput',
      'CommandList',
      'CommandEmpty',
      'CommandGroup',
      'CommandItem',
      'CommandItemDescription',
      'CommandBadge',
      'CommandShortcut',
      'CommandSeparator',
      'CommandFooter',
    ],
    manualPath: { Command: '../../components/ui/Command' },
  }

  const shortcutsCode = {
    body: `export const ShortcutsCommand = () => {
  return (
    <Command className="max-w-md mx-auto">
      <CommandInput placeholder="Search actions or files..." />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => alert('New File')}>
            <IconFileText className="mr-2" />
            <span>New Document</span>
            <CommandBadge intent="accent" size="sm" className="ml-2">Pro</CommandBadge>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => alert('Open Folder')}>
            <IconFolder className="mr-2" />
            <span>Open Folder</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="System">
          <CommandItem onSelect={() => alert('Search')}>
            <IconSearch className="mr-2" />
            <span>Global Search</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => alert('Preferences')}>
            <IconSettings className="mr-2" />
            <span>Preferences</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
    componentNames: [
      'Command',
      'CommandInput',
      'CommandList',
      'CommandEmpty',
      'CommandGroup',
      'CommandItem',
      'CommandShortcut',
      'CommandBadge',
      'CommandSeparator',
    ],
    manualPath: { Command: '../../components/ui/Command' },
  }

  const dialogCode = {
    body: `export const DialogCommand = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Command Palette (⌘K)
      </Button>

      <CommandDialog open={open} onClose={() => setOpen(false)}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No matching results.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>Documentation</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Component Library</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>GitHub Repository</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}`,
    componentNames: [
      'Command',
      'CommandDialog',
      'CommandInput',
      'CommandList',
      'CommandEmpty',
      'CommandGroup',
      'CommandItem',
    ],
    manualPath: { Command: '../../components/ui/Command' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Command
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A keyboard-driven command palette for ⌘K menus, global search, and quick actions with strict neo-brutalist
          styling.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Built with <strong>zero external dependencies</strong>, the Command palette provides client-side fuzzy
          searching, seamless keyboard navigation (<kbd>↑</kbd>, <kbd>↓</kbd>, <kbd>Enter</kbd>), and standalone or
          modal dialog modes.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        slug="command"
        componentNames={[
          'Command',
          'CommandInput',
          'CommandList',
          'CommandEmpty',
          'CommandLoading',
          'CommandGroup',
          'CommandItem',
          'CommandItemDescription',
          'CommandShortcut',
          'CommandBadge',
          'CommandSeparator',
          'CommandFooter',
          'CommandDialog',
        ]}
        manualPath="../../components/ui/Command"
        requires={[
          'utils/cn.ts',
          'components/ui/Dialog.tsx',
          'components/ui/Kbd.tsx',
          'components/ui/Badge.tsx',
          'components/ui/icons/IconSearch.tsx',
          'components/ui/icons/IconClose.tsx',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      {/* Basic Example */}
      <h3 id="basic" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Basic
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Inline command menu with search filtering, item groups, and automatic empty states. Try typing &quot;cal&quot;
        or &quot;sett&quot; in the search box.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={basicCode} githubUrl={githubUrl}>
          <div className="w-full max-w-md mx-auto">
            <Command className="w-full">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Quick Actions">
                  <CommandItem
                    value="Create Document"
                    keywords={['new', 'draft', 'markdown']}
                    onSelect={(val) => setSelectedAction(`Executed: ${val}`)}
                  >
                    <span className="inline-flex mr-2 shrink-0">
                      <IconFileText size={16} />
                    </span>
                    <div className="flex flex-col">
                      <span>Create Document</span>
                      <CommandItemDescription>Start a new markdown draft</CommandItemDescription>
                    </div>
                    <CommandBadge intent="accent" size="sm" className="ml-2">
                      New
                    </CommandBadge>
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem
                    value="Open Folder"
                    keywords={['directory', 'workspace', 'browse']}
                    onSelect={(val) => setSelectedAction(`Executed: ${val}`)}
                  >
                    <span className="inline-flex mr-2 shrink-0">
                      <IconFolder size={16} />
                    </span>
                    <div className="flex flex-col">
                      <span>Open Folder</span>
                      <CommandItemDescription>Browse workspace directories</CommandItemDescription>
                    </div>
                    <CommandShortcut>⌘O</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Preferences & Tools">
                  <CommandItem
                    value="Search Project"
                    keywords={['find', 'grep', 'files']}
                    onSelect={(val) => setSelectedAction(`Executed: ${val}`)}
                  >
                    <span className="inline-flex mr-2 shrink-0">
                      <IconSearch size={16} />
                    </span>
                    <div className="flex flex-col">
                      <span>Search Project</span>
                      <CommandItemDescription>Full-text symbol and file search</CommandItemDescription>
                    </div>
                    <CommandShortcut>⌘F</CommandShortcut>
                  </CommandItem>
                  <CommandItem
                    value="Settings"
                    keywords={['preferences', 'theme', 'config']}
                    onSelect={(val) => setSelectedAction(`Executed: ${val}`)}
                  >
                    <span className="inline-flex mr-2 shrink-0">
                      <IconSettings size={16} />
                    </span>
                    <div className="flex flex-col">
                      <span>Settings</span>
                      <CommandItemDescription>Manage theme and editor options</CommandItemDescription>
                    </div>
                    <CommandBadge size="sm" className="ml-2">
                      Config
                    </CommandBadge>
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
              <CommandFooter />
            </Command>
            {selectedAction && (
              <p className="mt-3 text-center text-xs font-mono font-bold opacity-75">{selectedAction}</p>
            )}
          </div>
        </PreviewBlock>
      </div>

      {/* Shortcuts Example */}
      <h3 id="shortcuts" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        With Shortcuts and Icons
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Items can be enriched with icons and right-aligned keyboard shortcut badges.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={shortcutsCode} githubUrl={githubUrl}>
          <div className="w-full max-w-md mx-auto">
            <Command className="w-full">
              <CommandInput placeholder="Search actions or files..." />
              <CommandList>
                <CommandEmpty>No actions found.</CommandEmpty>
                <CommandGroup heading="Quick Actions">
                  <CommandItem onSelect={(val) => setSelectedAction(`Executed: ${val}`)}>
                    <span className="inline-flex mr-2 shrink-0">
                      <IconFileText size={16} />
                    </span>
                    <span>New Document</span>
                    <CommandBadge intent="accent" size="sm" className="ml-2">
                      Pro
                    </CommandBadge>
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={(val) => setSelectedAction(`Executed: ${val}`)}>
                    <span className="inline-flex mr-2 shrink-0">
                      <IconFolder size={16} />
                    </span>
                    <div className="flex flex-col">
                      <span>Open Folder</span>
                      <CommandItemDescription>Browse local directory</CommandItemDescription>
                    </div>
                    <CommandShortcut>⌘O</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="System">
                  <CommandItem onSelect={(val) => setSelectedAction(`Executed: ${val}`)}>
                    <span className="inline-flex mr-2 shrink-0">
                      <IconSearch size={16} />
                    </span>
                    <span>Global Search</span>
                    <CommandShortcut>⌘F</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={(val) => setSelectedAction(`Executed: ${val}`)}>
                    <span className="inline-flex mr-2 shrink-0">
                      <IconSettings size={16} />
                    </span>
                    <span>Preferences</span>
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </PreviewBlock>
      </div>

      {/* Dialog Example */}
      <h3 id="dialog" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Command Dialog (⌘K Palette)
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Modal command palette that opens over the application with backdrop blur, focus trapping, and <kbd>Escape</kbd>{' '}
        dismissal.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={dialogCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center justify-center p-6">
            <Button onClick={() => setOpenDialog(true)}>
              Open Command Palette <CommandShortcut className="ml-2">⌘K</CommandShortcut>
            </Button>
            <p className="mt-3 text-xs opacity-60 font-mono">Or press ⌘K / Ctrl+K on your keyboard</p>

            <CommandDialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <Command>
                <CommandInput placeholder="Search documentation or components..." />
                <CommandList>
                  <CommandEmpty>No matches found.</CommandEmpty>
                  <CommandGroup heading="Navigation">
                    <CommandItem onSelect={() => setOpenDialog(false)}>
                      <span className="inline-flex mr-2 shrink-0">
                        <IconFileText size={16} />
                      </span>
                      <span>Introduction</span>
                    </CommandItem>
                    <CommandItem onSelect={() => setOpenDialog(false)}>
                      <span className="inline-flex mr-2 shrink-0">
                        <IconFolder size={16} />
                      </span>
                      <span>Components Gallery</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Theme Settings">
                    <CommandItem onSelect={() => setOpenDialog(false)}>
                      <span className="inline-flex mr-2 shrink-0">
                        <IconSettings size={16} />
                      </span>
                      <span>Toggle Dark / Obsidian Mode</span>
                      <CommandShortcut>⌘D</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
          </div>
        </PreviewBlock>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Command>
  <CommandInput />
  <CommandList>
    <CommandLoading />
    <CommandEmpty />
    <CommandGroup>
      <CommandItem>
        <CommandItemDescription />
        <CommandBadge />
        <CommandShortcut />
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
  <CommandFooter />
</Command>`}
        />
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2">
          <li>
            Follows WAI-ARIA combobox patterns with roles <code>application</code>, <code>combobox</code>,{' '}
            <code>listbox</code>, and <code>option</code>.
          </li>
          <li>
            Active item is indicated via both <code>aria-selected</code> and <code>data-selected</code> attributes.
          </li>
          <li>
            Supports full keyboard navigation: <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> to cycle items, <kbd>Home</kbd>{' '}
            / <kbd>End</kbd> to jump to boundaries, and <kbd>Enter</kbd> to trigger selection.
          </li>
          <li>
            Disabled items automatically receive <code>aria-disabled</code> and are skipped during keyboard traversal.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Command Props" data={commandPropsData} />
        <PropsAccordion title="CommandInput Props" data={commandInputPropsData} />
        <PropsAccordion title="CommandItem Props" data={commandItemPropsData} />
        <PropsAccordion title="CommandGroup Props" data={commandGroupPropsData} />
        <PropsAccordion title="CommandDialog Props" data={commandDialogPropsData} />
      </section>
    </div>
  )
}
