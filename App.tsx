// src/renderer/App.tsx
import React, { useState, useEffect } from 'react';
import { AgentType } from '../shared/types/agent';
import { FrontDeskAssistant } from '../agents/frontDesk/FrontDeskAssistant';
import { LiteraryAgent } from '../agents/literary/LiteraryAgent';
import { DevelopmentalEditor } from '../agents/developmental/DevelopmentalEditor';
import AgentCard from './components/AgentCard';
import { v4 as uuidv4 } from 'uuid';

// Placeholder images for avatar demonstration
const AGENT_AVATARS = {
  [AgentType.FRONT_DESK]: 'https://placehold.co/100x100/569cd6/ffffff?text=FD',
  [AgentType.LITERARY]: 'https://placehold.co/100x100/4ec9b0/ffffff?text=LA',
  [AgentType.DEVELOPMENTAL]: 'https://placehold.co/100x100/ce9178/ffffff?text=DE'
};

// Mock session for demo purposes
const demoSession = {
  id: uuidv4(),
  messages: [],
  metadata: { hasInteractedBefore: false }
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: number;
}

const App: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<AgentType>(AgentType.FRONT_DESK);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Instantiate agents
  const frontDeskAssistant = new FrontDeskAssistant();
  const literaryAgent = new LiteraryAgent();
  const developmentalEditor = new DevelopmentalEditor();
  
  // Initialize with welcome message
  useEffect(() => {
    const initializeChat = async () => {
      setIsTyping(true);
      const response = await frontDeskAssistant.processMessage('Hello', demoSession);
      
      setMessages([{
        id: response.id,
        content: response.content,
        sender: 'agent',
        timestamp: response.timestamp
      }]);
      
      setIsTyping(false);
    };
    
    initializeChat();
  }, []);
  
  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Get current agent
    let currentAgent;
    switch (activeAgent) {
      case AgentType.LITERARY:
        currentAgent = literaryAgent;
        break;
      case AgentType.DEVELOPMENTAL:
        currentAgent = developmentalEditor;
        break;
      case AgentType.FRONT_DESK:
      default:
        currentAgent = frontDeskAssistant;
        break;
    }
    
    // Process message
    setIsTyping(true);
    const response = await currentAgent.processMessage(input, demoSession);
    
    // Add agent response
    setMessages(prev => [
      ...prev,
      {
        id: response.id,
        content: response.content,
        sender: 'agent',
        timestamp: response.timestamp
      }
    ]);
    
    setIsTyping(false);
  };
  
  const getAgentName = (type: AgentType): string => {
    switch (type) {
      case AgentType.LITERARY: return 'Literary Agent';
      case AgentType.DEVELOPMENTAL: return 'Developmental Editor';
      case AgentType.FRONT_DESK: return 'Front Desk Assistant';
      default: return 'Agent';
    }
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Left Panel - Agent Navigator */}
      <div style={{ width: '250px', borderRight: '1px solid #ddd', padding: '20px' }}>
        <h2>Digital Quill Publishing</h2>
        <div style={{ marginTop: '20px' }}>
          <AgentCard 
            name="Front Desk Assistant"
            avatar={AGENT_AVATARS[AgentType.FRONT_DESK]}
            active={activeAgent === AgentType.FRONT_DESK}
            onClick={() => setActiveAgent(AgentType.FRONT_DESK)}
          />
          <AgentCard 
            name="Literary Agent"
            avatar={AGENT_AVATARS[AgentType.LITERARY]}
            active={activeAgent === AgentType.LITERARY}
            onClick={() => setActiveAgent(AgentType.LITERARY)}
          />
          <AgentCard 
            name="Developmental Editor"
            avatar={AGENT_AVATARS[AgentType.DEVELOPMENTAL]}
            active={activeAgent === AgentType.DEVELOPMENTAL}
            onClick={() => setActiveAgent(AgentType.DEVELOPMENTAL)}
          />
        </div>
      </div>
      
      {/* Center Panel - Chat Interface */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2>{getAgentName(activeAgent)}</h2>
        </div>
        
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          border: '1px solid #ddd', 
          borderRadius: '5px',
          padding: '10px',
          backgroundColor: 'white',
          marginBottom: '20px'
        }}>
          {messages.map(message => (
            <div 
              key={message.id} 
              style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: message.sender === 'user' ? '#007bff' : '#f1f1f1',
                color: message.sender === 'user' ? 'white' : 'black',
                maxWidth: '70%'
              }}>
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#f1f1f1',
                color: 'black'
              }}>
                Typing...
              </div>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              marginRight: '10px'
            }}
            placeholder={`Message ${getAgentName(activeAgent)}...`}
          />
          <button 
            onClick={handleSendMessage}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;