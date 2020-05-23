require('dotenv').config()
const dB = require('./database/database');
dB.get();
const PokemonModule = require('./pokemon/pokemon.module');

(async () => {
    await PokemonModule.handlePokemons();
    console.log("pokemon completed")
    process.exit();
})();
