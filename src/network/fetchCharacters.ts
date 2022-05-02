import { globalFetch } from './globalFetch'

// This will be the response type of the single character
export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: [string]
  url: string
  created: string
}

/**
 * This is the response type for the api `https://rickandmortyapi.com/api/character/`
 */

export interface CharacterResponseType {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: Character[]
}

/**
 * This is the utility to fetch all the characters
 * character API is paginated and for the next pages we have to sent the `page` parameter
 * example: https://rickandmortyapi.com/api/character/?page=2
 *
 * @returns - The response from the server with type CharacterResponseType
 */
export const fetchCharacters = async (nextUrl: string): Promise<CharacterResponseType> => {
  return await globalFetch<CharacterResponseType>({
    url: nextUrl,
  })
}
