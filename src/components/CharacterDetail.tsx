import React, { FC, useContext, useEffect } from "react";
import { Episode, fetchEpisodes } from "../network/fetchEpisodes";
import { fetchLocation } from "../network/fetchLocation";
import { CharacterContext } from "./CharacterContextManagement";
import { Location } from '../network/fetchLocation'

const CharacterDetail: FC = () => {
    const { character, setCharacter } = useContext(CharacterContext)

    useEffect(() => {
        let newLocation: Location | undefined = undefined
        let newOrigin: Location | undefined = undefined
        let newEpisode: Episode[] | Episode | undefined = undefined
        const getUpdatedValue = async (): Promise<{ location?: Location, origin?: Location, episode?: Episode[] }> => {
            if (character?.basicInfo.location.url && character.basicInfo.location.url === character.basicInfo.origin.url && character.basicInfo.location.name !== 'unknown') {
                newLocation = await fetchLocation(character?.basicInfo.location.url)
            } else if (character?.basicInfo.location.url || character?.basicInfo.origin.url) {
                if (character.basicInfo.location.url) {
                    newLocation = await fetchLocation(character?.basicInfo.location.url)
                }
                if (character.basicInfo.origin.url) {
                    newOrigin = await fetchLocation(character?.basicInfo.origin.url)
                }
            }

            const episodeIds = character?.basicInfo.episode.map(each => each.split('/').pop() ?? '')
            const integerIds = episodeIds?.map(each => parseInt(each)).join(',') ?? ''
            if (integerIds.length && character) {
                newEpisode = await fetchEpisodes(integerIds)
            }
            return { location: newLocation, episode: Array.isArray(newEpisode) ? newEpisode : newEpisode ? [newEpisode] : undefined, origin: newOrigin }
        }

        getUpdatedValue().then(response => {
            if (character)
                setCharacter({ ...character, ...response })
        }).catch(console.error)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character?.basicInfo.id])


    return (
        <div className="flex flex-col w-full overflow-hidden">
            <div className="bg-white shadow w-full mx-2 sm:rounded-lg my-2">
                <div className="px-4 py-5 sm:px-6">
                    <span className="inline-block relative">
                        <img className="h-16 w-16 rounded-md" src={character?.basicInfo.image} alt={character?.basicInfo.name} />
                        <span className="absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 block border-2 border-white rounded-full">
                            <span className={`block h-4 w-4 rounded-full ${character?.basicInfo.status === 'Alive' ? 'bg-green-400' : character?.basicInfo.status === 'Dead' ? 'bg-red-400' : 'bg-gray-400'}`}></span>
                        </span>
                    </span>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {character?.basicInfo?.name ?? ''}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        from {character?.basicInfo.origin.name ?? ''}
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {character?.basicInfo.name ?? ''}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                species
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {character?.basicInfo.species ?? ''}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {character?.basicInfo.gender ?? ''}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                type
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {character?.basicInfo.type ? character.basicInfo.type : 'unknown'}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="overflow-scroll mb-10">
                <div className="bg-white shadow w-full mx-2 sm:rounded-lg">
                    <div className="px-4 py-2 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Location Information
                        </h3>
                    </div>
                    <div className="flex w-full">
                        <div className="border-t mt-4 border-gray-200 w-full">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {character?.location?.name ?? ''}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Dimension
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {character?.location?.dimension ?? ''}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Amount of residents</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {character?.location?.residents.length ?? ''}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        {character?.origin ?
                            <div className="border-t mt-4 border-gray-200 w-full">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {character.origin?.name ?? ''}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Dimension
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {character.origin?.dimension ?? ''}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Amount of residents</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {character.origin?.residents.length ?? ''}
                                        </dd>
                                    </div>
                                </dl>
                            </div> : null
                        }
                    </div>
                </div>
                {character?.episode?.length ?
                    <div className="bg-white shadow w-full mx-2 sm:rounded-lg mt-4">
                        <div className="px-4 py-2 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Name of the chapters the character is featured
                            </h3>
                        </div>
                        <ul className="-my-5 divide-y divide-gray-200 px-4 py-2 sm:px-6">
                            {
                                character.episode?.map((each) => {
                                    return (
                                        <li className="py-4" key={each.id}>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-500 truncate">{each.name}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div> : null}
            </div>
        </div>
    );
}

export default CharacterDetail;