import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Project Docs',
  description: 'Minimal VitePress site for GitHub Pages',
  base: '/Gitlab_Pages_Practice/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      }
    ]
  }
})
