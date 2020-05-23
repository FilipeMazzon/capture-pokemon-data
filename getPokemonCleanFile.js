require('dotenv').config()
const dB = require('./database/database');
dB.get();
const genericDAO = require('./database/genericDAO');
const fs = require('fs');
const util = require('util')
const fsWriteFile = util.promisify(fs.writeFile);
(async () => {
    const pokemons = await genericDAO.getAll("pokemons");
    await fsWriteFile("pokemons.json", JSON.stringify(pokemons,null,2))
    process.exit();
})();
