// File: scripts/create-directories.js
const fs = require('fs');
const path = require('path');

console.log("Creating Digital Quill Publishing directory structure...");

// List of directories to create
const directories = [
  'src',
  'src/main',
  'src/renderer',
  'src/renderer/components',
  'src/shared',
  'src/shared/types',
  'src/agents',
  'src/agents/base',
  'src/agents/frontDesk',
  'src/agents/literary',
  'src/agents/developmental',
  'src/agents/copy',
  'src/agents/marketing',
  'src/agents/production',
  'src/services',
  'src/services/ai',
  'assets',
  'assets/icons',
  'assets/avatars',
  'dist',
  'dist/main',
  'dist/renderer',
  'scripts'
];

// Create each directory
directories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    } else {
      console.log(`Directory already exists: ${dir}`);
    }
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error.message);
  }
});

console.log("Directory structure creation completed.");