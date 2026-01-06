"use server";

import { generateEventConcept as serviceGenerate } from "../services/geminiService";

export async function generateEventConceptAction(client: string, eventType: string, vibe: string) {
  return serviceGenerate(client, eventType, vibe);
}
