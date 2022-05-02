import React, { FC, ReactNode, useState } from 'react'
import { Character } from '../network/fetchCharacters'
import { Episode } from '../network/fetchEpisodes'
import { Location } from '../network/fetchLocation'

interface CharacterProperties {
    basicInfo: Character
    location?: Location
    origin?: Location
    episode?: Episode[]
}
interface CharacterContextType {
    character?: CharacterProperties
    setCharacter: (input?: CharacterProperties) => unknown
}

export const CharacterContext = React.createContext<CharacterContextType>({
    character: undefined,
    setCharacter: () => null,
})

interface LanguageContextProviderProps {
    children: ReactNode
}

export const CharacterContextProvider: FC<LanguageContextProviderProps> = ({ children }: LanguageContextProviderProps) => {

    const setCharacter = (newCharacter?: CharacterContextType['character']) => {
        setSelectedCharacter({ ...selectedCharacter, character: newCharacter })
    }
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterContextType>({
        character: undefined,
        setCharacter: setCharacter
    })

    return (
        <CharacterContext.Provider value={selectedCharacter}>
            {children}
        </CharacterContext.Provider>
    )
}