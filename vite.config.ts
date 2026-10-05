import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { notes } from './src/content/notes.ts'

const siteUrl = 'https://harbinks.github.io/Portfolio/'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]!)
}

function notePages() {
  return {
    name: 'note-share-pages',
    apply: 'build' as const,
    generateBundle(this: { emitFile: (asset: { type: 'asset'; fileName: string; source: string }) => void }) {
      for (const note of notes) {
        const canonicalUrl = new URL(`notes/${note.slug}/`, siteUrl).toString()
        const description = note.excerpt
        const title = escapeHtml(note.title)
        const safeDescription = escapeHtml(description)
        const shareImage = note.slug === 'upsc-aspirants-phone-classroom'
          ? new URL(`images/${note.slug}.png`, siteUrl).toString()
          : null
        const article = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} | Harbin K S</title>
  <meta name="description" content="${safeDescription}" />
  <meta name="author" content="Harbin K S" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Harbin K S" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:url" content="${canonicalUrl}" />
  ${shareImage ? `<meta property="og:image" content="${shareImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  <meta property="og:image:alt" content="${title}" />` : ''}
  <meta property="article:published_time" content="${note.date}" />
  <meta name="twitter:card" content="summary" />
  ${shareImage ? `<meta name="twitter:image" content="${shareImage}" />` : ''}
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <style>
    :root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;color:#202124;background:#fff;font-synthesis:none;text-rendering:optimizeLegibility}
    *{box-sizing:border-box}body{margin:0}header{padding:64px 24px 36px;border-bottom:1px solid #e5e7eb;background:#f8f9fa}header>div,main{max-width:760px;margin:auto}h1{font-size:clamp(2rem,6vw,3.25rem);line-height:1.12;letter-spacing:-.035em;margin:0 0 16px}.date,.tags{color:#626a73;font-size:.92rem}.tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.tags span{border:1px solid #d5d8dc;border-radius:999px;padding:4px 10px}main{padding:36px 24px 80px;font-size:1.08rem;line-height:1.8}main h2{margin:2em 0 .6em;line-height:1.25;font-size:1.65rem}main h3{margin:1.6em 0 .5em;line-height:1.3}main p,main ul,main ol{margin:0 0 1.1em}main li{margin:.45em 0}main small{color:#626a73}main svg{max-width:100%;height:auto}main progress{width:100%;height:14px;accent-color:#1f3a5f}main blockquote{border-left:4px solid #b8893b;margin:1.5em 0;padding:.2em 1em;color:#454b52}main .scroll{overflow-x:auto}footer{max-width:760px;margin:auto;padding:0 24px 48px}button{padding:9px 16px;border:1px solid #ccd0d5;border-radius:6px;background:white;color:#202124;cursor:pointer;font:inherit}button:hover{background:#f2f3f5}@media(max-width:600px){header{padding:42px 20px 28px}main{padding:28px 20px 56px;font-size:1rem}}
  </style>
</head>
<body>
  <header><div><div class="date">${escapeHtml(note.date)}</div><h1>${title}</h1><div class="tags">${note.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div></div></header>
  <main>${note.content}</main>
  <footer><button type="button" id="share">Share article</button></footer>
  <script>
    document.getElementById('share').addEventListener('click', async function(){
      const data={title:document.title,url:location.href};
      try{if(navigator.share){await navigator.share(data)}else{await navigator.clipboard.writeText(location.href);this.textContent='Link copied'}}
      catch(error){if(error.name!=='AbortError'){try{await navigator.clipboard.writeText(location.href);this.textContent='Link copied'}catch{this.textContent='Unable to share'}}}
    });
  </script>
</body>
</html>`

        this.emitFile({
          type: 'asset',
          fileName: `notes/${note.slug}/index.html`,
          source: article,
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), notePages()],
  base: './',
})
