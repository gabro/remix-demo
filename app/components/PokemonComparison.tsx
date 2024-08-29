import { useState } from "react";
import { compareSelectedPokemon, Pokemon } from "../api";
import { AudioPlayer } from "./AudioPlayer";

interface PokemonComparisonProps {
  comparisonPokemon: [Pokemon | null, Pokemon | null];
}

export function PokemonComparison({
  comparisonPokemon,
}: PokemonComparisonProps) {
  const [comparisonResult, setComparisonResult] = useState<{
    pokemon1Advantages: string[];
    pokemon2Advantages: string[];
  } | null>(null);

  const handleCompare = () => {
    if (comparisonPokemon[0] && comparisonPokemon[1]) {
      const result = compareSelectedPokemon(
        comparisonPokemon[0],
        comparisonPokemon[1]
      );
      setComparisonResult(result);
    }
  };

  return (
    <>
      <button
        onClick={handleCompare}
        disabled={!comparisonPokemon[0] || !comparisonPokemon[1]}
        className="block mx-auto px-6 py-2 text-lg bg-green-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed my-6"
      >
        Compare Selected Pokémon
      </button>

      {comparisonResult && (
        <div className="mt-6 bg-gray-100 p-4 sm:p-6 rounded-lg">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Comparison Results
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-start">
            {[0, 1].map((index) => (
              <div key={index} className="w-full sm:w-[45%] mb-6 sm:mb-0">
                <div className={index === 0 ? "transform scale-x-[-1]" : ""}>
                  <img
                    src={comparisonPokemon[index]!.spriteFront}
                    alt={comparisonPokemon[index]!.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-2 animate-bounce"
                  />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <h4 className="text-lg sm:text-xl font-medium text-center capitalize mr-2">
                    {comparisonPokemon[index]!.name}
                  </h4>
                  <AudioPlayer
                    src={comparisonPokemon[index]!.cry}
                    pokemonName={comparisonPokemon[index]!.name}
                  />
                </div>
                <div className="flex flex-wrap justify-center mb-4">
                  {comparisonPokemon[index]!.types.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 rounded-full text-white text-xs sm:text-sm mr-1 mb-1"
                      style={{
                        backgroundColor:
                          typeColors[type as keyof typeof typeColors],
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <h5 className="text-base sm:text-lg font-medium mb-2">
                  Advantages:
                </h5>
                <ul className="list-disc pl-5 text-sm sm:text-base">
                  {(index === 0
                    ? comparisonResult.pokemon1Advantages
                    : comparisonResult.pokemon2Advantages
                  ).map((advantage, advIndex) => (
                    <li
                      key={`p${index + 1}-${advIndex}`}
                      className={
                        advantage.includes("has no type advantages")
                          ? "text-gray-500 italic"
                          : ""
                      }
                    >
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
