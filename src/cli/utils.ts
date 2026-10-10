import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline'
import { execSync } from 'node:child_process'

export const getProjectRoot = (startDir = process.cwd()): string => {
  let currentDir = startDir
  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, 'lithos.json')) || fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir
    }
    currentDir = path.dirname(currentDir)
  }
  return startDir
}

export interface LithosConfig {
  aliases: {
    components: string // e.g. "./src/components/ui"
    blocks: string // e.g. "./src/components/blocks"
    templates: string // e.g. "./src/components/templates"
    utils: string // e.g. "./src/utils"
    core: string // e.g. "./src/core"
  }
  css: string // e.g. "./src/index.css"
}

const DEFAULT_CONFIG: LithosConfig = {
  aliases: {
    components: './src/components/ui',
    blocks: './src/components/blocks',
    templates: './src/components/templates',
    utils: './src/utils',
    core: './src/core',
  },
  css: './src/index.css',
}

export const getConfig = (): LithosConfig => {
  const root = getProjectRoot()
  const configPath = path.join(root, 'lithos.json')
  if (fs.existsSync(configPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      return { ...DEFAULT_CONFIG, ...parsed, aliases: { ...DEFAULT_CONFIG.aliases, ...(parsed.aliases || {}) } }
    } catch {
      console.warn('⚠️ Could not parse lithos.json. Using defaults.')
    }
  }

  // If no config and no src folder, fallback to root
  if (!fs.existsSync(path.join(root, 'src'))) {
    return {
      aliases: {
        components: './components/ui',
        blocks: './components/blocks',
        templates: './components/templates',
        utils: './utils',
        core: './core',
      },
      css: './index.css',
    }
  }

  return DEFAULT_CONFIG
}

export const fetchFile = async (url: string): Promise<string> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  }
  return response.text()
}

export const getLocalDestination = (repoPath: string, config: LithosConfig): string => {
  const root = getProjectRoot()
  // repoPath is like "components/ui/Button.tsx" or "utils/cn.ts"
  if (repoPath.startsWith('components/ui/')) {
    return path.join(root, config.aliases.components, repoPath.replace('components/ui/', ''))
  }
  if (repoPath.startsWith('components/blocks/')) {
    return path.join(root, config.aliases.blocks, repoPath.replace('components/blocks/', ''))
  }
  if (repoPath.startsWith('components/templates/')) {
    return path.join(
      root,
      config.aliases.templates || './src/components/templates',
      repoPath.replace('components/templates/', '')
    )
  }
  if (repoPath.startsWith('utils/')) {
    return path.join(root, config.aliases.utils, repoPath.replace('utils/', ''))
  }
  if (repoPath.startsWith('core/')) {
    return path.join(root, config.aliases.core, repoPath.replace('core/', ''))
  }
  return path.join(root, repoPath)
}

const stripExt = (p: string) => p.replace(/\.tsx?$/, '')

export const rewriteImports = (
  content: string,
  sourceRepoPath: string,
  requires: string[],
  config: LithosConfig
): string => {
  let rewritten = content
  const sourceLocalDest = getLocalDestination(sourceRepoPath, config)
  const sourceLocalDir = path.dirname(sourceLocalDest)
  const sourceRepoDir = path.dirname(sourceRepoPath)

  for (const req of requires) {
    if (!req.endsWith('.ts') && !req.endsWith('.tsx')) {
      // It's an npm package, don't rewrite
      continue
    }

    // 1. Calculate the exact relative string used in the original source code
    let originalRelative = path.relative(sourceRepoDir, req)
    // Convert Windows backslashes to forward slashes for import strings
    originalRelative = originalRelative.split(path.sep).join('/')
    if (!originalRelative.startsWith('.')) {
      originalRelative = './' + originalRelative
    }
    const originalImportStr = stripExt(originalRelative)

    // 2. Calculate the new relative string based on the user's config
    const reqLocalDest = getLocalDestination(req, config)
    let newRelative = path.relative(sourceLocalDir, reqLocalDest)
    newRelative = newRelative.split(path.sep).join('/')
    if (!newRelative.startsWith('.')) {
      newRelative = './' + newRelative
    }
    const newImportStr = stripExt(newRelative)

    // 3. String replace
    // We use a simple replace. To be safe we could use a regex that matches quotes, but literal is fine.
    rewritten = rewritten.split(`'${originalImportStr}'`).join(`'${newImportStr}'`)
    rewritten = rewritten.split(`"${originalImportStr}"`).join(`"${newImportStr}"`)
  }

  return rewritten
}

export const ensureDir = (filePath: string) => {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

export const promptUser = (question: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'y' || answer === '')
    })
  })
}

export const getPackageManager = (): 'npm' | 'yarn' | 'pnpm' | 'bun' => {
  const root = getProjectRoot()
  if (fs.existsSync(path.join(root, 'pnpm-lock.yaml'))) return 'pnpm'
  if (fs.existsSync(path.join(root, 'yarn.lock'))) return 'yarn'
  if (fs.existsSync(path.join(root, 'bun.lockb'))) return 'bun'
  return 'npm'
}

export const installDependencies = (deps: string[], isDev = false) => {
  if (deps.length === 0) return
  const pm = getPackageManager()
  const command = `${pm} ${pm === 'npm' ? 'install' : 'add'} ${isDev ? '-D ' : ''}${deps.join(' ')}`
  console.log(`> ${command}`)
  execSync(command, { stdio: 'inherit', cwd: getProjectRoot() })
}
