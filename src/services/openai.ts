import { GoogleGenAI } from "@google/genai";
import { MessageType } from '../interfaces';


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
    throw new Error("API key is not defined. Please set VITE_GEMINI_API_KEY in your environment variables.");
}

// Initialize the Gemini AI client
const genAI = new GoogleGenAI({ apiKey: API_KEY });

// Default timeout in milliseconds (30 seconds)
const DEFAULT_TIMEOUT = 30000;

export async function fetchCompletion(prompt: MessageType[], timeoutMs: number = DEFAULT_TIMEOUT) {
    // Create an AbortController for the timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        // Format the messages correctly for the Gemini API
        const formattedMessages = prompt.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model', 
            parts: [{ text: Array.isArray(msg.content) ? msg.content.join(' ') : msg.content }]
        }));

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: formattedMessages,
        });

        // Clean up the response text by removing empty lines
        const responseText = response.text || '';
        const cleanedResponse = responseText
            .split('\n')
            .filter(line => line.trim() !== '')
            .join('\n');

        return cleanedResponse;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error(`Request timed out after ${timeoutMs}ms`);
            }
            throw error;
        }
        throw new Error('An unknown error occurred');
    } finally {
        clearTimeout(timeoutId);
    }
}
