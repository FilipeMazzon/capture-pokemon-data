const axios = require('axios')

const getPokemon = (id) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
}

const getEggGroup = (id) =>{
    return axios.get(`https://pokeapi.co/api/v2/egg-group/${id}`)
}

const getSpecialAbilities = (id) =>{
    return axios.get(`https://pokeapi.co/api/v2/ability/${id}`)
}

const getPokemonSpecies = (id) =>{
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
}

const getPokemonMoves = (id) =>{
    return axios.get(`https://pokeapi.co/api/v2/move/${id}/`)
}

module.exports = {
    getPokemon,
    getEggGroup,
    getSpecialAbilities,
    getPokemonSpecies,
    getPokemonMoves
}