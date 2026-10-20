import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '../../')
const SRC_DIR = path.join(ROOT_DIR, 'src')
const UI_DIR = path.join(SRC_DIR, 'components', 'ui')
const BLOCKS_DIR = path.join(SRC_DIR, 'components', 'blocks')
const TEMPLATES_DIR = path.join(SRC_DIR, 'components', 'templates')
const REGISTRY_OUT = path.join(SRC_DIR, 'cli', 'registry.ts')

export interface RegistryItem {
  slug: string
  name: string
  type: 'ui' | 'block' | 'template'
  githubUrl: string
  requires: string[]
  dependencies?: string[]
}

const CUSTOM_NAMES: Record<string, string> = {
  // UI Custom Names
  'code-viewer': 'Code Viewer',
  'kinetic-grid': 'Kinetic Grid',
  'preview-block': 'Preview Block',
  'props-table': 'Props Table',
  // Blocks
  'faq-1': 'Standard FAQ',
  'feature-grid-1': 'Classic Grid',
  'feature-grids-1': 'Classic Grid',
  'footer-1': 'Multi-column Footer',
  'footer-2': 'Minimal Footer',
  'hero-1': 'Standard Hero',
  'hero-2': 'Split Layout Hero',
  'navbar-1': 'Standard Navbar',
  'pricing-1': '3-Tier Grid',
  'testimonials-1': 'Standard Grid',
  // Templates
  'landing-1': 'SaaS Standard Landing Page',
}

const EXCLUDED_UI = new Set(['PreviewBlock', 'PropsTable', 'CodeViewer'])

const EXTENSIONS = ['', '.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.js']

const resolveRelativeFile = (fromDir: string, specifier: string): string | null => {
  const basePath = path.resolve(fromDir, specifier)
  for (const ext of EXTENSIONS) {
    const candidate = basePath + ext
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate
    }
  }
  return null
}

const IGNORED_PACKAGES = new Set([
  'react',
  'react-dom',
  'react/jsx-runtime',
  'node:fs',
  'node:path',
  'node:process',
  'node:readline',
  'node:child_process',
  'node:url',
  'fs',
  'path',
  'process',
])

const extractPackageName = (specifier: string): string | null => {
  if (specifier.startsWith('.') || specifier.startsWith('/') || specifier.startsWith('node:')) {
    return null
  }

  let pkgName = specifier
  if (specifier.startsWith('@')) {
    const parts = specifier.split('/')
    if (parts.length >= 2 && parts[0] && parts[1]) {
      pkgName = `${parts[0]}/${parts[1]}`
    }
  } else {
    pkgName = specifier.split('/')[0] ?? specifier
  }

  if (IGNORED_PACKAGES.has(pkgName) || IGNORED_PACKAGES.has(specifier)) {
    return null
  }

  return pkgName
}

interface ParsedImports {
  relativeImports: string[]
  npmDependencies: string[]
}

const parseImports = (filePath: string): ParsedImports => {
  if (!fs.existsSync(filePath)) {
    return { relativeImports: [], npmDependencies: [] }
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const relativeImports = new Set<string>()
  const npmDependencies = new Set<string>()

  // Matches import/export statements
  const importRegex = /(?:import|export)\s+(?:(?:(?:type\s+)?[\s\w*{}as,]+from\s+)?['"]([^'"]+)['"]|['"]([^'"]+)['"])/g
  const dynamicImportRegex = /import\(\s*['"]([^'"]+)['"]\s*\)/g

  const matches: string[] = []
  let match: RegExpExecArray | null

  while ((match = importRegex.exec(content)) !== null) {
    const spec = match[1] || match[2]
    if (spec) matches.push(spec)
  }

  while ((match = dynamicImportRegex.exec(content)) !== null) {
    if (match[1]) matches.push(match[1])
  }

  for (let specifier of matches) {
    if (specifier.includes('?')) {
      specifier = specifier.split('?')[0] ?? specifier
    }

    if (specifier.startsWith('.')) {
      const fileDir = path.dirname(filePath)
      const resolved = resolveRelativeFile(fileDir, specifier)
      if (resolved) {
        const relToSrc = path.relative(SRC_DIR, resolved).replace(/\\/g, '/')
        relativeImports.add(relToSrc)
      } else {
        console.warn(`[build-registry] Unable to resolve relative import: "${specifier}" in ${filePath}`)
      }
    } else {
      const pkg = extractPackageName(specifier)
      if (pkg) {
        npmDependencies.add(pkg)
      }
    }
  }

  return {
    relativeImports: Array.from(relativeImports),
    npmDependencies: Array.from(npmDependencies),
  }
}

const getCompanionFiles = (dirPath: string): string[] => {
  const results: string[] = []
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return results
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      results.push(...getCompanionFiles(fullPath))
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      const relToSrc = path.relative(SRC_DIR, fullPath).replace(/\\/g, '/')
      results.push(relToSrc)
    }
  }
  return results
}

const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

const toDisplayName = (slug: string, rawName: string): string => {
  if (CUSTOM_NAMES[slug]) return CUSTOM_NAMES[slug]
  return rawName.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

interface ComponentTarget {
  slug: string
  name: string
  type: 'ui' | 'block' | 'template'
  primaryFile: string
  seedFiles: string[]
}

const discoverTargets = (): ComponentTarget[] => {
  const targets: ComponentTarget[] = []

  // 1. UI Components
  if (fs.existsSync(UI_DIR)) {
    const entries = fs.readdirSync(UI_DIR, { withFileTypes: true })
    const fileEntries = entries.filter((e) => e.isFile() && /\.(tsx?|jsx?)$/.test(e.name))

    for (const fileEntry of fileEntries) {
      const parsed = path.parse(fileEntry.name)
      const baseName = parsed.name
      if (EXCLUDED_UI.has(baseName)) continue

      const slug = toKebabCase(baseName)
      const name = toDisplayName(slug, baseName)

      // Check for companion directory (e.g. drawer/, select/, popover/)
      const companionDir = path.join(UI_DIR, slug)
      const primaryFile = `components/ui/${fileEntry.name}`
      const seedFiles: string[] = [primaryFile]

      if (fs.existsSync(companionDir) && fs.statSync(companionDir).isDirectory()) {
        const compFiles = getCompanionFiles(companionDir)
        seedFiles.push(...compFiles)
      }

      targets.push({
        slug,
        name,
        type: 'ui',
        primaryFile,
        seedFiles,
      })
    }

    // Special case: icons directory -> 'icons' slug pointing to IconBase.tsx
    const iconsDir = path.join(UI_DIR, 'icons')
    if (fs.existsSync(iconsDir) && fs.statSync(iconsDir).isDirectory()) {
      const iconBasePath = path.join(iconsDir, 'IconBase.tsx')
      if (fs.existsSync(iconBasePath)) {
        const iconFiles = getCompanionFiles(iconsDir)
        targets.push({
          slug: 'icons',
          name: 'Icons',
          type: 'ui',
          primaryFile: 'components/ui/icons/IconBase.tsx',
          seedFiles: iconFiles,
        })
      }
    }
  }

  // 2. Blocks
  if (fs.existsSync(BLOCKS_DIR)) {
    const blockCats = fs.readdirSync(BLOCKS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())
    for (const cat of blockCats) {
      const catDir = path.join(BLOCKS_DIR, cat.name)
      const variants = fs
        .readdirSync(catDir, { withFileTypes: true })
        .filter((f) => f.isFile() && /\.(tsx?|jsx?)$/.test(f.name))
      for (const variant of variants) {
        const variantNum = path.parse(variant.name).name
        const slug = `${toKebabCase(cat.name)}-${variantNum}`
        const name = toDisplayName(slug, `${cat.name} ${variantNum}`)
        const primaryFile = `components/blocks/${cat.name}/${variant.name}`

        targets.push({
          slug,
          name,
          type: 'block',
          primaryFile,
          seedFiles: [primaryFile],
        })

        if (slug === 'feature-grid-1') {
          targets.push({
            slug: 'feature-grids-1',
            name: 'Classic Grid',
            type: 'block',
            primaryFile,
            seedFiles: [primaryFile],
          })
        }
      }
    }
  }

  // 3. Templates
  if (fs.existsSync(TEMPLATES_DIR)) {
    const templateCats = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())
    for (const cat of templateCats) {
      const catDir = path.join(TEMPLATES_DIR, cat.name)
      const variants = fs
        .readdirSync(catDir, { withFileTypes: true })
        .filter((f) => f.isFile() && /\.(tsx?|jsx?)$/.test(f.name))
      for (const variant of variants) {
        const variantNum = path.parse(variant.name).name
        const slug = `${toKebabCase(cat.name)}-${variantNum}`
        const name = toDisplayName(slug, `${cat.name} ${variantNum}`)
        const primaryFile = `components/templates/${cat.name}/${variant.name}`

        targets.push({
          slug,
          name,
          type: 'template',
          primaryFile,
          seedFiles: [primaryFile],
        })
      }
    }
  }

  return targets
}

const resolveTree = (target: ComponentTarget): RegistryItem => {
  const visited = new Set<string>()
  const queue = [...target.seedFiles]
  const requires = new Set<string>()
  const npmDeps = new Set<string>()

  // Mark all initial component files as part of the component itself
  for (const f of target.seedFiles) {
    if (f !== target.primaryFile) {
      requires.add(f)
    }
  }

  while (queue.length > 0) {
    const currentRelFile = queue.shift()!
    if (visited.has(currentRelFile)) continue
    visited.add(currentRelFile)

    const fullPath = path.join(SRC_DIR, currentRelFile)
    const { relativeImports, npmDependencies } = parseImports(fullPath)

    for (const dep of npmDependencies) {
      npmDeps.add(dep)
    }

    for (const relImport of relativeImports) {
      // Don't require the primary file itself
      if (relImport !== target.primaryFile) {
        requires.add(relImport)
      }

      if (!visited.has(relImport)) {
        queue.push(relImport)
      }
    }
  }

  const result: RegistryItem = {
    slug: target.slug,
    name: target.name,
    type: target.type,
    githubUrl: target.primaryFile,
    requires: Array.from(requires).sort(),
  }

  if (npmDeps.size > 0) {
    result.dependencies = Array.from(npmDeps).sort()
  }

  return result
}

export const buildRegistry = (): void => {
  console.log('Generating registry from source files...')
  const targets = discoverTargets()
  const registryObj: Record<string, RegistryItem> = {}

  for (const target of targets) {
    const item = resolveTree(target)
    registryObj[item.slug] = item
  }

  const sortedKeys = Object.keys(registryObj).sort()

  const lines: string[] = [
    `// ============================================================================`,
    `// AUTO-GENERATED BY src/cli/build-registry.ts - DO NOT EDIT MANUALLY`,
    `// Run "pnpm build:registry" to regenerate this file from source code`,
    `// ============================================================================`,
    ``,
    `export interface RegistryItem {`,
    `  slug: string`,
    `  name: string`,
    `  type: 'ui' | 'block' | 'template'`,
    `  githubUrl: string`,
    `  requires: string[]`,
    `  dependencies?: string[]`,
    `}`,
    ``,
    `const GITHUB_BASE = 'https://raw.githubusercontent.com/lithosui/Lithos_UI/main/src'`,
    ``,
    `export const registry: Record<string, RegistryItem> = {`,
  ]

  const jsLines: string[] = [
    `const GITHUB_BASE = 'https://raw.githubusercontent.com/lithosui/Lithos_UI/main/src';`,
    `export const registry = {`,
  ]

  for (const key of sortedKeys) {
    const item = registryObj[key]
    if (!item) continue

    const itemBody: string[] = []
    itemBody.push(`  '${item.slug}': {`)
    itemBody.push(`    slug: '${item.slug}',`)
    itemBody.push(`    name: ${JSON.stringify(item.name)},`)
    itemBody.push(`    type: '${item.type}',`)
    itemBody.push(`    githubUrl: \`\${GITHUB_BASE}/${item.githubUrl}\`,`)
    itemBody.push(`    requires: [`)
    for (const req of item.requires) {
      itemBody.push(`      '${req}',`)
    }
    itemBody.push(`    ],`)

    if (item.dependencies && item.dependencies.length > 0) {
      itemBody.push(`    dependencies: [`)
      for (const dep of item.dependencies) {
        itemBody.push(`      '${dep}',`)
      }
      itemBody.push(`    ],`)
    }

    itemBody.push(`  },`)

    lines.push(...itemBody)
    jsLines.push(...itemBody)
  }

  lines.push(`}`)
  lines.push(``)

  jsLines.push(`};`)
  jsLines.push(``)

  fs.writeFileSync(REGISTRY_OUT, lines.join('\n'), 'utf-8')
  console.log(`✓ Registry written to ${REGISTRY_OUT} (${sortedKeys.length} items registered)`)

  const distDir = path.join(ROOT_DIR, 'dist', 'cli')
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'registry.js'), jsLines.join('\n'), 'utf-8')
    console.log(`✓ Compiled registry mirrored to ${path.join(distDir, 'registry.js')}`)
    const accidentalDistTs = path.join(distDir, 'registry.ts')
    if (fs.existsSync(accidentalDistTs)) {
      try {
        fs.unlinkSync(accidentalDistTs)
      } catch {
        // ignore
      }
    }
  }
}

// Execute directly if run as a script
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  buildRegistry()
}
