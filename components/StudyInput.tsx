import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';

interface StudyInputProps {
  onAnalyze: (passage: string) => void;
  isLoading: boolean;
}

const StudyInput: React.FC<StudyInputProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 md:my-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-serif text-stone-800 dark:text-stone-100 font-bold mb-4 tracking-tight">
          Lumina
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-lg md:text-xl font-light">
          Observation. Interpretation. Application.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-stone-400 border-t-transparent rounded-full" />
          ) : (
            <BookOpen className="h-6 w-6 text-stone-400 dark:text-stone-500 group-focus-within:text-stone-600 dark:group-focus-within:text-stone-300 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a verse (e.g. John 15:1-5) or topic..."
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl text-lg text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-stone-500 dark:focus:border-stone-500 focus:ring-4 focus:ring-stone-100 dark:focus:ring-stone-800 transition-all shadow-sm hover:shadow-md dark:shadow-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute inset-y-2 right-2 px-3 flex items-center bg-stone-800 dark:bg-stone-700 text-stone-50 dark:text-stone-100 rounded-lg hover:bg-stone-700 dark:hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
      
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-stone-400 dark:text-stone-500">
        <span>Try:</span>
        <button onClick={() => setInput("Psalm 23")} className="hover:text-stone-600 dark:hover:text-stone-300 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-2">Psalm 23</button>
        <span className="hidden sm:inline">•</span>
        <button onClick={() => setInput("The Parable of the Sower")} className="hover:text-stone-600 dark:hover:text-stone-300 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-2">Parable of the Sower</button>
        <span className="hidden sm:inline">•</span>
        <button onClick={() => setInput("Romans 8:28")} className="hover:text-stone-600 dark:hover:text-stone-300 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-2">Romans 8:28</button>
      </div>
    </div>
  );
};

export default StudyInput;