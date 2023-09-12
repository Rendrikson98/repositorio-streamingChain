const db = require('./querys');
const teste = async () => {
  console.log(await db.selectAllContracts())
}

teste()