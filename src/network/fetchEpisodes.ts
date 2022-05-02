import { globalFetch } from './globalFetch'

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}
export const fetchEpisodes = (episodeId: string): Promise<Episode[] | Episode> => {
  return globalFetch<Episode[] | Episode>({
    url: `https://rickandmortyapi.com/api/episode/${episodeId}`,
    method: 'GET',
  })
}
