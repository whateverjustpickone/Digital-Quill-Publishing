// File: src/main/preload.ts
import { contextBridge, ipcRenderer } from 'electron';
import { AgentType } from '../shared/types/agent';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api',
  {
    // File handling
    files: {
      // Open a file dialog and read the selected file
      openFile: async () => {
        return await ipcRenderer.invoke('open-file-dialog');
      },
      
      // Save content to a file
      saveFile: async (content: string) => {
        return await ipcRenderer.invoke('save-file-dialog', content);
      }
    },
    
    // Agent communication methods (to be implemented with actual backend)
    agents: {
      getAvailableAgents: async () => {
        // This would communicate with a backend service in a production app
        // For now, return mockup data
        return [
          {
            type: AgentType.FRONT_DESK,
            name: 'Front Desk Assistant',
            description: 'Welcomes users and routes to specialized agents',
            avatar: 'assets/avatars/front-desk.png'
          },
          {
            type: AgentType.LITERARY,
            name: 'Literary Agent',
            description: 'Evaluates manuscripts and analyzes market fit',
            avatar: 'assets/avatars/literary-agent.png'
          },
          {
            type: AgentType.DEVELOPMENTAL,
            name: 'Developmental Editor',
            description: 'Provides feedback on structure and storytelling',
            avatar: 'assets/avatars/developmental-editor.png'
          }
        ];
      },
      
      sendMessage: async (agentType: AgentType, message: string, sessionId: string) => {
        // This would be implemented with real API calls later
        return await ipcRenderer.invoke('send-message-to-agent', {
          agentType,
          message,
          sessionId
        });
      },
      
      getThoughtProcess: async (agentType: AgentType, messageId: string) => {
        // This would be implemented with real API calls later
        return await ipcRenderer.invoke('get-agent-thought-process', {
          agentType,
          messageId
        });
      }
    }
  }
);