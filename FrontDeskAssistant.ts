// src/agents/frontDesk/FrontDeskAssistant.ts
import { BaseAgent } from '../base/BaseAgent';
import { AgentType, Session } from '../../shared/types/agent';

export class FrontDeskAssistant extends BaseAgent {
  public type = AgentType.FRONT_DESK;
  public name = 'Front Desk Assistant';
  public description = 'Welcomes users, provides basic information, and routes to specialized agents';
  public avatar = 'assets/avatars/front-desk.png';
  
  protected async generateThoughtProcess(message: string, session: Session): Promise<string> {
    // Initial thought process implementation
    let thoughts = `# Front Desk Assistant Thought Process\n\n`;
    
    if (this.isGreeting(message)) {
      thoughts += `## Greeting\n`;
      thoughts += `* User is initiating conversation\n`;
      thoughts += `* Should respond with welcome message\n`;
      thoughts += `* Provide overview of Digital Quill Publishing\n`;
    } else if (this.containsQuestionAbout(message, 'process')) {
      thoughts += `## Process Question\n`;
      thoughts += `* User is asking about publishing process\n`;
      thoughts += `* Should provide high-level overview\n`;
      thoughts += `* Offer to connect with specific agent for details\n`;
    } else if (this.needsSpecialistAgent(message)) {
      thoughts += `## Routing Request\n`;
      thoughts += `* Determining appropriate specialist\n`;
      thoughts += `* Analyzing query content and intent\n`;
      thoughts += `* Preparing handoff to specialist agent\n`;
    } else {
      thoughts += `## General Assistance\n`;
      thoughts += `* Processing general query\n`;
      thoughts += `* Finding relevant information\n`;
      thoughts += `* Preparing helpful response\n`;
    }
    
    return thoughts;
  }
  
  protected async generateResponse(message: string, session: Session, thoughtProcess: string): Promise<string> {
    // Initial implementation with basic routing logic
    if (this.isGreeting(message)) {
      return this.getWelcomeMessage(session);
    } else if (this.containsQuestionAbout(message, 'process')) {
      return this.getPublishingProcessOverview();
    } else if (this.needsLiteraryAgent(message)) {
      return `I'd be happy to connect you with our Literary Agent who can help with manuscript evaluation and market fit. Would you like me to transfer you?`;
    } else if (this.needsDevelopmentalEditor(message)) {
      return `It sounds like you might benefit from speaking with our Developmental Editor who specializes in manuscript structure and content feedback. Would you like me to connect you?`;
    } else {
      return `Thank you for your question. I'm the Front Desk Assistant at Digital Quill Publishing. I can help answer basic questions about our services or connect you with one of our specialized AI agents. How can I assist you today?`;
    }
  }
  
  // Helper methods for routing logic
  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.toLowerCase().includes(greeting));
  }
  
  private containsQuestionAbout(message: string, topic: string): boolean {
    // Simple implementation - would be more sophisticated in production
    return message.toLowerCase().includes(topic);
  }
  
  private needsSpecialistAgent(message: string): boolean {
    return this.needsLiteraryAgent(message) || this.needsDevelopmentalEditor(message);
  }
  
  private needsLiteraryAgent(message: string): boolean {
    const literaryKeywords = ['manuscript', 'publisher', 'query', 'market', 'genre', 'submission'];
    return literaryKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }
  
  private needsDevelopmentalEditor(message: string): boolean {
    const editorKeywords = ['edit', 'structure', 'character', 'plot', 'pacing', 'feedback'];
    return editorKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }
  
  private getWelcomeMessage(session: Session): string {
    const isReturningUser = session.metadata?.hasInteractedBefore;
    
    if (isReturningUser) {
      return `Welcome back to Digital Quill Publishing! It's good to see you again. How can I assist you today?`;
    } else {
      return `Welcome to Digital Quill Publishing! I'm your Front Desk Assistant. We're an AI-powered virtual publishing house that helps authors navigate the publishing journey. I can answer your questions or connect you with our specialized agents like our Literary Agent or Developmental Editor. How can I help you today?`;
    }
  }
  
  private getPublishingProcessOverview(): string {
    return `At Digital Quill Publishing, our process involves several key stages: 1) Manuscript evaluation by our Literary Agent, 2) Developmental editing for structure and content, 3) Copy editing for language precision, 4) Cover design and formatting, 5) Marketing strategy development, and 6) Distribution support. Would you like more details about any specific stage?`;
  }
}