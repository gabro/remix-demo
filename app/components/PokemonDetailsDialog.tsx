import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

interface PokemonDetailsProps {
  pokemon: {
    id: number;
    name: string;
    types: string[];
    spriteFront: string;
    spriteBack: string;
  } | null;
  onClose: () => void;
}

export function PokemonDetailsDialog({
  pokemon,
  onClose,
}: PokemonDetailsProps) {
  if (!pokemon) return null;

  return (
    <Dialog isOpen={true} onDismiss={onClose} aria-label="Pokémon Details">
      <button className="close-button" onClick={onClose}>
        <span aria-hidden>×</span>
      </button>
      <h2 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h2>
      <div className="flex items-center mb-4">
        <img
          src={pokemon.spriteFront}
          alt={pokemon.name}
          className="w-32 h-32 mr-4"
        />
        <div>
          <p>
            <strong>ID:</strong> {pokemon.id}
          </p>
          <p>
            <strong>Types:</strong> {pokemon.types.join(", ")}
          </p>
        </div>
      </div>
    </Dialog>
  );
}
