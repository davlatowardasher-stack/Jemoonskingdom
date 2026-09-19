# Jemoon's Kingdom

A finished, dependency-free static website about animals, built with plain HTML, CSS and JavaScript. The visual system combines dense editorial layouts, bold poster typography, bright natural colors and tactile wildlife photography.

## Features

- 11 resident animals requested in the original conversation
- habitat filters and a “Surprise me” resident picker
- expandable animal field notes
- interactive Wild Tech Lab featuring a laptop and phone
- personalised royal greeting generator
- four-question wildlife quiz
- responsive editorial photo mosaic
- keyboard-friendly controls, visible focus states and reduced-motion support
- local image assets and relative paths suitable for GitHub Pages
- no framework, package manager, backend, build step or runtime dependency

## Project structure

```text
project_zoo/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   └── images/
│       ├── camel.jpg
│       ├── cat.jpg
│       ├── crocodile.jpg
│       ├── dog.jpg
│       ├── duck.jpg
│       ├── elephant.jpg
│       ├── giraffe.jpg
│       ├── hero-kingdom.jpg
│       ├── horse.jpg
│       ├── lion.jpg
│       ├── llama.jpg
│       ├── tiger.jpg
│       └── wild-tech-lab.jpg
├── favicon.svg
├── .nojekyll
└── README.md
```

## Run locally

From this folder, run:

```bash
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

You can also open `index.html` directly, but a local server more closely matches GitHub Pages.

## Publish on GitHub Pages

1. Put these files in the root of a GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the site and the `/ (root)` folder.
5. Save and wait for the Pages URL to appear.

No paths, API keys or environment variables need to be changed.

## Image credits

The hero and Wild Tech Lab artwork were generated specifically for this project with OpenAI's built-in image generation tool. Prompts asked for an original editorial animal kingdom and a wildlife research station, with no text, brands or watermarks.

The resident photographs are stored locally and sourced from Wikimedia Commons under Creative Commons licences. They were resized for the web and are presented with responsive CSS crops. Full clickable source and licence credits are included in the website footer.

- Llamas — kallerna, CC BY-SA 4.0
- Ducks — Richard Bartz, CC BY-SA 2.5
- Cat — Alvesgaspar, CC BY-SA 3.0
- Dog — Basile Morin, CC BY-SA 4.0
- Crocodile — Diego Delso, CC BY-SA 4.0
- Camel — Clément Bardot, CC BY-SA 4.0
- Horse — Alvesgaspar, CC BY-SA 4.0
- Elephants — Charles J. Sharp, CC BY-SA 4.0
- Giraffe — Giles Laurent, CC BY-SA 4.0
- Lion — Charles J. Sharp, CC BY-SA 4.0
- Tiger — Charles J. Sharp, CC BY-SA 4.0
