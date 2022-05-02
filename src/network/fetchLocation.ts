import { globalFetch } from './globalFetch'

export interface Location {
    id: number,
    name: string
    type: string
    dimension: string
    residents: string[],
    url: string
    created: string
}



export const fetchLocation = async (url: string): Promise<Location> => {
    return await globalFetch<Location>({
        url: url,
    })
}