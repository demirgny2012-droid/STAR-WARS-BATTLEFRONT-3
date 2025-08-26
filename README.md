# STAR WARS BATTLEFRONT 3 - A Gemini-Powered Adventure

This is a text-based narrative adventure game set in the iconic Star Wars universe. Choose your side, create your character, make critical decisions, and shape your destiny in a galaxy far, far away. The dynamic, branching storyline is powered by Google's Gemini API.

![Gameplay Screenshot](https://storage.googleapis.com/aistudio-project-files/e448b11a-a10e-436f-b2f5-b6d392ca4301/214d48b1-36bd-4217-a128-d8f8d689db31)

## Features

- **Dynamic Storytelling:** The narrative is generated in real-time by the Gemini API, reacting to your choices for a unique experience every time.
- **Branching Narrative:** Your decisions directly impact the story, leading to different scenarios, challenges, and outcomes.
- **Iconic Eras:** Play through two distinct periods of the Star Wars saga: *The Clone Wars* and *The Galactic Civil War*.
- **Multiple Factions:** Align with the Galactic Republic, the Separatist Alliance, the Rebel Alliance, or the Galactic Empire. A special Bounty Hunter faction is available for VIPs.
- **Character Creation:** Define your character's name, age, species, and backstory to personalize your adventure.
- **Save System:** Your progress is automatically saved, allowing you to continue your mission later.
- **Responsive Design:** Enjoy a seamless experience on both desktop and mobile browsers.
- **Multilingual Support:** Currently available in English and Turkish.

## Getting Started

This project is a static web application that runs entirely in the browser. It requires **no build step or local server** to run.

### Prerequisites

You need a Google Gemini API key to run this application.

1.  Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate your API key.
2.  **Important:** Keep your API key secure and do not commit it directly into your repository.

### Running Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```
2.  Open the file `services/geminiService.ts` in a text editor.
3.  Find the line:
    ```typescript
    const API_KEY = "GEMINI_API_KEY_PLACEHOLDER";
    ```
4.  Replace `"GEMINI_API_KEY_PLACEHOLDER"` with your actual Gemini API key. For example:
    ```typescript
    const API_KEY = "AIzaSy...your...key...here...";
    ```
5.  Save the file.
6.  Open the `index.html` file directly in your web browser. The game will now work correctly.

## Deployment

### GitHub Pages

This repository is ready for deployment on GitHub Pages. The recommended method uses GitHub Actions to automatically insert your API key during deployment.

1.  **Repository Setup:**
    - Push all the project files to your GitHub repository.

2.  **Configure API Key as a Secret:**
    - In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
    - Click **New repository secret**.
    - Name the secret `API_KEY`.
    - Paste your Gemini API key into the "Value" field.
    - Click **Add secret**.

3.  **Create GitHub Actions Workflow:**
    - Create a new directory path in your repository: `.github/workflows/`.
    - Inside that path, create a new file named `deploy.yml`.
    - Copy and paste the following content into `deploy.yml`:
    ```yml
    name: Deploy to GitHub Pages

    on:
      push:
        branches:
          - main # Or your default branch

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v4

          - name: Replace API Key
            run: |
              sed -i 's/GEMINI_API_KEY_PLACEHOLDER/${{ secrets.API_KEY }}/g' services/geminiService.ts
            
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: .

          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4

    ```
4.  **Enable GitHub Pages:**
    - In your repository's **Settings > Pages**.
    - Under "Build and deployment", select **GitHub Actions** as the source.

5.  **Launch:**
    - Commit and push your changes. The GitHub Action will run automatically.
    - After the workflow runs successfully, your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.
