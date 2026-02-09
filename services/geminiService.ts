
import { GoogleGenAI, Type } from "@google/genai";
import { SIMI_SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  // Negotiate group buy deals using a structured JSON response
  async negotiateGroupBuy(product: string, targetCount: number, currentPrice: number): Promise<{ dealPrice: number; pitch: string }> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `You are Simi on the "Market Demand" show. 
          Product: ${product}
          Target Buyers: ${targetCount}
          Market Price: N${currentPrice}
          
          Negotiate a group-buy discount with a virtual manufacturer. 
          Return ONLY a JSON object with "dealPrice" (the discounted price) and "pitch" (your high-energy announcement to the buyers in Pidgin/English).`
        }]
      },
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dealPrice: { type: Type.NUMBER },
            pitch: { type: Type.STRING }
          },
          required: ["dealPrice", "pitch"]
        }
      }
    });
    try {
      return JSON.parse(response.text || '{"dealPrice": 0, "pitch": ""}');
    } catch (e) {
      return { dealPrice: currentPrice * 0.7, pitch: `Oya o! If we reach ${targetCount} people, we go carry this ${product} for ground!` };
    }
  }

  // Match suppliers based on category with reliability scores
  async matchSuppliers(category: string): Promise<any[]> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `Generate 3 fictional but realistic Nigerian wholesalers or manufacturers for the category: ${category}. 
          Include name, type (Manufacturer/Wholesaler), location (e.g. Aba, Onitsha, Lagos), and a "reliability" score (1-100).
          Return ONLY a JSON array of objects.`
        }]
      },
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              location: { type: Type.STRING },
              reliability: { type: Type.NUMBER },
              category: { type: Type.STRING }
            },
            required: ["name", "type", "location", "reliability", "category"]
          }
        }
      }
    });
    try { return JSON.parse(response.text || '[]'); } catch (e) { return []; }
  }

  // Get trending market gossip in Simi's persona
  async getMarketGossip(): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: "Tell me the latest 'Market Gossip' about prices and trends in Lagos/Nigeria. Be funny and use Pidgin. Focus on what's hot this week."
        }]
      },
      config: { systemInstruction: SIMI_SYSTEM_INSTRUCTION }
    });
    return response.text || "Market calm today, but I hear say tomato price wan fly again!";
  }

  // Generate creative social media content manifests
  async generateSocialManifest(prompt: string, platform: string): Promise<any> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `Generate a social media post manifest for ${platform} based on this prompt: "${prompt}".
          Include a catchy caption in Lagos/Pidgin style, relevant hashtags, and describe the "vibe" of the post.
          Return ONLY a JSON object with keys: "caption", "tags" (array), and "vibe".`
        }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            vibe: { type: Type.STRING }
          },
          required: ["caption", "tags", "vibe"]
        }
      }
    });
    try { return JSON.parse(response.text || '{}'); } catch (e) { return { caption: prompt, tags: [], vibe: "Street Pulse" }; }
  }

  // Generate multiple WhatsApp status updates for product marketing
  async generateWhatsAppManifest(productInfo: string): Promise<{ statuses: any[] }> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `Generate 3 WhatsApp status updates for this product/service: "${productInfo}".
          Make them engaging and use Nigerian Pidgin/English. 
          Return ONLY a JSON object with a "statuses" array. Each status should have "text", "type" (e.g. Hype, Info, scarcity), and "emoji".`
        }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            statuses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  type: { type: Type.STRING },
                  emoji: { type: Type.STRING }
                },
                required: ["text", "type", "emoji"]
              }
            }
          },
          required: ["statuses"]
        }
      }
    });
    try { return JSON.parse(response.text || '{"statuses": []}'); } catch (e) { return { statuses: [] }; }
  }

  // Generate automated customer support replies based on a knowledge base
  async generateAutoReply(knowledgeBase: string, query: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `Using this knowledge base: "${knowledgeBase}", generate a helpful and friendly auto-reply in Nigerian Pidgin/English to this customer query: "${query}".`
        }]
      },
      config: { systemInstruction: SIMI_SYSTEM_INSTRUCTION }
    });
    return response.text || "I dey come, I go check for you now-now!";
  }
}
