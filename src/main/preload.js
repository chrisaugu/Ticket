const { ipcRenderer, contextBridge, remote } = require("electron");
const BugSplat = require("bugsplat-node").BugSplatNode;

const bugsplat = new BugSplat("database", "name", "version");

// prints "pong"
// console.log(ipcRenderer.sendSync('synchronous-message', 'xping'));

// // prints "pong"
// ipcRenderer.on('asynchronous-reply', (_, ...args) => console.log(...args));

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log("Hiii",arg) // prints "Hiii pong"
// });

// ipcRenderer.send('asynchronous-message', 'wping');
// ipcRenderer
//   .invoke('invoke-handle-message', 'ping')
//   .then((reply) => console.log(reply));

window.onerror = async (messageOrEvent, source, lineno, colno, error) => {
  await bugsplat.post(error);
  ipcRenderer.send("rendererCrash");
};

contextBridge.exposeInMainWorld("ticket", {
  doMyThing: () => {
    console.log("hello");
  },

  getTheme: () => ipcRenderer.invoke("dark-mode:theme"),
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),

  insertOne: (obj) => insertOne(obj),
  insertMany: (arr) => insertMany(arr),
  deleteOne: (id) => deleteOne(id),
  deleteMany: (arr) => deleteMany(arr),
  deleteAll: () => deleteAll(),
  getOne: (id) => getOne(id),
  getAll: () => getAll(),
  changeStatus: (id, status) => updateOne(id, status),
  // updateAll: () => updateAll(),
  loadPreferences: () => ipcRenderer.invoke("load-prefs"),
  importData: () => {
    ipcRenderer.invoke("file:load").then((reply) => console.log(reply));
  },
  saveContent: (content) => ipcRenderer.send("saveContent", content),
  content: () => ipcRenderer.invoke("loadContent"),
});

// get one
function getOne(id) {
  // ipcRenderer
  //   .invoke('executeQuery', "SELECT * FROM tickets WHERE ticket_id = ?;", [id])
  //   .then((reply) => console.log(reply));

  return ipcRenderer.invoke("tickets-db:getOne", id);
}

// get many
function getAll() {
  // ipcRenderer
  //   .invoke('executeQuery', "SELECT * FROM tickets;", 'all')
  //   .then((reply) => console.log(reply));

  return ipcRenderer.invoke("tickets-db:getAll");
}

// insert one
function insertOne(obj) {
  // ipcRenderer
  //   .invoke('executeQuery', "INSERT INTO tickets (ticket_id,ticket_no,ticket_status,ticket_pattern,ticket_price) VALUES (?, ?, ?, ?);", [obj.ticket_id,obj.ticket_no,obj.ticket_status,obj.ticket_pattern,obj.ticket_price])
  //   .then((reply) => console.log(reply));

  return ipcRenderer.invoke("tickets-db:insertOne", obj);
}

// delete one
function deleteOne(id) {
  // ipcRenderer
  //   .invoke('executeQuery', "DELETE FROM tickets WHERE ticket_no = ?;", [id])
  //   .then((reply) => console.log(reply));

  return ipcRenderer.invoke("tickets-db:deleteOne", id);
}

// insert many
function insertMany(arr) {
  // ipcRenderer
  //   .invoke('executeMany', "INSERT INTO tickets (ticket_id,ticket_no,ticket_status,ticket_pattern,ticket_price) VALUES (?, ?, ?, ?);", [arr.ticket_id,arr.ticket_no,arr.ticket_status,arr.ticket_pattern,arr.ticket_price])
  //   .then((reply) => console.log(reply));

  return ipcRenderer.invoke("tickets-db:insertMany", arr);
}

// delte many
function deleteMany(arr) {
  for (let i = 0; i < arr.length; i++) {
    return ipcRenderer.invoke("tickets-db:deleteOne", arr[i]);
  }
}

// delete all
function deleteAll() {
  // ipcRenderer
  //   .invoke('executeQuery', `DROP TABLE tickets`)
  //   .then((reply) => console.log(reply));

  return ipcRenderer.invoke("tickets-db:deleteAll");
}

// update one
function updateOne(id, obj) {
  // ipcRenderer
  //   .invoke('executeQuery', 'UPDATE Part SET UnitPrice = 10.0 WHERE PartID = 1;')
  //   .then((reply) => console.log(reply));

  return ipcRenderer.invoke("tickets-db:updateOne", id, obj);
}
