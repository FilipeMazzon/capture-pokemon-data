const PokemonService = require('./pokemon.service');
const genericDAO = require('../database/genericDAO');
const PokemonHelper = require('./pokemon.helper');
const {} = require("./pokemon.helper");

const {
    getInfoFromSpecie,
    pokemonCleanBuilder,
    pokemonBaseBuilder
} = require("./pokemon.factory");

const pokemonBrute = "pokemons_brute";
const pokemon_species = "pokemon_species"

const storePokemon = async (id) => {
    const response = await PokemonService.getPokemon(id);
    const pokemon = response.data;
    await genericDAO.insert(pokemon, pokemonBrute);
}

const eggGroup = async (id) => {
    const response = await PokemonService.getEggGroup(id);
    const eggGroup = response.data;
    await genericDAO.insert(eggGroup, "egg_group");
}

const specialAbilities = async (id) => {
    const response = await PokemonService.getSpecialAbilities(id);
    const specialAbilities = response.data;
    await genericDAO.insert(specialAbilities, "special_abilities");
}

const pokemonSpecies = async (id) => {
    const response = await PokemonService.getPokemonSpecies(id);
    const specialAbilities = response.data;
    await genericDAO.insert(specialAbilities, "pokemon_species");
}

const moves = async (id) => {
    const response = await PokemonService.getPokemonMoves(id);
    const moves = response.data;
    await genericDAO.insert(moves, "moves");
}


const handlePokemons = async () => {
    const [
        pokemonsBrute,
        pokemonSpeciesBrute,
        skills,
    ] = await Promise.all([
        genericDAO.getAll(pokemonBrute, {}),
        genericDAO.getAll(pokemon_species),
        genericDAO.getAll("moves")
    ])

    const pokemons = pokemonsBrute.map(pokemonBrute => {
        const pokemonClean = pokemonCleanBuilder(pokemonBrute);
        const pokemon = pokemonBaseBuilder(pokemonBrute);
        pokemon['stats'] = PokemonHelper.handleStats(pokemonClean.stats);
        pokemon['types'] = PokemonHelper.handleType(pokemonClean.types);
        const specieBrute = getInfoFromSpecie(pokemonSpeciesBrute[pokemon.id - 1]);
        pokemon['moves'] = PokemonHelper.handleSkills(skills, pokemonClean.moves);
        pokemon['abilities'] = PokemonHelper.handleSpecialAbilities(pokemonClean.abilities);
        Object.assign(pokemon, specieBrute)
        return pokemon;
    })
    await genericDAO.insertAll(pokemons,"pokemons")
    console.log(pokemons);
}

module.exports = {
    storePokemon,
    eggGroup,
    specialAbilities,
    pokemonSpecies,
    moves,
    handlePokemons
}