const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message: string;
    code?: string;
  };
}

interface ParsedResponse {
  response: string;
  small_talk?: string;
  code?: string;
  json_data?: any;
  error?: string;
}

export class APIService {
  private static parseResponseContent(content: string): ParsedResponse {
    try {
      // First, try to parse as JSON
      const jsonData = JSON.parse(content);
      
      // If it's a structured response with our expected fields
      if (typeof jsonData === 'object' && jsonData !== null) {
        if (jsonData.response || jsonData.small_talk || jsonData.code) {
          return {
            response: jsonData.response || '',
            small_talk: jsonData.small_talk || '',
            code: jsonData.code || '',
            json_data: jsonData
          };
        }
        
        // If it's an error response
        if (jsonData.error || jsonData.message) {
          return {
            response: '',
            error: jsonData.message || jsonData.error || 'Unknown error occurred',
            json_data: jsonData
          };
        }
        
        // If it's any other JSON, format it nicely
        return {
          response: `Here's the JSON response:\n\`\`\`json\n${JSON.stringify(jsonData, null, 2)}\n\`\`\``,
          json_data: jsonData
        };
      }
    } catch (e) {
      // Not valid JSON, treat as plain text
    }
    
    // Check if content contains code blocks or structured text
    if (content.includes('```')) {
      return {
        response: content,
        small_talk: '',
        code: ''
      };
    }
    
    // Plain text response
    return {
      response: content,
      small_talk: '',
      code: ''
    };
  }

  static async sendMessage(userMessage: string): Promise<ParsedResponse> {
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
          'HTTP-Referer': window.location.origin,
          'X-Title': 'INFOiYo AI Assistant'
        },
        body: JSON.stringify({
          model: "@preset/webproject",
          messages: [
            {
              role: "user",
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      const responseText = await response.text();
      
      if (!response.ok) {
        let errorMessage = `API request failed with status ${response.status}`;
        
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.error?.message) {
            errorMessage = errorData.error.message;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // Use default error message
        }
        
        if (response.status === 401) {
          throw new Error(`Authentication failed: ${errorMessage}. Please check your OpenRouter API key.`);
        }
        if (response.status === 429) {
          throw new Error(`Rate limit exceeded: ${errorMessage}. Please wait before trying again.`);
        }
        throw new Error(errorMessage);
      }

      let data: OpenRouterResponse;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid JSON response from API');
      }
      
      // Extract the content from the OpenRouter response
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        if (data.error) {
          throw new Error(data.error.message || 'API error occurred');
        }
        throw new Error('No content received from API');
      }

      // Parse and structure the response content
      return this.parseResponseContent(content);
      
    } catch (error) {
      console.error('API call failed:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('An unexpected error occurred while calling the API');
    }
  }
}