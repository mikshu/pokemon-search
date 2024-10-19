import Image from 'next/image';
import Link from 'next/link';

interface PokemonData {
    name: string;
    sprite: string;
    id: number;
}

interface IProps {
    pokemons: PokemonData[];
}

export default function PokemonList({ pokemons }: IProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {pokemons.slice(0, 20).map((pokemon: PokemonData) => (
                <div
                    key={pokemon.name}
                    className="border rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow"
                >
                    <Image
                        src={pokemon?.sprite}
                        height={120}
                        width={120}
                        alt={pokemon.name}
                        className="mx-auto"
                    />
                    <h2 className="text-lg font-semibold mt-4 text-center capitalize">
                        {pokemon?.name}
                    </h2>
                    <Link href={`/pokemon/${pokemon.name}`}>
                        <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            Details →
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
