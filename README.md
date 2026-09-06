# 🎮 Simon Game - Retro Arcade Edition

A modernized, responsive web edition of the classic **Simon Memory Game**. Memorize and repeat ever-expanding sequences of glowing colors and tones to challenge your memory and set a new high score!

Built with **HTML5**, **CSS3 (Grid/Flexbox/Animations)**, and **JavaScript (jQuery)**. Fully optimized for **desktop**, **tablet**, and **mobile touchscreens**.

---

## 🚀 Live Demo

Once you push this project to GitHub and enable GitHub Pages, your live game will be accessible at:
```text
https://<your-github-username>.github.io/<your-repository-name>/
```

---

## ✨ Features

- **Neon Arcade Aesthetic**: Glowing dark theme with custom radial gradients, neon button illumination, tactile feedback, and retro typography (`Press Start 2P`).
- **📱 Fully Responsive (Mobile & Tablet)**:
  - Dynamic fluid scaling with CSS `clamp()`.
  - Built-in touch support and 300ms tap-delay removal (`touch-action: manipulation`).
  - Mobile-friendly **"START GAME"** button (no physical keyboard required to start).
- **🏆 High Score Persistence**: Automatically tracks and stores your best streak using browser `localStorage`.
- **📖 Interactive Instructions Modal**: Clean, step-by-step popup guide with rules and keyboard controls.
- **⌨️ Dual Control Scheme**:
  - **Touch / Mouse**: Tap or click any colored button directly.
  - **Keyboard**:
    - <kbd>Q</kbd> or <kbd>1</kbd> → **Green**
    - <kbd>W</kbd> or <kbd>2</kbd> → **Red**
    - <kbd>A</kbd> or <kbd>3</kbd> → **Yellow**
    - <kbd>S</kbd> or <kbd>4</kbd> → **Blue**
    - <kbd>Space</kbd> or <kbd>Enter</kbd> → **Start / Restart**
- **🔊 Rich Audio & FX**: Distinct sound tones for each pad and game-over sound effects, with mobile autoplay safety error guards.

---

## 🎯 How to Play

1. **Watch & Listen**: Simon starts by flashing a random colored button and playing its sound.
2. **Repeat the Pattern**: Tap or press the button in the exact same sequence.
3. **Level Up**: Each round you complete, Simon adds one more color to the pattern.
4. **Beat Your High Score**: One wrong tap triggers Game Over! Can you beat your personal best?

---

## 📁 Project Structure

```text
Simon Game/
├── index.html         # Main game layout, header, console board & modal
├── styles.css         # Responsive styling, neon effects, animations & media queries
├── index.js           # Game engine, sequence generator, audio & touch/key handlers
├── sounds/            # Audio sound effects (.mp3)
│   ├── green.mp3
│   ├── red.mp3
│   ├── yellow.mp3
│   ├── blue.mp3
│   └── wrong.mp3
├── .gitignore         # Ignores OS metadata and editor files
└── README.md          # Project documentation and deployment guide
```

---

## 🌐 How to Deploy to GitHub Pages

Follow these simple steps to deploy your Simon Game online for free using GitHub Pages:

### Step 1: Initialize Git and Commit
Open your terminal (PowerShell or Git Bash) in this project folder:

```bash
# 1. Initialize git repository
git init

# 2. Stage all files
git add .

# 3. Create your first commit
git commit -m "feat: modernized Simon Game with responsive UI, instructions, and high score"
```

### Step 2: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (for example: `simon-game`).
3. Choose **Public**.
4. **Do not** check "Add a README" or ".gitignore" (we already have them!).
5. Click **Create repository**.

### Step 3: Link Remote and Push
Copy your repository URL from GitHub and run:

```bash
# Rename branch to main
git branch -M main

# Link remote repository (replace with your GitHub URL)
git remote add origin https://github.com/<your-username>/<repo-name>.git

# Push your code
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (gear icon at the top).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
6. Wait 1-2 minutes. Refresh the page to see your live URL:
   `https://<your-username>.github.io/<repo-name>/`

---

## 🛠️ Built With

- **HTML5**: Semantic tags, accessible attributes, and responsive viewport configuration.
- **CSS3**: CSS Custom Properties, Grid, Flexbox, Keyframe animations, and Glassmorphism (`backdrop-filter`).
- **JavaScript & jQuery**: Event handling, DOM manipulation, asynchronous timers, and Web Audio API.
- **Google Fonts**: Press Start 2P & Poppins.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
