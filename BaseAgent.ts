// src/agents/base/BaseAgent.ts
import { Agent, AgentType, AgentMessage, Session } from '../../shared/types/agent';
import { v4 as uuidv4 } from 'uuid';
import { generateThoughtProcess, generateAgentResponse } from '../../services/ai/openaiService';

export abstract class BaseAgent implements Agent {
  public abstract type: AgentType;
  public abstract name: string;
  public abstract description: string;
  public abstract avatar: string;
  
  // Store thought processes for transparency
  private thoughtProcesses: Map<string, string> = new Map();
  
  async initialize(): Promise<void> {
    console.log(`Initializing ${this.name} agent`);
    return Promise.resolve();
  }
  
  async processMessage(message: string, session: Session): Promise<AgentMessage> {
    // Generate a unique ID for this message
    const messageId = uuidv4();
    
    // Create session context from previous messages
    const sessionContext = this.formatSessionContext(session);
    
    try {
      // Generate thought process
      const thoughtProcess = await generateThoughtProcess(this.type, message, sessionContext);
      this.thoughtProcesses.set(messageId, thoughtProcess);
      
      // Generate response
      const response = await generateAgentResponse(this.type, message, sessionContext);
      
      // Create and return agent message
      const agentMessage: AgentMessage = {
        id: messageId,
        content: response,
        timestamp: Date.now(),
        sender: 'agent'
      };
      
      return agentMessage;
    } catch (error) {
      console.error(`Error processing message with ${this.type} agent:`, error);
      
      // Return a graceful error message
      const errorMessage: AgentMessage = {
        id: messageId,
        content: "I apologize, but I'm having trouble processing your request right now. Please try again shortly.",
        timestamp: Date.now(),
        sender: 'agent'
      };
      
      return errorMessage;
    }
  }
  
  async getThoughtProcess(messageId: string): Promise<string> {
    const thoughtProcess = this.thoughtProcesses.get(messageId);
    if (!thoughtProcess) {
      throw new Error(`No thought process found for message ID: ${messageId}`);
    }
    return thoughtProcess;
  }
  
  // Helper function to format session context
  private formatSessionContext(session: Session): string {
    if (!session.messages || session.messages.length === 0) {
      return '';
    }
    
    // Get the last few messages (e.g., up to 5) to provide context
    const recentMessages = session.messages.slice(-5);
    
    return recentMessages.map(msg => {
      const role = msg.sender === 'user' ? 'User' : this.name;
      return `${role}: ${msg.content}`;
    }).join('\n');
  }
}