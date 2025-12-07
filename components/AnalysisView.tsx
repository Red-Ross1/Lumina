import React from 'react';
import { StudyData } from '../types';
import AnalysisCard from './AnalysisCard';
import { 
  Eye, 
  Globe, 
  MessageCircle, 
  Flame, 
  Heart, 
  HandMetal,
  ChevronLeft,
  Languages,
  Link as LinkIcon,
  AlertTriangle,
  Book
} from 'lucide-react';

interface AnalysisViewProps {
  data: StudyData;
  onReset: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <button 
            onClick={onReset}
            className="group flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
        >
            <div className="p-1 rounded-full group-hover:bg-stone-200 dark:group-hover:bg-stone-800 transition-colors">
                <ChevronLeft className="h-5 w-5" />
            </div>
            <span className="font-medium">New Study</span>
        </button>
        <span className="text-xs font-bold tracking-widest text-stone-400 dark:text-stone-600 uppercase">Inductive Study</span>
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight mb-6">
          {data.reference}
        </h2>
        <div className="max-w-3xl mx-auto bg-stone-100 dark:bg-stone-900 p-6 md:p-8 rounded-lg border-l-4 border-stone-400 dark:border-stone-600 shadow-sm">
            <p className="text-lg md:text-xl text-stone-700 dark:text-stone-300 italic font-serif leading-relaxed">
                "{data.scriptureText}"
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Step 1: Observation - Line by Line */}
        <AnalysisCard 
          title="Observation: Line-by-Line" 
          icon={Eye} 
          themeColor="blue"
          delay={0}
        >
            <div className="space-y-4">
                {data.verseAnalysis.map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 pb-4 border-b border-stone-100 dark:border-stone-800 last:border-0">
                        <div className="md:w-1/3 font-serif font-medium text-stone-800 dark:text-stone-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded h-fit">
                            {item.segment}
                        </div>
                        <div className="md:w-2/3 text-stone-600 dark:text-stone-300 leading-relaxed">
                            {item.insight}
                        </div>
                    </div>
                ))}
            </div>
        </AnalysisCard>

        {/* Word Studies & Misconceptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalysisCard 
              title="Word Studies" 
              icon={Languages} 
              themeColor="indigo"
              delay={150}
            >
                <div className="space-y-6">
                    {data.keyTerms.map((term, idx) => (
                        <div key={idx} className="bg-stone-50 dark:bg-stone-950/50 rounded-lg p-4 border border-stone-100 dark:border-stone-800">
                            <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                                <span className="font-bold text-stone-900 dark:text-stone-100 text-lg">{term.word}</span>
                                <span className="text-sm font-serif italic text-stone-500 dark:text-stone-400">{term.originalWord} ({term.language})</span>
                            </div>
                            <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1">{term.definition}</p>
                            <p className="text-sm text-stone-600 dark:text-stone-400">{term.significance}</p>
                        </div>
                    ))}
                </div>
            </AnalysisCard>

            <AnalysisCard 
                title="Common Misconceptions" 
                icon={AlertTriangle} 
                themeColor="orange"
                delay={200}
            >
                <p className="leading-relaxed whitespace-pre-wrap">{data.misconceptions}</p>
            </AnalysisCard>
        </div>

        {/* Step 2: Interpretation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalysisCard 
              title="Cultural Context" 
              icon={Globe} 
              themeColor="amber"
              delay={300}
            >
                <p className="leading-relaxed whitespace-pre-wrap">{data.culturalContext}</p>
            </AnalysisCard>

            <AnalysisCard 
              title="Author's Intent" 
              icon={MessageCircle} 
              themeColor="emerald"
              delay={350}
            >
                <p className="leading-relaxed whitespace-pre-wrap">{data.originalMeaning}</p>
            </AnalysisCard>
        </div>

        {/* Cross References & Theology */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                 <AnalysisCard 
                    title="Cross References" 
                    icon={LinkIcon} 
                    themeColor="cyan"
                    delay={450}
                >
                    <ul className="space-y-4">
                        {data.crossReferences.map((ref, idx) => (
                            <li key={idx} className="text-sm">
                                <span className="block font-bold text-stone-800 dark:text-stone-200 mb-1 text-base">{ref.reference}</span>
                                <span className="block text-stone-500 dark:text-stone-400 leading-snug">{ref.connection}</span>
                            </li>
                        ))}
                    </ul>
                </AnalysisCard>
            </div>
            <div className="md:col-span-2">
                <AnalysisCard 
                    title="Theological Revelation" 
                    icon={Flame} 
                    themeColor="purple"
                    delay={500}
                >
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{data.theologicalTruth}</p>
                </AnalysisCard>
            </div>
        </div>

        {/* Glossary for Complex Terms - Only shows if there are terms to define */}
        {data.complexTerms && data.complexTerms.length > 0 && (
             <AnalysisCard 
             title="Glossary of Terms" 
             icon={Book} 
             themeColor="slate"
             delay={550}
           >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.complexTerms.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded border border-slate-100 dark:border-slate-800">
                            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">{item.term}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400 leading-snug">{item.definition}</span>
                        </div>
                    ))}
                </div>
           </AnalysisCard>
        )}

        {/* Step 3: Application & Prayer */}
        <AnalysisCard 
          title="Application (Us)" 
          icon={HandMetal} 
          themeColor="rose"
          delay={600}
        >
             <p className="leading-relaxed whitespace-pre-wrap">{data.application}</p>
        </AnalysisCard>

        <div className="bg-stone-800 dark:bg-stone-900 rounded-xl p-8 md:p-10 text-center text-stone-100 animate-fade-in-up shadow-xl border border-stone-700 dark:border-stone-800" style={{ animationDelay: '700ms', animationFillMode: 'both' }}>
           <Heart className="h-8 w-8 text-rose-400 mx-auto mb-6" />
           <h3 className="text-2xl font-serif font-bold mb-4">Prayer Response</h3>
           <p className="text-stone-300 dark:text-stone-400 italic text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
             "{data.prayerPoint}"
           </p>
        </div>

      </div>
    </div>
  );
};

export default AnalysisView;