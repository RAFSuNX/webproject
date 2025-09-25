const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export class APIService {
  static async sendMessage(userMessage: string): Promise<any> {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured. Please create a .env file and set VITE_OPENROUTER_API_KEY=your_api_key_here');
    }

    if (!OPENROUTER_API_KEY.startsWith('sk-or-')) {
      throw new Error('Invalid OpenRouter API key format. OpenRouter keys should start with "sk-or-"');
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "@preset/webproject",
          messages: [
            {
              role: "user",
              content: userMessage
            }
          ]
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please check that your OpenRouter API key is valid and active. You may need to generate a new key at https://openrouter.ai/keys');
        }
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again or upgrade your OpenRouter plan.');
        }
        throw new Error(`API request failed with status ${response.status}. Please try again later.`);
      }

      const data = await response.json();
      
      // Extract the content from the OpenRouter response
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content in response');
      }

      // Return the content as a simple response
      return {
        response: content,
        small_talk: "",
        code: ""
      };
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
}