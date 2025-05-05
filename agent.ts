// src/shared/types/agent.ts
export interface AgentMessage {
  id: string;
  content: string;
  timestamp: number;
  sender: 'user' | 'agent';
  attachments?: Array<{
    type: string;
    url: string;
    name: string;
  }>;
}

export enum AgentType {
  FRONT_DESK = 'front_desk',
  LITERARY = 'literary',
  DEVELOPMENTAL = 'developmental',
  COPY = 'copy',
  MARKETING = 'marketing',
  PRODUCTION = 'production'
}

// Add Session interface that was missing
export interface Session {
  id: string;
  messages: AgentMessage[];
  metadata?: Record<string, any>;
}

export interface Agent {
  type: AgentType;
  name: string;
  description: string;
  avatar: string;
  
  // Core methods
  initialize(): Promise<void>;
  processMessage(message: string, session: Session): Promise<AgentMessage>;
  getThoughtProcess(messageId: string): Promise<string>;
}