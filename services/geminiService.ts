import { GoogleGenAI, Type } from "@google/genai";
import { StudyData } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

const modelName = "gemini-2.5-flash";

export const analyzeScripture = async (passage: string): Promise<StudyData> => {
  if (!apiKey) {
      throw new Error("API Key is not configured.");
  }

  const systemInstruction = `
    You are a master biblical scholar and teacher, expert in the Inductive Bible Study Method as taught in "Living by the Book" by Howard and William Hendricks. 
    Your goal is to guide the user through Observation, Interpretation, and Application with depth and clarity.
    
    CRITICAL RULE: Make the site an effortless experience. If you use ANY complicated theological words (like 'eschatological', 'propitiation', 'sanctification') or if the text contains archaic words, you MUST define them in the 'complexTerms' list.

    Methodology:
    1.  **Observation (What does it say?):** Look at the text line-by-line. Identify terms, structure, and atmosphere.
    2.  **Interpretation (What does it mean?):** Bridge the gap between "Then" and "Now". 
        *   Analyze key words in original languages (Greek/Hebrew) where the English translation lacks depth.
        *   Identify words that have changed meaning over time or are commonly misinterpreted.
        *   Explain the Author's Intent to the original audience.
        *   Provide cultural context that unlocks meaning.
    3.  **Application (What does it mean to me?):** Use the principle of "Space" (Sins to confess, Promises to claim, Actions to avoid, Commands to obey, Examples to follow).

    Tone: Scholarly yet accessible, reverent, and orthodox.
  `;

  const prompt = `Perform a rigorous inductive analysis on: "${passage}". 
  Provide the full scripture text for context, then break it down line-by-line.
  Be sure to highlight any specific Greek or Hebrew words that offer significant insight.
  Include cross-references that clarify the text.
  If there are any difficult words, define them.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reference: {
            type: Type.STRING,
            description: "The scripture reference (e.g., 'Romans 12:1-2')."
          },
          scriptureText: {
            type: Type.STRING,
            description: "The full text of the passage being analyzed (ESV or NASB preferred)."
          },
          verseAnalysis: {
            type: Type.ARRAY,
            description: "Line-by-line or phrase-by-phrase breakdown of the text offering immediate insight.",
            items: {
              type: Type.OBJECT,
              properties: {
                segment: { type: Type.STRING, description: "The specific phrase or verse part." },
                insight: { type: Type.STRING, description: "Observation and insight on this specific segment." }
              }
            }
          },
          keyTerms: {
            type: Type.ARRAY,
            description: "Deep dive into 2-4 key words with original language significance.",
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING, description: "The English word." },
                originalWord: { type: Type.STRING, description: "The Greek or Hebrew word transliterated." },
                language: { type: Type.STRING, enum: ["Greek", "Hebrew", "Aramaic"] },
                definition: { type: Type.STRING, description: "The literal definition." },
                significance: { type: Type.STRING, description: "Why this word choice matters/nuance." }
              }
            }
          },
          misconceptions: {
            type: Type.STRING,
            description: "Clarify any words/phrases commonly misinterpreted or where modern language differs from the author's meaning."
          },
          culturalContext: {
            type: Type.STRING,
            description: "Historical setting, customs, or geography that informs the text."
          },
          originalMeaning: {
            type: Type.STRING,
            description: "What was the author explicitly saying to the original audience? (The 'Them')."
          },
          theologicalTruth: {
            type: Type.STRING,
            description: "What does this reveal about God's nature, character, or plan?"
          },
          crossReferences: {
            type: Type.ARRAY,
            description: "2-3 scriptural connections that add weight or clarity.",
            items: {
              type: Type.OBJECT,
              properties: {
                reference: { type: Type.STRING },
                connection: { type: Type.STRING, description: "How it connects to the main text." }
              }
            }
          },
          complexTerms: {
            type: Type.ARRAY,
            description: "Definitions for any complex theological terms used in the analysis or difficult words found in the scripture.",
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING, description: "The word (e.g., Eschatology, Propitiation)." },
                definition: { type: Type.STRING, description: "Simple, clear definition." }
              }
            }
          },
          application: {
            type: Type.STRING,
            description: "Practical, personal application for the modern reader (The 'Us')."
          },
          prayerPoint: {
            type: Type.STRING,
            description: "A prayer response to the text."
          }
        },
        required: [
          "reference", 
          "scriptureText", 
          "verseAnalysis", 
          "keyTerms", 
          "misconceptions", 
          "culturalContext", 
          "originalMeaning", 
          "theologicalTruth", 
          "crossReferences", 
          "complexTerms",
          "application", 
          "prayerPoint"
        ]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response text received from Gemini.");
  }

  try {
    return JSON.parse(text) as StudyData;
  } catch (e) {
    console.error("Failed to parse JSON response:", text);
    throw new Error("Failed to parse the study analysis.");
  }
};