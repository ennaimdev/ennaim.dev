# ennaim.dev

Personal site for Yassine Ennaim, Agentic AI Engineer. Static, no build step, no dependencies.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site: nav, hero, feature tabs, proof, projects, experience, FAQ, CTA, footer |
| `styles.css` | Design tokens and components. Values were measured from mastra.ai (colors, type scale, radii, keyframes) |
| `script.js` | Hero word cycle, marquee loop, tab switching, scroll reveal, FAQ, copy email, mobile nav |
| `assets/logo-mark.svg` | The "e" mark, white. `logo-mark-dark.svg` is the same mark in near-black for light backgrounds |
| `favicon.svg` | Mark on a rounded dark tile |
| `assets/Yassine-Ennaim-CV.pdf` | Linked from the nav, resources and footer. Replace when the CV changes |

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Deploy

Any static host works. Point it at this folder with `index.html` as the entry:

- Vercel or Netlify: import the folder, no build command, output directory `.`
- Cloudflare Pages: same, upload the folder
- GitHub Pages: push the folder to a repo and enable Pages on the root

Set the custom domain to `ennaim.dev`.

## Design notes

- Fonts: Mastra uses Greed (commercial) and Commit Mono. The site uses Geist and Geist Mono from Google Fonts as the closest free substitutes. To get closer, license Greed from Displaay and swap `--sans` in `styles.css`.
- The logo mark is a lowercase "e" drawn in the Mastra idiom: nodes at the vertices joined by strokes that thicken at each node. It was generated from a script so the taper matches, then exported as plain paths.
- Every animation respects `prefers-reduced-motion`.
- Content lives only in `index.html`. Edit copy there.
