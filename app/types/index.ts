export interface PokemonType {
  name: string;
  url: string;
}

export interface SearchFormProps {
  map(
    arg0: ({ name }: PokemonType, key: number) => import("react").JSX.Element
  ): import("react").ReactNode;
  length: number;
  types: PokemonType[];
}

export type PokemonData = {
  name: string;
  url: string;
  sprite: string;
  id: number;
};
