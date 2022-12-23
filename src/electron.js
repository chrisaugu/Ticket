const { app, BrowserWindow, Menu, dialog, ipcMain, nativeTheme, autoUpdater, crashReporter, globalShortcut, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
// const sqlite = require('sqlite-electron');
const url = require('url');
const isDev = require('electron-is-dev');
// const log = require('electron-log');

const ENV = "dev";

// log.info('Initializing app');

// require('update-electron-app')();

let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

// let { width, height } = screen.getPrimaryDisplay().size;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    show: false,

    backgroundColor: 'lightgray',
    // title: config.productName,
    show: false,
    webPreferences: {
      defaultEncoding: 'UTF-8',
      enableRemoteModule: true,

      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: "./images/icon.png"
  });

  mainWindow.maximize();

  // mainWindow.setAlwaysOnTop(true, "screen-saver")     // - 2 -
  // mainWindow.setVisibleOnAllWorkspaces(true)          // - 3 -

  // and load the index.html of the app.
  if (ENV === "dev") {
    // for dev
    mainWindow.loadURL("http://localhost:3000/");
  }
  else if (ENV === "prod" || ENV === "production") {
    // for prod
    const startUrl = url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
   });
    mainWindow.loadURL(startUrl);
  } 
  else {
    throw new Error("wrong env");
  }

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform();
  if (platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      mainWindow.webContents.openDevTools()
    })
  } else if (platform === 'linux' || platform === 'win32') {
    globalShortcut.register('Control+Shift+I', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null);
    mainWindow.show();
  });

  mainWindow.webContents.on('crashed', () => {
    console.log('Window crashed!')
  })

  mainWindow.on('beforeunload', (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.whenReady().then(() => {
  createWindow()
});

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.allowRendererProcessReuse = true;


// sqlite.setdbPath('./tickets.db');

// ipcMain.handle('executeQuery', async (event, query, fetch, value) => {
//   return await sqlite.executeQuery(query, fetch, value);
// });

// ipcMain.handle('executeScript', async (event, scriptpath) => {
//   return await sqlite.executeScript(scriptpath);
// });

// ipcMain.handle('executeMany', async (event, query, values) => {
//   return await sqlite.executeQuery(query, values); 
// });

let knex = require("knex")({
  client: "sqlite3",
  useNullAsDefault: false,
  connection: {
    filename: path.join(__dirname, './tickets.db')
  }
});

knex.schema.hasTable('Tickets').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('Ticket', function(t) {
      t.increments('ticket_id').primary();
      t.string('ticket_no', 10);
      t.string('ticket_status', 10);
      t.integer('ticket_price');
      t.string('barcode', 20);
      t.string('barcode_text', 20);
    });
  }
});

ipcMain.handle('dark-mode:theme', () => {
  return nativeTheme.themeSource;
});

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  }
  else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
});

// // Listens for an 'update' event from a renderer
// ipcMain.on('update', (event, arg) => {
//   // sends arg to the renderer
//   mainWindow.webContents.send('target', arg)
//   console.log('arg:'+arg)
// });

// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log("hello: "+arg) // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// });

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log("says " + arg) // prints "ping"
//   event.returnValue = 'pong'
// });

// ipcMain.handle('invoke-handle-message', (event, arg) => {
//   console.log(arg)
//   return 'cpong'
// });

// ipcMain.on('asynchronous-message', (event, arg) => {
//   const sql = arg;
//   database.all(sql, (err, rows) => {
//       event.reply('asynchronous-reply', (err && err.message) || rows);
//   });
// });

ipcMain.handle('tickets-db:getOne', (event, arg) => {
  if (typeof arg == 'number') {
    return knex.from('Tickets').where('ticket_id', arg);
  }
  else {
    return knex.from('Tickets').where('ticket_no', arg);
  }
});

// ipcMain.on("mainWindowLoaded", function() {
//   let result = knex.select("FirstName").from("User");
//   result.then(function(rows){
//     mainWindow.webContents.send("resultSent", rows);
//   });
// });

// Returns [1] in "mysql", "sqlite", "oracle"; 
// [] in "postgresql" 
// unless the 'returning' parameter is set.
// knex('books').insert({title: 'Slaughterhouse Five'});

// Normalizes for empty keys on multi-row insert:
// knex('coords').insert([{x: 20}, {y: 30},  {x: 10, y: 20}]);

// Returns [2] in "mysql", "sqlite"; [2, 3] in "postgresql"
// knex
//   .insert(
//     [
//       { title: 'Great Gatsby' }, 
//       { title: 'Fahrenheit 451' }
//     ], 
//     ['id']
//   )
//   .into('books');

// knex.select('name')
//   .from('users')
//   .where('id', '>', 20)
//   .andWhere('id', '<', 200)
//   .limit(10)
//   .offset(x)
//   .then(function(rows) {
//     return _.pluck(rows, 'name');
//   })
//   .then(function(names) {
//     return knex.select('id')
//       .from('nicknames')
//       .whereIn('nickname', names);
//   })
//   .then(function(rows) {
//     console.log(rows);
//   })
//   .catch(function(error) {
//     console.error(error)
//   });

ipcMain.handle('tickets-db:getAll', (event, query, values) => {
  let result = knex.from('Tickets');
  // result.then(function(rows){
  //   return rows;
  //   // event.sender.send("resultSentx", rows);
  //   // event.reply('asynchronous-reply', (err && err.message) || rows);
  // });

  return result;
});

ipcMain.handle('tickets-db:insertOne', (event, arg) => {
  let result = knex('Tickets').insert(arg);
  return result;
});

ipcMain.handle('tickets-db:insertMany', (event, data) => {
  return knex.insert(data).into('Tickets');
});

ipcMain.handle('tickets-db:deleteOne', async (event, query, values) => {
  return knex.delete().from('Tickets').where('ticket_id', query);
});

ipcMain.handle('tickets-db:deleteAll', async (event, query, values) => {
  return knex.delete().from('Tickets');
});

ipcMain.handle('tickets-db:updateOne', async (event, query, values) => {
  return knex('Tickets').update('ticket_status', values).where('ticket_id', query);
});

ipcMain.handle('tickets-db:updateMany', async (event, query, values) => {
  console.log(event);
});

ipcMain.handle('file:load', async () => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  }).then(result => {
    if (result.canceled) {
      console.log('Dialog was canceled');
    } 
    else {
      const file = result.filePaths[0];
      // mainWindow.loadURL(`file://${file}`)
      console.log(`file://${file}`);

      // const csv = require('csv-parser');

      // fs.createReadStream()
      //   .pipe(csv())
      //   .on('data', (row) => {
      //     console.log(row);
      //   })
      //   .on('end', () => {
      //     console.log('CSV file successfully processed');
      //   });

      //   // Requiring the module
      // const reader = require('xlsx')

      // // Reading our test file
      // const file = reader.readFile('./test.xlsx')

      // let data = []

      // const sheets = file.SheetNames

      // for(let i = 0; i < sheets.length; i++)
      // {
      //   const temp = reader.utils.sheet_to_json(
      //     file.Sheets[file.SheetNames[i]])
      //     temp.forEach((res) => {
      //       data.push(res)
      //     })
      // }

      // // Printing data
      // console.log(data)
        
    }
  }).catch(err => {
    console.log(err);
  });


  // var filename = dialog.showSaveDialog({
  //   filters: [
  //     { name: 'CSV files', extensions: ['csv'] }
  //   ]
  // });

});

function update() {
  const server = 'https://ticket.christianaugustyn.me';
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

  // The following code won't work unless the app has been packaged.
  // You should only use the autoUpdater with packaged and code-signed
  // versions of your application.
  try {
    autoUpdater.setFeedURL(feed)
  } 
  catch (error) {
    console.log(error)
  }

  // Once you've done that, you can go ahead and ask for updates:
  // autoUpdater.checkForUpdates()

  autoUpdater.on('checking-for-update', () => {
    console.log('The autoUpdater is checking for an update')
  })

  autoUpdater.on('update-available', () => {
    console.log('The autoUpdater has found an update and is now downloading it!')
  })

  autoUpdater.on('update-not-available', () => {
    console.log('The autoUpdater has not found any updates :(')
  })

  autoUpdater.on('update-downloaded', (event, notes, name, date) => {
    console.log('The autoUpdater has downloaded an update!')
    console.log(`The new release is named ${name} and was released on ${date}`)
    console.log(`The release notes are: ${notes}`)

    // The update will automatically be installed the next time the
    // app launches. If you want to, you can force the installation
    // now:
    autoUpdater.quitAndInstall()
  })

};

function crashReport() {
  crashReporter.start({
    productName: 'YourName',
    companyName: 'YourCompany',
    submitURL: 'https://your-domain.com/url-to-submit',
    uploadToServer: true
  })
}

// const sound = require("sound-play");
// sound.play("file.mp3");
// const path = require("path");
// const filePath = path.join(__dirname, "file.mp3");
// sound.play(filePath);