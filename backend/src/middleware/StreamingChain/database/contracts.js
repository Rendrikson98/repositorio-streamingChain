const fs = require("fs");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const filepath = path.join(__dirname, 'DBContracts.db');

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE contracts
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    identifier   VARCHAR(50) NOT NULL,
    contractAddress   VARCHAR(50) NOT NULL UNIQUE
  );
`);
}

module.exports = createDbConnection();
