import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanningResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateEventConcept = async (
  clientName: string,
  eventType: string,
  vibe: string
): Promise<AIPlanningResult> => {
  try {
    const prompt = `
      You are a world-class Creative Director for a high-end event agency (like Xtract or Grit Motortainment).
      Create a pitch concept for a client based on the following details:
      
      Client: ${clientName}
      Event Type: ${eventType}
      Desired Vibe: ${vibe}
      
      Output a JSON object with a catchy concept name, a powerful slogan (English or Korean), a vivid description of the atmosphere, key visual ideas (lighting, stage), and a rough program flow.
      The tone should be professional, energetic, and innovative.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conceptName: { type: Type.STRING },
            slogan: { type: Type.STRING },
            description: { type: Type.STRING },
            keyVisualIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            programFlow: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["conceptName", "slogan", "description", "keyVisualIdeas", "programFlow"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIPlanningResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};