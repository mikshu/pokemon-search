type GetPokemonList = {
  searchTerm: string;
  selectedType: string;
};

type PokemonData = { name: string; url: string; sprite: string; id: number };

async function getPokemonList({
  selectedType = "",
  searchTerm = "",
}: GetPokemonList) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
  const data = await res.json();
  let filteredPokemonData: PokemonData[] = data.results;
  //FOR SEARCH TERM
  if (searchTerm) {
    filteredPokemonData = filteredPokemonData.filter((pokemon: PokemonData) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  // For Selected Type
  if (selectedType) {
    const typeRes = await fetch(
      `https://pokeapi.co/api/v2/type/${selectedType.toLowerCase()}`
    );
    const typeData = await typeRes.json();

    const typeFilteredPokemon = typeData.pokemon.map(
      (p: { pokemon: PokemonData }) => p.pokemon.name
    );

    filteredPokemonData = filteredPokemonData.filter((pokemon: PokemonData) =>
      typeFilteredPokemon.includes(pokemon.name)
    );
  }
  // Get Images
  const pokemonWithImages = await Promise.all(
    filteredPokemonData.map(async (pokemon: PokemonData) => {
      const detailsRes = await fetch(pokemon.url);
      const details = await detailsRes.json();
      const sprite = details.sprites.front_default;
      return { ...pokemon, sprite };
    })
  );

  return pokemonWithImages;
}

export default getPokemonList;
