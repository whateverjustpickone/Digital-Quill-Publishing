/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/index.ts":
/*!***************************!*\
  !*** ./src/main/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n      desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n// File: src/main/index.ts\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nconst path = __importStar(__webpack_require__(/*! path */ \"path\"));\r\nconst url = __importStar(__webpack_require__(/*! url */ \"url\"));\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\n// Keep a global reference of the window object\r\nlet mainWindow = null;\r\n// Create the application window\r\nfunction createWindow() {\r\n    // Create the browser window\r\n    mainWindow = new electron_1.BrowserWindow({\r\n        width: 1280,\r\n        height: 800,\r\n        webPreferences: {\r\n            nodeIntegration: false,\r\n            contextIsolation: true,\r\n            preload: path.join(__dirname, 'preload.js')\r\n        },\r\n        icon: path.join(__dirname, '../../assets/icons/app-icon.png'),\r\n        show: false\r\n    });\r\n    // Load the app\r\n    if (true) {\r\n        mainWindow.loadURL('http://localhost:8080');\r\n        mainWindow.webContents.openDevTools();\r\n    }\r\n    else {}\r\n    // Show window when ready to prevent white flashing\r\n    mainWindow.once('ready-to-show', () => {\r\n        if (mainWindow) {\r\n            mainWindow.show();\r\n        }\r\n    });\r\n    mainWindow.on('closed', () => {\r\n        mainWindow = null;\r\n    });\r\n}\r\n// Set up IPC handlers for agent communication and file operations\r\nfunction setupIPC() {\r\n    // Handle file open dialog\r\n    electron_1.ipcMain.handle('open-file-dialog', async () => {\r\n        if (!mainWindow)\r\n            return [];\r\n        const { canceled, filePaths } = await electron_1.dialog.showOpenDialog(mainWindow, {\r\n            properties: ['openFile'],\r\n            filters: [\r\n                { name: 'Manuscripts', extensions: ['txt', 'doc', 'docx', 'pdf', 'rtf', 'md'] }\r\n            ]\r\n        });\r\n        if (canceled) {\r\n            return [];\r\n        }\r\n        // Read the first file and return its content\r\n        try {\r\n            const content = fs.readFileSync(filePaths[0], 'utf8');\r\n            return { path: filePaths[0], content };\r\n        }\r\n        catch (error) {\r\n            console.error('Error reading file:', error);\r\n            return { error: 'Failed to read file' };\r\n        }\r\n    });\r\n    // Handle file save dialog\r\n    electron_1.ipcMain.handle('save-file-dialog', async (event, content) => {\r\n        if (!mainWindow)\r\n            return { success: false };\r\n        const { canceled, filePath } = await electron_1.dialog.showSaveDialog(mainWindow, {\r\n            filters: [\r\n                { name: 'Text Files', extensions: ['txt'] },\r\n                { name: 'Markdown Files', extensions: ['md'] }\r\n            ]\r\n        });\r\n        if (canceled || !filePath) {\r\n            return { success: false };\r\n        }\r\n        try {\r\n            fs.writeFileSync(filePath, content, 'utf8');\r\n            return { success: true, path: filePath };\r\n        }\r\n        catch (error) {\r\n            console.error('Error saving file:', error);\r\n            return { success: false, error: 'Failed to save file' };\r\n        }\r\n    });\r\n}\r\n// This method will be called when Electron has finished initialization\r\nelectron_1.app.whenReady().then(() => {\r\n    setupIPC();\r\n    createWindow();\r\n    electron_1.app.on('activate', () => {\r\n        if (electron_1.BrowserWindow.getAllWindows().length === 0) {\r\n            createWindow();\r\n        }\r\n    });\r\n});\r\n// Quit when all windows are closed, except on macOS\r\nelectron_1.app.on('window-all-closed', () => {\r\n    if (process.platform !== 'darwin') {\r\n        electron_1.app.quit();\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://digital-quill-publishing/./src/main/index.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/index.ts");
/******/ 	
/******/ })()
;