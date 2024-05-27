import { getPokemonById, getPokemonByName, getPokemons, getTypes } from "../api/apiRest";
import { TextDecoder } from 'util';
global.TextDecoder = TextDecoder;
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
const { VITE_API_POKEMONS, VITE_API_TYPES } = process.env;

describe("Test apiRest:", () => {
    test("getPokemons should response with an array of pokemons", async () => {
        const res = await getPokemons(VITE_API_POKEMONS);
        expect(res).toBeDefined();
    });

    test("getPokemonById should response with the searched pokemon", async () => {
        const id = 1;
        const expectedPokemon = {
            "id": 1,
            "name": "bulbasaur",
            "hp": 45,
            "str": 49,
            "def": 49,
            "spd": 45,
            "height": 7,
            "weight": 69,
            "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            "types": [
                "grass",
                "poison"
            ]
        }
        const res = await getPokemonById(id, VITE_API_POKEMONS);
        expect(res).toBeDefined();
        expect(res).toEqual(expectedPokemon);
    });

    test("getPokemonByName should response with the searched pokemon", async () => {
        const name = "bulbasaur";
        const expectedPokemon = {
            "id": 1,
            "name": "bulbasaur",
            "hp": 45,
            "str": 49,
            "def": 49,
            "spd": 45,
            "height": 7,
            "weight": 69,
            "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            "types": [
                "grass",
                "poison"
            ]
        }
        const res = await getPokemonByName(name, VITE_API_POKEMONS);
        expect(res).toBeDefined();
        expect(res).toEqual(expectedPokemon);
    });

    test("getTypes should response with an array of types", async () => {
        const res = await getTypes(VITE_API_TYPES);
        expect(res).toBeDefined();
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeGreaterThan(0);
        expect(typeof res[0]).toBe('object');
    });
});