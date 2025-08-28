import React from 'react';

export const EnvironmentErrorScreen: React.FC = () => (
  <div className="w-full max-w-3xl text-center bg-gray-900 bg-opacity-80 border-2 border-red-500 p-8 rounded-lg shadow-2xl animate-fade-in-up">
    <h2 className="text-3xl font-bold text-red-500 mb-4 tracking-widest">
      CONFIGURATION ERROR
    </h2>
    <p className="text-xl text-gray-300 mb-6">
      Your Google Gemini API key is missing.
    </p>
    <div className="text-left text-lg text-gray-400 leading-relaxed bg-black/30 p-6 rounded-md">
      <p className="font-semibold text-yellow-400 mb-3">How to fix this on Netlify:</p>
      <ol className="list-decimal list-inside space-y-3">
        <li>
          First, get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Google AI Studio</a>.
        </li>
        <li>
          Go to your site's dashboard on Netlify and navigate to:<br/>
          <code className="bg-black px-2 py-1 mt-1 inline-block rounded-md text-yellow-400 font-mono text-base">Site configuration &gt; Build &amp; deploy &gt; Environment</code>.
        </li>
        <li>
          Under <strong className="text-white">Environment variables</strong>, click "New variable".
        </li>
        <li>
          For the <strong className="text-white">Key</strong>, enter exactly: <code className="bg-black px-2 py-1 rounded-md text-yellow-400 font-mono">API_KEY</code>
        </li>
        <li>
          For the <strong className="text-white">Value</strong>, paste the API key you got from Google.
        </li>
        <li>
            Finally, go to the "Deploys" tab and trigger a new deploy to apply the change.
        </li>
      </ol>
       <p className="mt-4">
        For more details, see the <code className="bg-black px-2 py-1 mx-1 rounded-md text-yellow-400 font-mono">README.md</code> file.
      </p>
    </div>
  </div>
);
