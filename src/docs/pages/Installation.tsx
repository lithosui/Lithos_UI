import CodeViewer from '../../components/ui/CodeViewer'

const cssConfig = `:root {
  /* - Default Light Theme: High contrast, heavy white/black balance. */
  --lithos-bg: #ffffff;
  --lithos-text: #000000;
  --lithos-border: #000000;
  --lithos-accent: #00FF00;
  --lithos-surface: #ffffff;
  --lithos-muted: rgba(0, 0, 0, 0.3);
  --lithos-shadow: rgba(0, 0, 0, 1);

  background-color: var(--lithos-bg);
  color: var(--lithos-text);
  color-scheme: light;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* - Obsidian Mode: Inverts the environmental tokens without touching the structural CSS. */
/* - Shadows use maximum opacity (rgba 1) to remain solid blocks against the dark background. */
.obsidian,
body.obsidian {
  --lithos-bg: #000000;
  --lithos-text: #ffffff;
  --lithos-border: #ffffff;
  --lithos-surface: #000000;
  --lithos-muted: rgba(255, 255, 255, 0.3);
  --lithos-shadow: rgba(255, 255, 255, 1);
  color-scheme: dark;
}`

export default function Installation() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Installation
        </h1>
        <p className="mt-2 text-lg md:text-xl font-bold opacity-70 text-(--lithos-text) font-body">
          How to integrate the zero-gap architecture into your project
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Lithos UI is not distributed as an opaque NPM package. It is a collection of highly engineered React components
        that you copy directly into your codebase. This guarantees you have absolute ownership over the structure,
        physics, and styling of your application.
      </p>

      <h2 id="base-template" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        1. The Base Template
      </h2>
      <p className="mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        The fastest way to start is by cloning the official Vite template. It comes pre-configured with Tailwind v4, our
        dynamic Theme Engine, and the base Obsidian mode CSS.
      </p>
      <CodeViewer
        code={
          '# Scaffold using degit\nnpx degit IncredibleStand/Lithos_UI my-app\n\n# OR clone directly\ngit clone https://github.com/IncredibleStand/Lithos_UI my-app\n\ncd my-app\npnpm install\npnpm dev'
        }
        language="bash"
      />

      <h2 id="global-css" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        2. Global CSS Configuration
      </h2>
      <p className="mb-6 text-base md:text-lg text-(--lithos-text) max-w-3xl font-body">
        If you are integrating into an existing project, you must define the Lithos UI physics engine and root tokens in
        your global CSS file. This powers the zero-render theme switching.
      </p>
      <CodeViewer code={cssConfig} language="css" />
    </div>
  )
}
