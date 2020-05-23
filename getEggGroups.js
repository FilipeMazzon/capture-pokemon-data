require('dotenv').config()
const dB = require('./database/database');
dB.get();
const PokemonModule = require('./pokemon/pokemon.module');

(async () => {
    const initialIdEggGroup = 1;
    const endIdEggGroup = 15;
    for (let id = initialIdEggGroup; id <= endIdEggGroup; id++) {
        await PokemonModule.eggGroup(id);
    }
    console.log("egg group completed")
    process.exit();
})();
