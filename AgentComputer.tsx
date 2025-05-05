// src/renderer/components/AgentComputer.tsx
import React, { useState } from 'react';
import { Terminal } from './Terminal';

interface AgentComputerProps {
  thoughtProcess: string;
  agentName: string;
}

export const AgentComputer: React.FC<AgentComputerProps> = ({ 
  thoughtProcess, 
  agentName 
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'files' | 'documentation'>('terminal');
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: '#252526', 
      color: '#d4d4d4' 
    }}>
      <div style={{ 
        padding: '10px 15px',
        borderBottom: '1px solid #3c3c3c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{ margin: 0, fontSize: '16px' }}>{agentName}'s Computer</h2>
      </div>
      
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #3c3c3c' 
      }}>
        <TabButton 
          active={activeTab === 'terminal'} 
          onClick={() => setActiveTab('terminal')}
        >
          Terminal
        </TabButton>
        <TabButton 
          active={activeTab === 'files'} 
          onClick={() => setActiveTab('files')}
        >
          Files
        </TabButton>
        <TabButton 
          active={activeTab === 'documentation'} 
          onClick={() => setActiveTab('documentation')}
        >
          Documentation
        </TabButton>
      </div>
      
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 'terminal' && (
          <Terminal content={thoughtProcess} speed={40} />
        )}
        
        {activeTab === 'files' && (
          <div style={{ padding: '15px' }}>
            <h3>Files</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <FileItem name="manuscript_analysis.md" type="markdown" />
              <FileItem name="market_trends.json" type="json" />
              <FileItem name="publisher_list.csv" type="csv" />
              <FileItem name="agent_notes.txt" type="text" />
            </ul>
          </div>
        )}
        
        {activeTab === 'documentation' && (
          <div style={{ padding: '15px', overflowY: 'auto', height: '100%' }}>
            <h3>Agent Documentation</h3>
            <h4>Role Description</h4>
            <p>This agent specializes in {agentName.includes('Literary') ? 'evaluating manuscripts, analyzing market fit, and providing guidance on publishing strategies' : agentName.includes('Developmental') ? 'providing feedback on manuscript structure, character development, and plot coherence' : 'welcoming authors, answering questions, and routing to specialized agents'}.</p>
            
            <h4>Capabilities</h4>
            <ul>
              {agentName.includes('Literary') && (
                <>
                  <li>Manuscript evaluation</li>
                  <li>Query letter analysis</li>
                  <li>Market trend assessment</li>
                  <li>Publisher recommendations</li>
                </>
              )}
              {agentName.includes('Developmental') && (
                <>
                  <li>Structure analysis</li>
                  <li>Character development feedback</li>
                  <li>Plot coherence evaluation</li>
                  <li>Dialogue assessment</li>
                </>
              )}
              {agentName.includes('Front') && (
                <>
                  <li>Welcome and orientation</li>
                  <li>Basic information provision</li>
                  <li>Agent routing</li>
                  <li>Appointment scheduling</li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper components
const TabButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}> = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    style={{
      padding: '8px 15px',
      backgroundColor: active ? '#1e1e1e' : 'transparent',
      border: 'none',
      borderBottom: active ? '2px solid #569cd6' : '2px solid transparent',
      color: active ? '#d4d4d4' : '#9d9d9d',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '14px'
    }}
  >
    {children}
  </button>
);

const FileItem: React.FC<{ name: string; type: string }> = ({ name, type }) => (
  <li style={{ 
    padding: '8px', 
    marginBottom: '5px', 
    display: 'flex', 
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'background-color 0.2s'
  }}>
    <div style={{ 
      marginRight: '10px',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: getFileIconColor(type)
    }}>
      {getFileIcon(type)}
    </div>
    {name}
  </li>
);

// Helper functions for file icons
function getFileIcon(type: string): string {
  switch (type) {
    case 'markdown': return '📝';
    case 'json': return '{}';
    case 'csv': return '📊';
    case 'text': return '📄';
    default: return '📄';
  }
}

function getFileIconColor(type: string): string {
  switch (type) {
    case 'markdown': return '#569cd6';
    case 'json': return '#ce9178';
    case 'csv': return '#4ec9b0';
    case 'text': return '#d4d4d4';
    default: return '#d4d4d4';
  }
}