require('dotenv').config()
const dB = require('./database/database');
dB.get();
const PokemonModule = require('./pokemon/pokemon.module');

(async () => {
    const initialIdPokemon = 1;
    const endIdPokemon = 728;
    for (let id = initialIdPokemon; id <= endIdPokemon; id++) {
        await PokemonModule.moves(id);
    }
    console.log("moves completed")
    process.exit();
})();
