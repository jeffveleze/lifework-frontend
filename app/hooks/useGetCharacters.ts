'use client';

import { useQuery } from 'react-query';
import { useApi } from '../providers/ApiProvider';

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
};

export type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
};

export const useGetCharacters = () => {
  const api = useApi();
  const fetchCharacter = async () =>
    (await api.get<CharacterResponse>(`/character`)).data;
  const { data: characterResponse, isFetching } = useQuery(
    ['character'],
    fetchCharacter,
    {
      onError: error => console.error(error),
    },
  );
  const characters = characterResponse?.results || [];
  return { characters, isFetching };
};
