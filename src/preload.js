const { ipcRenderer, contextBridge, remote} = require('electron');

// prints "pong"
console.log(ipcRenderer.sendSync('synchronous-message', 'xping'));

// prints "pong"
ipcRenderer.on('asynchronous-reply', (_, ...args) => console.log(...args));

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log("Hiii",arg) // prints "Hiii pong"
});

ipcRenderer.send('asynchronous-message', 'wping');
ipcRenderer
  .invoke('invoke-handle-message', 'ping')
  .then((reply) => console.log(reply));

contextBridge.exposeInMainWorld('ticket', {
  doMyThing: () => {
    console.log("hello")
  },

  getTheme: () => ipcRenderer.invoke('dark-mode:theme'), 
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),

  insertOne: (obj) => insertOne(obj),
  insertMany: (arr) => insertMany(arr),
  deleteOne: (id) => deleteOne(id),
  deleteMany: (arr) => deleteMany(arr),
  deleteAll: () => deleteAll(),
  getOne: (id) => getOne(id),
  getAll: () => getAll(),
  loadPreferences: () => ipcRenderer.invoke('load-prefs'),
  importData: () => {
    ipcRenderer
      .invoke('file:load')
      .then((reply) => console.log(reply))
  },
  saveContent: (content) => ipcRenderer.send('saveContent', content),
  content: () => ipcRenderer.invoke("loadContent")
});

// initial query for set up
function initDb() {
  ipcRenderer
    .invoke('databasePath', './tickets.db')
    .then((reply) => console.log(reply));
}
initDb();

function createDb() {
  ipcRenderer
    .invoke('executeScript', '../tickets.sql')
    .then((reply) => console.log(reply));
}
createDb();

// get one
function getOne(id) {
  ipcRenderer
    .invoke('executeQuery', "SELECT * FROM tickets WHERE ticket_id = ?;", [id])
    .then((reply) => console.log(reply));

  // ipcRenderer
  //   .invoke('tickets-db:getOne', id)
  //   .then((reply) => console.log(reply))
}

// get many
function getAll() {
  // ipcRenderer
  //   .invoke('executeQuery', "SELECT * FROM tickets;", 'all')
  //   .then((reply) => console.log(reply));

  ipcRenderer
    .invoke('tickets-db:getAll')
    .then((reply) => console.log(reply))
}

// insert one
function insertOne(obj) {
  ipcRenderer
    .invoke('executeQuery', "INSERT INTO tickets (ticket_id,ticket_no,ticket_status,ticket_pattern,ticket_price) VALUES (?, ?, ?, ?);", [obj.ticket_id,obj.ticket_no,obj.ticket_status,obj.ticket_pattern,obj.ticket_price])
    .then((reply) => console.log(reply));

  // ipcRenderer
  //   .invoke('tickets-db:insertOne', obj)
  //   .then((reply) => console.log(reply));
}

// delete one
function deleteOne(id) {
  ipcRenderer
    .invoke('executeQuery', "DELETE FROM tickets WHERE ticket_no = ?;", [id])
    .then((reply) => console.log(reply));

  // ipcRenderer
  //   .invoke('tickets-db:deleteOne', id)
  //   .then((reply) => console.log(reply));
}

// insert many
function insertMany(arr) {
  ipcRenderer
    .invoke('executeMany', "INSERT INTO tickets (ticket_id,ticket_no,ticket_status,ticket_pattern,ticket_price) VALUES (?, ?, ?, ?);", [arr.ticket_id,arr.ticket_no,arr.ticket_status,arr.ticket_pattern,arr.ticket_price])
    .then((reply) => console.log(reply));

  // ipcRenderer
  //   .invoke('tickets-db:insertMany', arr)
  //   .then((reply) => console.log(reply));
}

// delte many
function deleteMany(arr) {
  ipcRenderer
    .invoke('executeMany', "INSERT INTO tickets (ticket_id,ticket_no,ticket_status,ticket_pattern,ticket_price) VALUES (?, ?, ?, ?);", [arr.ticket_id,arr.ticket_no,arr.ticket_status,arr.ticket_pattern,arr.ticket_price])
    .then((reply) => console.log(reply));

  // ipcRenderer
  //   .invoke('tickets-db:deleteMany')
  //   .then((reply) => console.log(reply));
}

// delte all
function deleteAll() {
  ipcRenderer
    .invoke('executeQuery', `DROP TABLE tickets`)
    .then((reply) => console.log(reply));

  // ipcRenderer
  //   .invoke('tickets-db:deleteAll')
  //   .then((reply) => console.log(reply));
}

// update one
function updateOne(id, obj) {
  ipcRenderer
    .invoke('executeQuery', `DROP TABLE tickets`)
    .then((reply) => console.log(reply));

  // ipcRenderer
  //   .invoke('tickets-db:updateOne', id, obj)
  //   .then((reply) => console.log(reply));
}