'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PokemonData, PokemonType, SearchFormProps } from '../types';
import getPokemonList from '../actions/getPokemonList';
import PokemonList from './PokemonList';

interface ISearchFormProps {
    types: SearchFormProps;
}

const SearchForm = ({ types }: ISearchFormProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [pokemons, setPokemons] = useState<PokemonData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getPokemonList({ selectedType, searchTerm });
            setPokemons(result);
        }
        fetchData();
    }, [searchTerm, selectedType]);

    return (
        <>
            <form className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <select className="p-2 bg-white border border-gray-300 rounded-md w-full sm:w-auto" onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
                    <option value="">Select Pokemon Type</option>
                    {
                        types && types.length > 0 && types.map(({ name }: PokemonType, key: number) => (
                            <option value={name} key={key}>
                                {name}
                            </option>
                        ))
                    }
                </select>
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search Pokemon"
                        className="p-2 pl-10 border border-gray-300 rounded-md w-full"
                        onChange={e => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                >
                    Search
                </button>
            </form>

            <PokemonList pokemons={pokemons} />
        </>
    );
};

export default SearchForm;
