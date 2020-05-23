require('dotenv').config()
const dB = require('./database/database');
dB.get();
const PokemonModule = require('./pokemon/pokemon.module');

(async () => {
    const initialIdPokemon = 1;
    const endIdPokemon = 807;
    for (let id = initialIdPokemon; id <= endIdPokemon; id++) {
        await PokemonModule.storePokemon(id);
    }
    console.log("pokemon completed")
    process.exit();
})();
