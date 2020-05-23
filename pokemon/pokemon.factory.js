const {handleEggGroup} = require("./pokemon.helper");
const pokemonCleanBuilder = (pokemonBrute) => {
    const {
        id,
        abilities,
        base_experience,
        height,
        moves,
        name,
        stats,
        types,
        weight
    } = pokemonBrute;
    return {
        id,
        abilities,
        base_experience,
        height,
        moves,
        name,
        stats,
        types,
        weight
    }
}

const pokemonBaseBuilder = (pokemonBrute) => {
    const {
        id,
        base_experience,
        height,
        name,
        weight
    } = pokemonBrute;
    return {
        id,
        base_experience,
        height,
        name,
        weight
    }
}

const getInfoFromSpecie = (specieBrute = {}) => {
    const {
        base_happiness,
        capture_rate,
        egg_groups,//need to handle,
        hatch_counter,
        is_baby,
    } = specieBrute;
    return {
        base_happiness,
        capture_rate,
        egg_groups: handleEggGroup(egg_groups),
        hatch_counter,
        is_baby,
    }
}



module.exports = {
    pokemonCleanBuilder,
    pokemonBaseBuilder,
    getInfoFromSpecie
}