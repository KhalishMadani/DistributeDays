const path = require("path")
const { app, 
    BrowserWindow,
    ipcMain 
} = require("electron")


const createWindow = () => {
    const win = new BrowserWindow ({
        width: 550,
        height: 850,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    })
    // win.removeMenu()
    win.loadFile('index.html')

    ipcMain.on("load-page", (event, page) => {
        win.loadFile(page)
    })

    // win.webContents.openDevTools()
}

app.whenReady().then( () => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
