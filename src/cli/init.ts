import fs from 'node:fs'
import path from 'node:path'

import { getConfig, fetchFile, ensureDir, getProjectRoot, promptUser, installDependencies } from './utils.js'

export const init = async () => {
  const root = getProjectRoot()
  const configPath = path.join(root, 'lithos.json')

  if (!fs.existsSync(configPath)) {
    const defaultConfig = getConfig() // Will return defaults based on whether 'src' exists
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2))
    console.log('✓ Created lithos.json')
  } else {
    console.log('i lithos.json already exists.')
  }

  const config = getConfig()

  // Download and inject tokens.css
  const tokensUrl = 'https://raw.githubusercontent.com/lithosui/Lithos_UI/main/src/tokens.css'
  try {
    const tokensContent = await fetchFile(tokensUrl)
    const cssPath = path.join(root, config.css)

    ensureDir(cssPath)

    if (fs.existsSync(cssPath)) {
      let existingCss = fs.readFileSync(cssPath, 'utf8')
      if (existingCss.includes('/* Lithos UI Tokens */')) {
        console.log('i tokens.css is already injected into', config.css)
      } else {
        // Strip @reference "tailwindcss"; from tokens content since we're injecting into the main file
        const cleanedTokens = tokensContent.replace(/@reference "tailwindcss";\n?/g, '')

        // Ensure Tailwind is imported at the top
        if (!existingCss.includes('@import "tailwindcss"') && !existingCss.includes('@tailwind')) {
          existingCss = '@import "tailwindcss";\n' + existingCss
          fs.writeFileSync(cssPath, existingCss)
        }

        fs.appendFileSync(cssPath, '\n/* Lithos UI Tokens */\n' + cleanedTokens)
        console.log('✓ Injected tokens.css into', config.css)
      }
    } else {
      const cleanedTokens = tokensContent.replace(/@reference "tailwindcss";\n?/g, '')
      fs.writeFileSync(cssPath, '@import "tailwindcss";\n\n/* Lithos UI Tokens */\n' + cleanedTokens)
      console.log('✓ Created', config.css, 'and injected tokens.css')
    }
  } catch (err) {
    console.error('✖ Failed to fetch tokens.css:', err)
  }

  // Tailwind check
  const pkgPath = path.join(root, 'package.json')
  let hasTailwind = false
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    hasTailwind = !!deps['tailwindcss']
  }

  if (!hasTailwind) {
    const installTw = await promptUser(
      '\nTailwind CSS is required but not found. Press <Enter> to install and configure it, or type "n" to skip: (Y/n) '
    )
    if (installTw) {
      console.log('Installing Tailwind CSS (v4)...')
      installDependencies(['tailwindcss'], true)
      console.log('✓ Tailwind CSS installed.')
    }
  }
}
