import React, { useState, useEffect } from 'react';
import StudyInput from './components/StudyInput';
import AnalysisView from './components/AnalysisView';
import { analyzeScripture } from './services/geminiService';
import { StudyData, ViewState } from './types';
import { AlertCircle, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.IDLE);
  const [studyData, setStudyData] = useState<StudyData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleAnalyze = async (passage: string) => {
    setViewState(ViewState.LOADING);
    setErrorMsg(null);
    
    try {
      const data = await analyzeScripture(passage);
      setStudyData(data);
      setViewState(ViewState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("We encountered an issue analyzing this passage. Please check your connection or try a shorter verse.");
      setViewState(ViewState.ERROR);
    }
  };

  const handleReset = () => {
    setViewState(ViewState.IDLE);
    setStudyData(null);
    setErrorMsg(null);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col font-sans selection:bg-stone-200 selection:text-stone-900 dark:selection:bg-stone-700 dark:selection:text-stone-100 transition-colors duration-300">
        
        {/* Navigation / Header */}
        <header className="absolute top-0 right-0 p-4 md:p-6 z-50">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-stone-800 shadow-sm border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-all focus:outline-none focus:ring-2 focus:ring-stone-400"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>

        {/* Decorative background elements */}
        <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200 dark:from-stone-800 dark:via-stone-600 dark:to-stone-800 opacity-50 z-40 pointer-events-none"></div>
        
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 w-full max-w-7xl mx-auto z-10">
          
          {viewState === ViewState.IDLE && (
             <div className="w-full flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
                <StudyInput onAnalyze={handleAnalyze} isLoading={false} />
             </div>
          )}

          {viewState === ViewState.LOADING && (
            <div className="w-full flex flex-col items-center justify-center min-h-[60vh] animate-pulse text-center">
              <div className="mb-8">
                 <div className="w-16 h-16 border-4 border-stone-200 dark:border-stone-800 border-t-stone-800 dark:border-t-stone-200 rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-200 mb-2">Analyzing Text</h2>
              <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">Consulting historical context, original languages, and theological themes...</p>
            </div>
          )}

          {viewState === ViewState.SUCCESS && studyData && (
            <AnalysisView data={studyData} onReset={handleReset} />
          )}

          {viewState === ViewState.ERROR && (
             <div className="w-full max-w-md mx-auto text-center p-8 bg-white dark:bg-stone-900 rounded-xl shadow-lg border border-red-100 dark:border-red-900/30">
               <div className="inline-flex p-3 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 mb-4">
                  <AlertCircle className="h-8 w-8" />
               </div>
               <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">Unable to complete study</h3>
               <p className="text-stone-500 dark:text-stone-400 mb-6">{errorMsg}</p>
               <button 
                 onClick={handleReset}
                 className="px-6 py-2 bg-stone-800 dark:bg-stone-700 text-white rounded-lg hover:bg-stone-700 dark:hover:bg-stone-600 transition-colors"
               >
                 Try Again
               </button>
             </div>
          )}

        </main>

        <footer className="py-8 text-center text-stone-400 dark:text-stone-600 text-sm">
          <p>© {new Date().getFullYear()} Lumina. AI-Assisted Bible Study Tool.</p>
          <p className="mt-1 text-xs opacity-60">Results are generated by AI and should be verified with study bibles.</p>
        </footer>
        
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;