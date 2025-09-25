const OPENROUTER_API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export class APIService {
  static async sendMessage(userMessage: string): Promise<any> {
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
              content: `user:"${userMessage}"`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the content from the OpenRouter response
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content in response');
      }

      // Try to parse the structured response
      try {
        const parsedContent = JSON.parse(content);
        return parsedContent;
      } catch {
        // If it's not JSON, return as a simple response
        return {
          response: content,
          small_talk: "",
          code: ""
        };
      }
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
}