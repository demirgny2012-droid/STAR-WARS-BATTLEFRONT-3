
import React from 'react';

export const EnvironmentErrorScreen: React.FC = () => (
  <div className="w-full max-w-3xl text-center bg-gray-900 bg-opacity-80 border-2 border-red-500 p-8 rounded-lg shadow-2xl animate-fade-in-up">
    <h2 className="text-3xl font-bold text-red-500 mb-4 tracking-widest">
      CONFIGURATION ERROR
    </h2>
    <p className="text-xl text-gray-300 mb-6">
      Gemini API key is not configured.
    </p>
    <div className="text-left text-lg text-gray-400 leading-relaxed bg-black/30 p-6 rounded-md">
      <p className="font-semibold text-yellow-400 mb-2">For the developer:</p>
      <p className="mb-2">
        This application requires a Google Gemini API key to function. Please set it as an environment variable named <code className="bg-black px-2 py-1 mx-1 rounded-md text-yellow-400 font-mono">API_KEY</code> in your deployment environment.
      </p>
      <p>
        Refer to the <code className="bg-black px-2 py-1 mx-1 rounded-md text-yellow-400 font-mono">README.md</code> file for detailed instructions on how to obtain and set up your API key securely.
      </p>
    </div>
  