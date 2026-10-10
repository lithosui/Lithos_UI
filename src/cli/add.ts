import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { registry, type RegistryItem } from './registry.js'
import {
  getConfig,
  fetchFile,
  getLocalDestination,
  rewriteImports,
  ensureDir,
  getProjectRoot,
  promptUser,
  installDependencies,
} from './utils.js'
import { init } from './init.js'

const getAllRequires = (item: RegistryItem): { files: string[]; npmDeps: string[] } => {
  const visited = new Set<string>()
  const deps = new Set<string>()
  const npmDeps = new Set<string>()

  const traverse = (currentItem: RegistryItem) => {
    if (visited.has(currentItem.slug)) return
    visited.add(currentItem.slug)

    if (currentItem.dependencies) {
      for (const d of currentItem.dependencies) {
        npmDeps.add(d)
      }
    }

    for (const req of currentItem.requires) {
      deps.add(req)

      // Auto-inject IconBase for any icon dependency
      if (req.includes('components/ui/icons/') && req !== 'components/ui/icons/IconBase.tsx') {
        deps.add('components/ui/icons/IconBase.tsx')
      }

      // Auto-inject AccentColorContext if useAccentColor is required
      if (req === 'core/useAccentColor.tsx' || req === 'core/useAccentColor.ts') {
        deps.add('core/AccentColorContext.ts')
      }

      // If this required file is itself a registered component, fetch its requires too
      const matchedComp = Object.values(registry).find((comp) => comp.githubUrl.endsWith('/' + req))
      if (matchedComp) {
        traverse(matchedComp)
      }
    }
  }

  traverse(item)
  return { files: Array.from(deps), npmDeps: Array.from(npmDeps) }
}

export const add = async (components: string[]) => {
  if (!components || components.length === 0) {
    console.error('✖ Please specify a component to add.')
    process.exit(1)
  }

  const root = getProjectRoot()
  const configPath = path.join(root, 'lithos.json')
  if (!fs.existsSync(configPath)) {
    console.log('\\ni lithos.json not found. Initializing automatically...')
    await init()
  }

  const config = getConfig()

  for (const compName of components) {
    const item = registry[compName]
    if (!item) {
      console.error(`✖ Component '${compName}' not found.`)
      console.log('\\nAvailable components:')
      Object.keys(registry).forEach((k) => console.log(`- ${k}`))
      continue
    }

    console.log(`\\nAdding ${item.name}...`)

    // We need to download the component itself, PLUS all transitive dependencies.
    const { files: allRequires, npmDeps } = getAllRequires(item)
    const filesToDownload = [
      {
        url: item.githubUrl,
        repoPath: item.githubUrl.split('/main/src/')[1]!,
        requires: allRequires, // Provide full flat requires for import rewriting
      },
    ]

    for (const req of allRequires) {
      if (req.endsWith('.ts') || req.endsWith('.tsx')) {
        filesToDownload.push({
          url: `https://raw.githubusercontent.com/lithosui/Lithos_UI/main/src/${req}`,
          repoPath: req,
          requires: allRequires, // All files share the same flat requires list for rewriting context
        })
      }
    }

    // Handle third-party dependencies
    if (npmDeps.length > 0) {
      const pkgPath = path.join(root, 'package.json')
      let installedDeps: Record<string, string> = {}
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
        installedDeps = { ...pkg.dependencies, ...pkg.devDependencies }
      }

      const missingDeps = npmDeps.filter((d) => !installedDeps[d])

      if (missingDeps.length > 0) {
        console.log(`\\nThis component requires the following packages to function:`)
        missingDeps.forEach((d) => console.log(` - ${d}`))
        const install = await promptUser('Would you like to install them now? (Y/n) ')
        if (install) {
          installDependencies(missingDeps)
        }
      }
    }

    // Download and write
    for (const file of filesToDownload) {
      try {
        const dest = getLocalDestination(file.repoPath, config)
        if (fs.existsSync(dest)) {
          console.log(`i ${file.repoPath} already exists. Skipping.`)
          continue
        }

        const content = await fetchFile(file.url)
        const rewritten = rewriteImports(content, file.repoPath, file.requires, config)

        ensureDir(dest)
        fs.writeFileSync(dest, rewritten)
        console.log(`✓ Created ${path.relative(root, dest)}`)
      } catch (e: unknown) {
        console.error(`✖ Error processing ${file.repoPath}:`, (e as Error).message)
      }
    }
  }
}
