export type ManualPath = string | Record<string, string>

export const deriveImportLines = (
  componentNames: string[],
  manualPath: ManualPath,
  mode: 'command' | 'manual'
): string => {
  if (mode === 'command') {
    if (typeof manualPath === 'string') {
      return `import { ${componentNames.join(', ')} } from 'lithos-ui'`
    }

    const lithosImports: string[] = []
    const otherImports: Record<string, string[]> = {}

    componentNames.forEach((name) => {
      const path = manualPath[name] || manualPath['others']
      // Assume paths not starting with '.' (or '/') are external dependencies like 'react'
      if (path && !path.startsWith('.') && !path.startsWith('/')) {
        if (!otherImports[path]) {
          otherImports[path] = []
        }
        otherImports[path].push(name)
      } else {
        lithosImports.push(name)
      }
    })

    const lines: string[] = []

    // Add external imports
    Object.entries(otherImports).forEach(([path, names]) => {
      lines.push(`import { ${names.join(', ')} } from '${path}'`)
    })

    // Add lithos-ui imports
    if (lithosImports.length > 0) {
      lines.push(`import { ${lithosImports.join(', ')} } from 'lithos-ui'`)
    }

    return lines.join('\n')
  }

  if (typeof manualPath === 'string') {
    return `import { ${componentNames.join(', ')} } from '${manualPath}'`
  }

  // Group manual imports by path to avoid multiple lines for the same module
  const manualGroups: Record<string, string[]> = {}
  componentNames.forEach((name) => {
    const path = manualPath[name] || manualPath['others']
    if (!path) return

    if (!manualGroups[path]) {
      manualGroups[path] = []
    }
    manualGroups[path].push(name)
  })

  return Object.entries(manualGroups)
    .map(([path, names]) => `import { ${names.join(', ')} } from '${path}'`)
    .join('\n')
}

export const deriveUsageCode = (
  componentNames: string[],
  manualPath: ManualPath,
  body: string,
  mode: 'command' | 'manual'
): string => {
  return `${deriveImportLines(componentNames, manualPath, mode)}\n\n${body}`
}
