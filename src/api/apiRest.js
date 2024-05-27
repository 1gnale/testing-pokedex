import axios from 'axios'
export const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";
export const URL_ESPECIES = "https://pokeapi.co/api/v2/pokemon-species";
export const URL_EVOLUCIONES = "https://pokeapi.co/api/v2/evolution-chain";

export const getPokemons = async (url) => {
    const res = await axios.get(url || import.meta.env.VITE_API_POKEMONS)
    return res.data
}

export const getPokemonById = async (id, url) => {
    const res = await axios.get(url ? `${url}/${id}` : `${import.meta.env.VITE_API_POKEMONS}/${id}`)
    return res.data
}

export const getPokemonByName = async (name, url) => {
    const res = await axios.get(url ? `${url}/?name=${name}` :`${import.meta.env.VITE_API_POKEMONS}/?name=${name}`)
    return res.data
}

export const getTypes = async (url) => {
    const res = await axios.get(url || import.meta.env.VITE_API_TYPES)
    return res.data
}