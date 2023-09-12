const db = require("./contracts");

async function insertRow(identifier, contractAddress) {
  if (!identifier || !contractAddress) {
    throw new Error('Valores indefinidos');
  }

  try {
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO contracts (identifier, contractAddress) VALUES (?, ?)`,
        [identifier, contractAddress],
        function (error) {
          if (error) {
            reject(new Error(error.message));
            return;
          }
          console.log(`Inserted a row with the ID: ${this.lastID}`);
          resolve(this.lastID);
        }
      );
    });
  } catch (error) {
    throw error;
  }
}

async function selectAllContracts() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM contracts`, (error, rows) => {
        if (error) {
          reject(new Error(error.message));
          return;
        }
        
        resolve(rows);
      });
    });

    return rows;
  } catch (error) {
    throw error;
  }
}

async function selectContract(columnName, columnValue) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM contracts WHERE ${columnName} = ?`, [columnValue], (error, row) => {
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve(row);
    });
  });
}

module.exports = {
  insertRow,
  selectAllContracts,
  selectContract
}
