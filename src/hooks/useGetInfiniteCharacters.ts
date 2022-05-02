import { InfiniteQueryObserverResult, useInfiniteQuery } from 'react-query'
import { RQ_LOAD_ALL_CHARACTERS } from '../constants/queryKeys'
import { CharacterResponseType, fetchCharacters } from '../network/fetchCharacters'

/**
 * This hook will help us to fetch all the characters
 * we are using react-query for fetching infinite data
 * this way we can avoid all the manual states like loading, error, fetching etc
 */
export const useGetInfiniteCharacters = (): InfiniteQueryObserverResult<CharacterResponseType> => {
  return useInfiniteQuery(
    [RQ_LOAD_ALL_CHARACTERS],
    ({ pageParam }: { pageParam?: string }) => {
      /**
       *  pageParam is option argument and it might be undefined or null
       *  whenever we have next page then react query will make sure hasNextPage is true
       *  and we can get the next page data by calling fetchNextPage method
       * */
      return fetchCharacters(pageParam ?? 'https://rickandmortyapi.com/api/character/')
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPageData) => {
        return lastPageData.info.next
      },
    }
  )
}
