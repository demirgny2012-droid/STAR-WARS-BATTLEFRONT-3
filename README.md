
# STAR WARS BATTLEFRONT 3 - A Gemini-Powered Adventure

This is a text-based narrative adventure game set in the iconic Star Wars universe. Choose your side, create your character, make critical decisions, and shape your destiny in a galaxy far, far away. The dynamic, branching storyline is powered by Google's Gemini API.

![Gameplay Screenshot](https://storage.googleapis.com/aistudio-project-files/e448b11a-a10e-436f-b2f5-b6d392ca4301/214d48b1-36bd-4217-a128-d8f8d689db31)

## Features

- **Dynamic Storytelling:** The narrative is generated in real-time by the Gemini API, reacting to your choices for a unique experience every time.
- **Branching Narrative:** Your decisions directly impact the story, leading to different scenarios, challenges, and outcomes.
- **Iconic Eras:** Play through two distinct periods of the Star Wars saga: *The Clone Wars* and *The Galactic Civil War*.
- **Multiple Factions & Roles:** Align with the Galactic Republic (Jedi or Clone), the Separatist Alliance (Sith or Commander), the Rebel Alliance, or the Galactic Empire.
- **Detailed Character Creation:** Define your character's name, age, species, and backstory to personalize your adventure.
- **Save System:** Your progress is automatically saved, allowing you to continue your mission later.
- **Responsive Design:** Enjoy a seamless experience on both desktop and mobile browsers.
- **Multilingual Support:** Currently available in English and Turkish.

## Getting Started (For Developers/Deployment)

To deploy this application, you need to provide a Google Gemini API key. This key is used securely on the backend via a serverless function and is never exposed to the players.

**Step 1: Get your API Key**

- Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate your free API key.
- Copy the key to your clipboard.

**Step 2: Set the API Key as a Secret**

- In your deployment environment (like Netlify or Vercel), find the section for managing "Secrets" or "Environment Variables".
- Create a new secret with the following name: `API_KEY`
- In the value field, paste the API key you copied from Google AI Studio.
- Save the secret.

**Step 3: Deploy**

- Trigger a new deploy. The serverless function will automatically pick up the `API_KEY` environment variable, and the application will be ready for players. No further steps are needed.
