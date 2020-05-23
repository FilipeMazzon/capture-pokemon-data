require('dotenv').config()
const dB = require('./database/database');
dB.get();
const PokemonModule = require('./pokemon/pokemon.module');

(async () => {
    const initialIdPokemon = 1;
    const endIdPokemon = 233;
    for (let id = initialIdPokemon; id <= endIdPokemon; id++) {
        await PokemonModule.specialAbilities(id);
    }
    console.log("special abilities completed")
    process.exit();
})();
