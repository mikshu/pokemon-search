import SearchForm from './components/SearchForm';

export async function getTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results;
}

export default async function HomePage() {
  const types = await getTypes();
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Pokémon Search App
        </h1>
        <SearchForm types={types} />
      </div>

    </>
  )
}
