// src/renderer/components/Terminal.tsx
import React, { useEffect, useRef, useState } from 'react';

interface TerminalProps {
  content: string;
  speed?: number; // Characters per second
}

export const Terminal: React.FC<TerminalProps> = ({ content, speed = 50 }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Reset when content changes
    setDisplayedContent('');
    setCurrentPosition(0);
  }, [content]);
  
  useEffect(() => {
    if (currentPosition < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prevContent => prevContent + content[currentPosition]);
        setCurrentPosition(prevPos => prevPos + 1);
      }, 1000 / speed);
      
      return () => clearTimeout(timer);
    }
  }, [content, currentPosition, speed]);
  
  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedContent]);
  
  // Convert Markdown formatting to basic HTML
  const formattedContent = displayedContent
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/# (.*?)\n/g, '<h1>$1</h1>') // H1
    .replace(/## (.*?)\n/g, '<h2>$1</h2>') // H2
    .replace(/### (.*?)\n/g, '<h3>$1</h3>') // H3
    .replace(/- (.*?)\n/g, '<div class="bullet">• $1</div>') // Bullet points
    .replace(/\n/g, '<br />'); // Line breaks
  
  return (
    <div 
      ref={terminalRef}
      style={{
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        padding: '15px',
        borderRadius: '5px',
        fontFamily: 'monospace',
        overflowY: 'auto',
        height: '100%',
        position: 'relative'
      }}
    >
      <div 
        dangerouslySetInnerHTML={{ __html: formattedContent }} 
        style={{
          whiteSpace: 'pre-wrap'
        }}
      />
      {currentPosition < content.length && (
        <span 
          style={{ 
            display: 'inline-block', 
            width: '8px', 
            height: '15px', 
            backgroundColor: '#d4d4d4', 
            animation: 'blink 1s step-end infinite' 
          }}
        />
      )}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .bullet {
            display: flex;
            align-items: flex-start;
            margin-left: 10px;
          }
          h1, h2, h3 {
            color: #569cd6;
            margin: 5px 0;
          }
          h1 { font-size: 1.2em; }
          h2 { font-size: 1.1em; }
          h3 { font-size: 1em; }
        `}
      </style>
    </div>
  );
};