// src/renderer/components/AgentCard.tsx
import React from 'react';

interface AgentCardProps {
  name: string;
  avatar: string;
  active: boolean;
  onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, avatar, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: active ? '#f0f0f0' : 'transparent',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      <img
        src={avatar}
        alt={name}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '20px',
          marginRight: '10px'
        }}
      />
      <div>{name}</div>
    </div>
  );
};

export default AgentCard;