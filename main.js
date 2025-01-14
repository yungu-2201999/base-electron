const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  ipcMain.handle('ping', () => 'pong')
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  // 用户不在MacOS上时，关闭所有窗口时退出应用
  if (process.platform !== 'darwin') app.quit()
})
