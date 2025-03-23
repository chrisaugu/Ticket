const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  ipcMain,
  nativeTheme,
  autoUpdater,
  crashReporter,
  globalShortcut,
  protocol,
} = require("electron");
// let {width, height} = require('electron').screen.getPrimaryDisplay().size;
const path = require("path");
const fs = require("fs");
const https = require("https");
const os = require("os");
const sqlite3 = require("sqlite3");
// const sqlite = require('sqlite-electron');
const Knex = require("knex");
const url = require("url");
const isDev = require("electron-is-dev");
// const log = require('electron-log');
const BugSplat = require("bugsplat-node").BugSplatNode;

// const config = require(path.join(__dirname, "/../../", "package.json"));
const config = require("../../package.json");

const ENV = "dev";
let mainWindow;

// log.info('Initializing app');

const protocolName = "app-file";

require("update-electron-app")();

app.setPath('crashDumps', '/path/to/crashes')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

function createWindow() {
  const splash = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 600,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY);
  splash.center();

  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    // title: config.productName+" "+config.version,
    // frame: false,
    // titleBarStyle: "hidden",
    // backgroundColor: 'lightgray',
    show: false,
    webPreferences: {
      defaultEncoding: "UTF-8",
      enableRemoteModule: true,

      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // preload: path.join(__dirname, 'preload.js')
    },
    icon: "./images/icon.png",
  });

  // mainWindow.maximize();
  // mainWindow.setAlwaysOnTop(true, "screen-saver")     // - 2 -
  // mainWindow.setVisibleOnAllWorkspaces(true)          // - 3 -

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // and load the index.html of the app.
  // if (ENV === "dev") {
  //   // for dev
  //   mainWindow.loadURL("http://localhost:3000/");
  // } else if (ENV === "prod" || ENV === "production") {
  //   // for prod
  //   const startUrl = url.format({
  //     pathname: path.join(__dirname, "/../build/index.html"),
  //     protocol: "file:",
  //     slashes: true,
  //   });
  //   mainWindow.loadURL(startUrl);
  // } else {
  //   throw new Error("wrong env");
  // }

  setTimeout(function () {
    splash.close();
    mainWindow.show();
  }, 5000);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform();
  if (platform === "darwin") {
    globalShortcut.register("Command+Option+I", () => {
      mainWindow.webContents.openDevTools();
    });
  } else if (platform === "linux" || platform === "win32") {
    globalShortcut.register("Control+Shift+I", () => {
      mainWindow.webContents.openDevTools();
    });
  }

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.setMenu(null);
    // mainWindow.show();
  });

  mainWindow.webContents.on("crashed", () => {
    console.log("Window crashed!");
    crashReport();
  });

  mainWindow.on("beforeunload", (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false;
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
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
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  protocol.registerSchemesAsPrivileged([
    { scheme: protocolName, privileges: { bypassCSP: true } },
  ]);

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, "");

    try {
      // return callback(decodeURIComponent(url));
      const filePath = decodeURIComponent(url);
      return callback({ path: filePath });
    } catch (error) {
      // Handle the error as needed
      console.error(error);
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.allowRendererProcessReuse = true;

// Listens for an 'update' event from a renderer
ipcMain.on("update", (event, arg) => {
  // sends arg to the renderer
  mainWindow.webContents.send("target", arg);
  console.log("arg:" + arg);
});
ipcMain.on("mainWindowLoaded", function () {
  // let result = knex.select("FirstName").from("User");
  // result.then(function(rows){
  //   mainWindow.webContents.send("resultSent", rows);
  // });
});
ipcMain.on('rendererCrash', function () {
  // Display an error and reload or quit the app here
  throw new Error("BugSplat!"); // this line is a test
})

const database = new sqlite3.Database("./tickets.db", (err) => {
  if (err) console.error("Database opening error: ", err);
});

ipcMain.on("asynchronous-message", (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply("asynchronous-reply", (err && err.message) || rows);
  });
});

ipcMain.handle("databasePath", async (event, dbPath) => {
  return await sqlite.setdbPath(dbPath);
});
// sqlite.setdbPath('./tickets.db');

ipcMain.handle("executeQuery", async (event, query, fetch, value) => {
  return await sqlite.executeQuery(query, fetch, value);
});

ipcMain.handle("executeScript", async (event, scriptpath) => {
  return await sqlite.executeScript(scriptpath);
});

ipcMain.handle("executeMany", async (event, query, values) => {
  return await sqlite.executeQuery(query, values);
});

let knex = new Knex({
  client: "sqlite3",
  // client: 'better-sqlite3',
  useNullAsDefault: true,
  connection: {
    // filename: './tickets.db',
    filename: path.join(__dirname, "./tickets.db"),
  },
});

// knex.schema.hasTable('Ticket').then(function(exists) {
//   if (!exists) {
//     return knex.schema.createTable('Ticket', function(t) {
//       t.increments('ticket_id').primary();
//       t.string('ticket_no', 10);
//       t.string('ticket_status', 10);
//       t.string('ticket_pattern', 10);
//       t.integer('ticket_price');
//       t.string('barcode', 20);
//       t.string('barcode_text', 20);
//     });
//   }
// });

ipcMain.handle("dark-mode:theme", () => {
  return nativeTheme.themeSource;
});

ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log("hello: " + arg); // prints "ping"
  event.sender.send("asynchronous-reply", "pong");
});

ipcMain.on("synchronous-message", (event, arg) => {
  console.log("says " + arg); // prints "ping"
  event.returnValue = "pong";
});

ipcMain.handle("invoke-handle-message", (event, arg) => {
  console.log(arg);
  return "cpong";
});

ipcMain.handle("tickets-db:getOne", (event, arg) => {
  console.log(arg);

  // let result = knex.from("Tickets")
  //                   .where('id', arg);

  // result.then(function(rows){
  //   return rows;
  // });
});

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

ipcMain.handle("tickets-db:getAll", (event, query, values) => {
  console.log(query);

  // let result = knex.from("Tickets");
  // result.then(function(rows){
  //   return rows;
  //   // event.sender.send("resultSentx", rows);
  //   // event.reply('asynchronous-reply', (err && err.message) || rows);
  // });

  // return result;
});

ipcMain.handle("tickets-db:insertOne", (event, arg) => {
  console.log(arg);

  // let result = knex('Tickets').insert(arg);
  // return result;
});

ipcMain.handle("tickets-db:insertMany", (event, data) => {
  console.log(data);

  // let result = knex
  //   .insert(data)
  //   .into('Tickets');

  // return result;
});

ipcMain.handle("tickets-db:deleteOne", async (event, query, values) => {
  console.log(event);

  // knex('Tickets')
  //   .where('id', query)
  //   .del();
});

ipcMain.handle("tickets-db:deleteAll", async (event, query, values) => {
  console.log(event);

  // knex('Tickets')
  //   .delete(query)
  //   .where('id', query)
  //   .del();
});

ipcMain.handle("tickets-db:updateOne", async (event, query, values) => {
  // return await sqlite.executeMany(query, values)
  console.log(event);
});

ipcMain.handle("tickets-db:updateMany", async (event, query, values) => {
  // return await sqlite.executeMany(query, values)
  console.log(event);
});

ipcMain.handle("file:load", async () => {
  dialog
    .showOpenDialog(mainWindow, {
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.canceled) {
        console.log("Dialog was canceled");
      } else {
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
    })
    .catch((err) => {
      console.log(err);
    });

  // var filename = dialog.showSaveDialog({
  //   filters: [
  //     { name: 'CSV files', extensions: ['csv'] }
  //   ]
  // });
});

function update() {
  const server = "https://ticket.christianaugustyn.me";
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

  // The following code won't work unless the app has been packaged.
  // You should only use the autoUpdater with packaged and code-signed
  // versions of your application.
  try {
    autoUpdater.setFeedURL(feed);
  } catch (error) {
    console.log(error);
  }

  // Once you've done that, you can go ahead and ask for updates:
  // autoUpdater.checkForUpdates()

  autoUpdater.on("checking-for-update", () => {
    console.log("The autoUpdater is checking for an update");
  });

  autoUpdater.on("update-available", () => {
    console.log(
      "The autoUpdater has found an update and is now downloading it!"
    );
  });

  autoUpdater.on("update-not-available", () => {
    console.log("The autoUpdater has not found any updates :(");
  });

  autoUpdater.on("update-downloaded", (event, notes, name, date) => {
    console.log("The autoUpdater has downloaded an update!");
    console.log(`The new release is named ${name} and was released on ${date}`);
    console.log(`The release notes are: ${notes}`);

    // The update will automatically be installed the next time the
    // app launches. If you want to, you can force the installation
    // now:
    autoUpdater.quitAndInstall();
  });

  // if (process.platform === 'win32') {
  //     const file = fs.createWriteStream(`./sqlite-${process.platform}-${process.arch}.exe`);
  //     https.get(`https://github.com/tmotagam/sqlite-electron/releases/download/v2.2.5/sqlite-${process.platform}-${process.arch}.exe`, (response) => {
  //         if (response.statusCode === 200) {
  //             response.pipe(file);
  //             file.on("finish", () => {
  //                 file.close();
  //                 console.log("Download Completed")
  //             });
  //         } else if (response.statusCode === 302) {
  //             https.get(response.headers.location, (response) => {
  //                 if (response.statusCode === 200) {
  //                     response.pipe(file);
  //                     file.on("finish", () => {
  //                         file.close();
  //                         console.log("Download Completed")
  //                     });
  //                 } else {
  //                     throw { code: response.statusCode, message: response.statusMessage, url: `https://github.com/tmotagam/sqlite-electron/releases/download/v2.2.5/sqlite-${process.platform}-${process.arch}.exe` }
  //                 }
  //             })
  //         } else {
  //             throw { code: response.statusCode, message: response.statusMessage, url: `https://github.com/tmotagam/sqlite-electron/releases/download/v2.2.5/sqlite-${process.platform}-${process.arch}.exe` }
  //         }
  //     }).on("error", (e) => {
  //         throw e
  //     })
  // } else {
  //     const file = fs.createWriteStream(`./sqlite-${process.platform}-${process.arch}`, { mode: 0o744 });
  //     https.get(`https://github.com/tmotagam/sqlite-electron/releases/download/v2.2.5/sqlite-${process.platform}-${process.arch}`, (response) => {
  //         if (response.statusCode === 200) {
  //             response.pipe(file);
  //             file.on("finish", () => {
  //                 file.close();
  //                 console.log("Download Completed")
  //             });
  //         } else if (response.statusCode === 302) {
  //             https.get(response.headers.location, (response) => {
  //                 if (response.statusCode === 200) {
  //                     response.pipe(file);
  //                     file.on("finish", () => {
  //                         file.close();
  //                         console.log("Download Completed")
  //                     });
  //                 } else {
  //                     throw { code: response.statusCode, message: response.statusMessage, url: `https://github.com/tmotagam/sqlite-electron/releases/download/v2.2.5/sqlite-${process.platform}-${process.arch}` }
  //                 }
  //             })
  //         } else {
  //             throw { code: response.statusCode, message: response.statusMessage, url: `https://github.com/tmotagam/sqlite-electron/releases/download/v2.2.5/sqlite-${process.platform}-${process.arch}` }
  //         }
  //     }).on("error", (e) => {
  //         throw e
  //     })
  // }
}
process.on('unhandledRejection', javaScriptErrorHandler)
process.on('uncaughtException', javaScriptErrorHandler)

const javaScriptErrorHandler = async (error) => {
  await bugsplat.post(error);
  app.quit();
}

function crashReport() {
  const bugsplat = new BugSplat(config.scripts.database, config.name, config.version);
  bugsplat.setDefaultAppKey(appKey); // Additional metadata that can be queried via BugSplat's web application
  bugsplat.setDefaultUser(user); // The name or id of your user
  bugsplat.setDefaultEmail(email); // The email of your user 
  bugsplat.setDefaultDescription(description); // A description placeholder that can be overridden at crash time
  bugsplat.setDefaultAdditionalFilePaths([paths]); // Paths to files to be sent to BugSplat at post time (limit 1MB) 
  bugsplat.postAndExit(error, options); // Wrapper for post that calls process.exit(1) after posting error to BugSplat
  bugsplat.post(error, options); // Aysnc function that posts an arbitrary Error object to BugSplat
  // If the values options.appKey, options.user, options.email, options.description, options.additionalFilePaths are set the corresponding default values will be overwritten
  // Returns a promise that resolves with properties: error (if there was an error posting to BugSplat), response (the response from the BugSplat crash post API), and original (the error passed by bugsplat.post)

  crashReporter.start({
    productName: "Ticket",
    companyName: "Fantastix",
    submitURL: 'http://localhost:3000/api/app-crashes',
    // submitURL: `https://${config.database}.bugsplat.com/post/electron/v2/crash.php`,
    ignoreSystemCrashHandler: true,
    rateLimit: false,
    uploadToServer: true,
    // Add any extra parameters you want to include in the crash report
    extra: {
      appVersion: "1.0.0",
      userIdentifier: "user_id",
    },
    globalExtra: {
      "product": config.name,
      "version": config.version,
      "key": "en-US",
      "email": "fred@bugsplat.com",
      "comments": "BugSplat rocks!",
    }
  });
}
