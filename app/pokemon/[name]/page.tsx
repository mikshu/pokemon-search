/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';

async function getPokemonDetails(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await res.json();
    return pokemon;
}

export default function PokemonDetails({ params }: { params: { name: string } }) {
    const pokemon = use(getPokemonDetails(params.name));

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

            <nav className="mb-6 text-sm text-gray-600">
                <Link href="/" className="text-blue-600 hover:underline">
                    Home
                </Link>
                {' → '}
                <span className="capitalize">{pokemon.name}</span>
            </nav>

            <div className="text-center">
                <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    height={200}
                    width={200}
                    alt={pokemon.name}
                    className='m-auto'
                />
                <h1 className="text-2xl font-bold mt-4 capitalize">
                    {pokemon.name}
                </h1>

                <p className="text-gray-600 mt-2">
                    Height: {pokemon.height} | Weight: {pokemon.weight}
                </p>

                <h2 className="text-lg font-semibold mt-6">Types:</h2>
                <ul className="flex justify-center space-x-4 mt-2">
                    {pokemon.types.map((type: any) => (
                        <li key={type.type.name} className="capitalize bg-gray-200 px-3 py-1 rounded-lg">
                            {type.type.name}
                        </li>
                    ))}
                </ul>

                <h2 className="text-lg font-semibold mt-6">Abilities:</h2>
                <ul className="flex flex-wrap justify-center space-x-4 mt-2">
                    {pokemon.abilities.map((ability: any) => (
                        <li key={ability.ability.name} className="capitalize bg-gray-200 px-3 py-1 rounded-lg">
                            {ability.ability.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
