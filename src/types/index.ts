export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  response?: string;
  smallTalk?: string;
  code?: string;
}

export interface APIResponse {
  response: string;
  small_talk?: string;
  code?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export type Theme = 'light' | 'dark';