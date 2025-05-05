// File: src/main/index.ts
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { AgentType } from '../shared/types/agent';
import * as fs from 'fs';

// Keep a global reference of the window object
let mainWindow: BrowserWindow | null = null;

// Create the application window
function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../../assets/icons/app-icon.png'),
    show: false
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  // Show window when ready to prevent white flashing
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Set up IPC handlers for agent communication and file operations
function setupIPC() {
  // Handle file open dialog
  ipcMain.handle('open-file-dialog', async () => {
    if (!mainWindow) return [];
    
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'Manuscripts', extensions: ['txt', 'doc', 'docx', 'pdf', 'rtf', 'md'] }
      ]
    });
    
    if (canceled) {
      return [];
    }
    
    // Read the first file and return its content
    try {
      const content = fs.readFileSync(filePaths[0], 'utf8');
      return { path: filePaths[0], content };
    } catch (error) {
      console.error('Error reading file:', error);
      return { error: 'Failed to read file' };
    }
  });

  // Handle file save dialog
  ipcMain.handle('save-file-dialog', async (event, content) => {
    if (!mainWindow) return { success: false };
    
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      filters: [
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'Markdown Files', extensions: ['md'] }
      ]
    });
    
    if (canceled || !filePath) {
      return { success: false };
    }
    
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return { success: true, path: filePath };
    } catch (error) {
      console.error('Error saving file:', error);
      return { success: false, error: 'Failed to save file' };
    }
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  setupIPC();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});