import { array, number, object, parse, string, InferOutput } from "valibot";

// Define the schema for a single Pokemon
const PokemonSchema = object({
  id: number(),
  name: string(),
  types: array(string()),
  spriteFront: string(),
  spriteBack: string(),
  cry: string(),
});

export type Pokemon = InferOutput<typeof PokemonSchema>;

// Define the schema for the array of Pokemon
const PokemonArraySchema = array(PokemonSchema);

// Type effectiveness data
const typeEffectiveness = {
  normal: { weaknesses: ["fighting"], strengths: [] },
  fire: {
    weaknesses: ["water", "ground", "rock"],
    strengths: ["grass", "ice", "bug", "steel"],
  },
  water: {
    weaknesses: ["electric", "grass"],
    strengths: ["fire", "ground", "rock"],
  },
  electric: { weaknesses: ["ground"], strengths: ["water", "flying"] },
  grass: {
    weaknesses: ["fire", "ice", "poison", "flying", "bug"],
    strengths: ["water", "ground", "rock"],
  },
  ice: {
    weaknesses: ["fire", "fighting", "rock", "steel"],
    strengths: ["grass", "ground", "flying", "dragon"],
  },
  fighting: {
    weaknesses: ["flying", "psychic", "fairy"],
    strengths: ["normal", "ice", "rock", "dark", "steel"],
  },
  poison: { weaknesses: ["ground", "psychic"], strengths: ["grass", "fairy"] },
  ground: {
    weaknesses: ["water", "grass", "ice"],
    strengths: ["fire", "electric", "poison", "rock", "steel"],
  },
  flying: {
    weaknesses: ["electric", "ice", "rock"],
    strengths: ["grass", "fighting", "bug"],
  },
  psychic: {
    weaknesses: ["bug", "ghost", "dark"],
    strengths: ["fighting", "poison"],
  },
  bug: {
    weaknesses: ["fire", "flying", "rock"],
    strengths: ["grass", "psychic", "dark"],
  },
  rock: {
    weaknesses: ["water", "grass", "fighting", "ground", "steel"],
    strengths: ["fire", "ice", "flying", "bug"],
  },
  ghost: { weaknesses: ["ghost", "dark"], strengths: ["psychic", "ghost"] },
  dragon: { weaknesses: ["ice", "dragon", "fairy"], strengths: ["dragon"] },
  dark: {
    weaknesses: ["fighting", "bug", "fairy"],
    strengths: ["psychic", "ghost"],
  },
  steel: {
    weaknesses: ["fire", "fighting", "ground"],
    strengths: ["ice", "rock", "fairy"],
  },
  fairy: {
    weaknesses: ["poison", "steel"],
    strengths: ["fighting", "dragon", "dark"],
  },
};

// Function to compare two Pokémon
export function comparePokemon(pokemon1: Pokemon, pokemon2: Pokemon) {
  const result = { pokemon1Advantages: [], pokemon2Advantages: [] };

  pokemon1.types.forEach((type1) => {
    pokemon2.types.forEach((type2) => {
      if (typeEffectiveness[type1]?.strengths.includes(type2)) {
        result.pokemon1Advantages.push(
          `${pokemon1.name}'s ${type1} is strong against ${pokemon2.name}'s ${type2}`
        );
      }
    });
  });

  pokemon2.types.forEach((type2) => {
    pokemon1.types.forEach((type1) => {
      if (typeEffectiveness[type2]?.strengths.includes(type1)) {
        result.pokemon2Advantages.push(
          `${pokemon2.name}'s ${type2} is strong against ${pokemon1.name}'s ${type1}`
        );
      }
    });
  });

  // Add messages if there are no advantages
  if (result.pokemon1Advantages.length === 0) {
    result.pokemon1Advantages.push(
      `${pokemon1.name} has no type advantages over ${pokemon2.name}`
    );
  }
  if (result.pokemon2Advantages.length === 0) {
    result.pokemon2Advantages.push(
      `${pokemon2.name} has no type advantages over ${pokemon1.name}`
    );
  }

  return result;
}

// Modify the getResultsForDate function
export async function getPokemon(): Promise<Pokemon[]> {
  const pokemonCount = 3;
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";

  try {
    const randomIds = Array.from(
      { length: pokemonCount },
      () => Math.floor(Math.random() * 898) + 1
    );

    const pokemonPromises = randomIds.map((id) =>
      fetch(`${baseUrl}/${id}`).then((res) => res.json())
    );

    const pokemonData = await Promise.all(pokemonPromises);
    const result = pokemonData.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(
        (type: { type: { name: string } }) => type.type.name
      ),
      spriteFront: pokemon.sprites.front_default,
      spriteBack: pokemon.sprites.back_default,
      cry: pokemon.cries.latest,
    }));

    // Validate the result using Valibot
    const validatedResult = parse(PokemonArraySchema, result);

    return new Promise((resolve) =>
      setTimeout(() => resolve(validatedResult), 500)
    );
  } catch (error) {
    console.error("Error fetching or validating Pokemon data:", error);
    return [];
  }
}

// Add a new function for comparing selected Pokémon
export function compareSelectedPokemon(pokemon1: Pokemon, pokemon2: Pokemon) {
  return comparePokemon(pokemon1, pokemon2);
}
