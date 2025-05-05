// src/agents/developmental/DevelopmentalEditor.ts
import { BaseAgent } from '../base/BaseAgent';
import { AgentType, Session } from '../../shared/types/agent';

export class DevelopmentalEditor extends BaseAgent {
  public type = AgentType.DEVELOPMENTAL;
  public name = 'Developmental Editor';
  public description = 'Provides feedback on manuscript structure, character development, plot coherence, and storytelling elements';
  public avatar = 'assets/avatars/developmental-editor.png';
  
  protected async generateThoughtProcess(message: string, session: Session): Promise<string> {
    let thoughts = `# Developmental Editor Thought Process\n\n`;
    
    if (this.isAboutStructure(message)) {
      thoughts += `## Structure Analysis\n`;
      thoughts += `* Considering narrative arc and key story beats\n`;
      thoughts += `* Evaluating pacing and rhythm\n`;
      thoughts += `* Analyzing chapter organization and flow\n`;
      thoughts += `* Identifying potential structural weaknesses\n`;
    } else if (this.isAboutCharacters(message)) {
      thoughts += `## Character Analysis\n`;
      thoughts += `* Examining character development and arcs\n`;
      thoughts += `* Assessing character consistency and authenticity\n`;
      thoughts += `* Evaluating character motivations and conflicts\n`;
      thoughts += `* Considering character relationships and dynamics\n`;
    } else if (this.isAboutPlot(message)) {
      thoughts += `## Plot Analysis\n`;
      thoughts += `* Analyzing plot coherence and logic\n`;
      thoughts += `* Identifying potential plot holes\n`;
      thoughts += `* Evaluating conflict development and resolution\n`;
      thoughts += `* Considering subplot integration\n`;
    } else if (this.isAboutDialogue(message)) {
      thoughts += `## Dialogue Analysis\n`;
      thoughts += `* Assessing dialogue authenticity and flow\n`;
      thoughts += `* Evaluating dialogue's purpose in advancing story/character\n`;
      thoughts += `* Considering dialogue tags and attribution\n`;
      thoughts += `* Identifying dialogue patterns and potential improvements\n`;
    } else {
      thoughts += `## General Developmental Feedback\n`;
      thoughts += `* Analyzing query for editorial guidance needs\n`;
      thoughts += `* Considering multiple elements of craft\n`;
      thoughts += `* Preparing constructive, actionable feedback\n`;
    }
    
    return thoughts;
  }
  
  protected async generateResponse(message: string, session: Session, thoughtProcess: string): Promise<string> {
    if (this.isAboutStructure(message)) {
      return this.generateStructureFeedback(message);
    } else if (this.isAboutCharacters(message)) {
      return this.generateCharacterFeedback(message);
    } else if (this.isAboutPlot(message)) {
      return this.generatePlotFeedback(message);
    } else if (this.isAboutDialogue(message)) {
      return this.generateDialogueFeedback(message);
    } else {
      return `Thank you for reaching out to me as your Developmental Editor. I focus on the big-picture elements of your manuscript, including structure, character development, plot coherence, and overall storytelling. To provide the most helpful feedback, could you share more specific details about what aspect of your manuscript you'd like me to address?`;
    }
  }
  
  // Topic detection methods
  private isAboutStructure(message: string): boolean {
    const keywords = ['structure', 'pacing', 'chapters', 'organization', 'flow', 'arc', 'beginning', 'middle', 'end'];
    return this.containsKeywords(message, keywords);
  }
  
  private isAboutCharacters(message: string): boolean {
    const keywords = ['character', 'protagonist', 'antagonist', 'motivation', 'development', 'arc', 'personality'];
    return this.containsKeywords(message, keywords);
  }
  
  private isAboutPlot(message: string): boolean {
    const keywords = ['plot', 'story', 'conflict', 'resolution', 'subplot', 'twist', 'tension', 'stakes'];
    return this.containsKeywords(message, keywords);
  }
  
  private isAboutDialogue(message: string): boolean {
    const keywords = ['dialogue', 'conversation', 'talking', 'speech', 'said', 'voice'];
    return this.containsKeywords(message, keywords);
  }
  
  private containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  }
  
  // Response generation methods
  private generateStructureFeedback(message: string): string {
    return `Regarding manuscript structure, effective narratives typically follow identifiable patterns that help engage readers. The classic three-act structure provides a reliable framework, but there are many variations that can work depending on your genre and style. Look critically at your pacing—are there sections where the story drags or moves too quickly? Consider the balance between scene and summary, action and reflection. Each chapter should serve a purpose in advancing the plot or developing characters, with natural points of tension and release. Would you like more specific guidance on a particular structural element?`;
  }
  
  private generateCharacterFeedback(message: string): string {
    return `Character development is central to engaging storytelling. Strong characters have clear desires, face meaningful obstacles, and undergo transformation. Consider whether your characters have distinctive voices, consistent yet complex personalities, and clear motivations driving their actions. Readers connect with characters who demonstrate both strengths and flaws. For protagonists, ensure their journey feels earned—they should work for their victories and learn from their failures. For supporting characters, each should serve a purpose beyond simply assisting or opposing the protagonist. Would you like to discuss any specific character in your manuscript?`;
  }
  
  private generatePlotFeedback(message: string): string {
    return `Effective plots balance predictability with surprise—following enough familiar patterns to orient readers while offering fresh elements that maintain interest. Examine your central conflict: Is it clearly established early and resolved satisfyingly? Check for plot holes or convenience solutions that undermine tension. Consider your subplots—they should complement the main plot rather than distract from it, ideally reinforcing themes or revealing character dimensions. The stakes should escalate as the story progresses, creating a sense of momentum. Would you like more specific guidance on plot development or resolution?`;
  }
  
  private generateDialogueFeedback(message: string): string {
    return `Strong dialogue serves multiple purposes: it reveals character, advances the plot, and provides information without seeming expository. Each character should have a distinctive voice reflecting their background, personality, and goals. Look for places where dialogue might be too on-the-nose or redundant with action. Varying dialogue length and rhythm creates natural conversation flow. Also consider what's left unsaid—subtext often communicates more than explicit statements. Dialogue tags should generally be unobtrusive, with action beats often serving better than elaborate attributions. Would you like more specific dialogue guidance?`;
  }
}