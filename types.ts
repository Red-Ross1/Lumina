export interface KeyTerm {
  word: string;
  originalWord: string; // Greek or Hebrew
  language: 'Greek' | 'Hebrew' | 'Aramaic';
  definition: string;
  significance: string;
}

export interface CrossReference {
  reference: string;
  connection: string;
}

export interface VerseInsight {
  segment: string;
  insight: string;
}

export interface TermDefinition {
  term: string;
  definition: string;
}

export interface StudyData {
  reference: string;
  scriptureText: string;
  
  // Observation
  verseAnalysis: VerseInsight[];
  
  // Interpretation
  keyTerms: KeyTerm[];
  culturalContext: string;
  originalMeaning: string; // Author's intent to the original audience
  misconceptions: string; // Words/phrases commonly misunderstood
  crossReferences: CrossReference[];
  theologicalTruth: string;
  
  // Clarity
  complexTerms: TermDefinition[]; // Definitions for jargon like 'eschatological'
  
  // Application
  application: string;
  prayerPoint: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  data: StudyData;
}

export enum ViewState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}