export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  response?: string;
  smallTalk?: string;
  code?: string;
  error?: string;
  jsonData?: any;
}

export interface APIResponse {
  response: string;
  small_talk?: string;
  code?: string;
  error?: string;
  json_data?: any;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export type Theme = 'light' | 'dark';