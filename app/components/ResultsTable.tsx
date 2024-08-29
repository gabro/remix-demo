import { useAsyncValue } from "@remix-run/react";
import { useState } from "react";
import { PokemonDetailsDialog } from "./PokemonDetailsDialog";
import { Pokemon } from "../api";
import { PokemonComparison } from "./PokemonComparison";

export function ResultsTable() {
  const results = useAsyncValue() as Pokemon[];
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [comparisonPokemon, setComparisonPokemon] = useState<
    [Pokemon | null, Pokemon | null]
  >([null, null]);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setComparisonPokemon((prev) => {
      if (prev[0] === pokemon) return [null, prev[1]];
      if (prev[1] === pokemon) return [prev[0], null];
      if (!prev[0]) return [pokemon, prev[1]];
      if (!prev[1]) return [prev[0], pokemon];
      return [pokemon, prev[1]];
    });
  };

  const handleCheckboxChange = (pokemon: Pokemon) => {
    handlePokemonSelect(pokemon);
  };

  const handleDetailsClick = (pokemon: Pokemon, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Compare
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Types
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((pokemon) => (
              <tr
                key={pokemon.id}
                className={`border-b hover:bg-gray-50 cursor-pointer ${
                  comparisonPokemon.includes(pokemon) ? "bg-blue-100" : ""
                }`}
                onClick={() => handlePokemonSelect(pokemon)}
              >
                <td className="px-4 py-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={comparisonPokemon.includes(pokemon)}
                    onChange={() => handleCheckboxChange(pokemon)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <img
                    src={pokemon.spriteFront}
                    alt={pokemon.name}
                    className="w-12 h-12 sm:w-16 sm:h-16"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap capitalize">
                  {pokemon.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 rounded-full text-white text-xs"
                        style={{
                          backgroundColor:
                            typeColors[type as keyof typeof typeColors],
                        }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={(e) => handleDetailsClick(pokemon, e)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PokemonComparison comparisonPokemon={comparisonPokemon} />

      <PokemonDetailsDialog
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};
