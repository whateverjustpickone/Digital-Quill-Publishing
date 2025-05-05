// src/agents/literary/LiteraryAgent.ts
import { BaseAgent } from '../base/BaseAgent';
import { AgentType, Session } from '../../shared/types/agent';

export class LiteraryAgent extends BaseAgent {
  public type = AgentType.LITERARY;
  public name = 'Literary Agent';
  public description = 'Evaluates manuscripts, identifies market fit, and guides authors on publishing strategies';
  public avatar = 'assets/avatars/literary-agent.png';
  
  protected async generateThoughtProcess(message: string, session: Session): Promise<string> {
    let thoughts = `# Literary Agent Thought Process\n\n`;
    
    if (this.isAboutManuscriptEvaluation(message)) {
      thoughts += `## Manuscript Evaluation\n`;
      thoughts += `* Analyzing query for manuscript details\n`;
      thoughts += `* Considering genre, target audience, and market fit\n`;
      thoughts += `* Evaluating commercial potential based on current trends\n`;
      thoughts += `* Preparing constructive feedback on marketability\n`;
    } else if (this.isAboutQueryLetter(message)) {
      thoughts += `## Query Letter Analysis\n`;
      thoughts += `* Examining query structure and components\n`;
      thoughts += `* Assessing hook effectiveness and engagement\n`;
      thoughts += `* Evaluating book summary clarity and appeal\n`;
      thoughts += `* Reviewing author credentials presentation\n`;
    } else if (this.isAboutMarketTrends(message)) {
      thoughts += `## Market Trend Analysis\n`;
      thoughts += `* Identifying relevant genre and subgenre\n`;
      thoughts += `* Recalling current publishing trends in this area\n`;
      thoughts += `* Considering comparable titles and their performance\n`;
      thoughts += `* Formulating market-focused recommendations\n`;
    } else if (this.isAboutPublishers(message)) {
      thoughts += `## Publisher Recommendations\n`;
      thoughts += `* Determining appropriate publishing path (traditional, indie, hybrid)\n`;
      thoughts += `* Considering genre-specific publishers\n`;
      thoughts += `* Evaluating manuscript-publisher alignment\n`;
      thoughts += `* Preparing strategic submission advice\n`;
    } else {
      thoughts += `## General Literary Advice\n`;
      thoughts += `* Analyzing query for general publishing guidance needs\n`;
      thoughts += `* Identifying key publishing industry knowledge to share\n`;
      thoughts += `* Preparing helpful, actionable response\n`;
    }
    
    return thoughts;
  }
  
  protected async generateResponse(message: string, session: Session, thoughtProcess: string): Promise<string> {
    if (this.isAboutManuscriptEvaluation(message)) {
      return this.generateManuscriptEvaluationResponse(message);
    } else if (this.isAboutQueryLetter(message)) {
      return this.generateQueryLetterResponse(message);
    } else if (this.isAboutMarketTrends(message)) {
      return this.generateMarketTrendsResponse(message);
    } else if (this.isAboutPublishers(message)) {
      return this.generatePublisherRecommendationsResponse(message);
    } else {
      return `Thank you for reaching out to me as your Literary Agent. I can help with manuscript evaluation, query letter assessment, market trend analysis, and publisher recommendations. How can I assist with your publishing journey today?`;
    }
  }
  
  // Topic detection methods
  private isAboutManuscriptEvaluation(message: string): boolean {
    const keywords = ['manuscript', 'evaluate', 'feedback', 'review', 'assess', 'read'];
    return this.containsKeywords(message, keywords);
  }
  
  private isAboutQueryLetter(message: string): boolean {
    const keywords = ['query', 'letter', 'pitch', 'submission'];
    return this.containsKeywords(message, keywords);
  }
  
  private isAboutMarketTrends(message: string): boolean {
    const keywords = ['market', 'trend', 'popular', 'selling', 'demand', 'audience'];
    return this.containsKeywords(message, keywords);
  }
  
  private isAboutPublishers(message: string): boolean {
    const keywords = ['publisher', 'press', 'submit', 'publish', 'imprint', 'house'];
    return this.containsKeywords(message, keywords);
  }
  
  private containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  }
  
  // Response generation methods
  private generateManuscriptEvaluationResponse(message: string): string {
    return `When evaluating a manuscript, I look for several key elements: strong narrative voice, compelling characters, engaging plot, commercial viability, and target audience fit. Without seeing your specific manuscript, I can only offer general guidance. If you'd like a detailed evaluation, you can upload your manuscript or sample chapters, and I'll provide comprehensive feedback on its strengths, areas for improvement, and market potential. What specific aspects of your manuscript are you most concerned about?`;
  }
  
  private generateQueryLetterResponse(message: string): string {
    return `An effective query letter is concise (250-350 words) and follows a clear structure: a compelling hook to grab attention, a brief synopsis highlighting your story's unique elements, relevant biographical information, and a professional closing. It should convey your book's tone, demonstrate your writing ability, and clearly identify genre and word count. Would you like me to review your query letter or help you draft one from scratch?`;
  }
  
  private generateMarketTrendsResponse(message: string): string {
    return `Current market trends vary by genre, but across the board, we're seeing strong interest in diverse voices, cross-genre works, and stories that offer both escapism and relevance to today's social issues. Audio and e-book formats continue to grow, and series still tend to outperform standalone titles in many genres. For more specific trend analysis, I'd need to know which genre you're writing in. Would you like insights about a particular genre?`;
  }
  
  private generatePublisherRecommendationsResponse(message: string): string {
    return `Publisher recommendations depend greatly on your manuscript's genre, length, and commercial potential. The "Big Five" publishers (Penguin Random House, HarperCollins, Simon & Schuster, Hachette, and Macmillan) offer the widest distribution but are highly selective. Independent publishers often specialize in specific genres and may be more open to debut authors. Self-publishing offers creative control but requires significant self-marketing. Could you tell me more about your manuscript so I can provide tailored recommendations?`;
  }
}