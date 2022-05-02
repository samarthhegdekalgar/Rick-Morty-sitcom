import { FC, useContext } from "react"
import { Character } from "../network/fetchCharacters"
import { CharacterContext } from "./CharacterContextManagement"
export interface CharacterContainerProps {
    image: string
    name: string
    index: number
    detailedObject: Character
}

/**
 * This component holds the every character in the list.
 */
const CharacterContainer: FC<CharacterContainerProps> = ({ image, index, name, detailedObject }: CharacterContainerProps) => {
    const contextState = useContext(CharacterContext)
    return (

        <img
            src={image}
            key={name}
            alt={name}
            onClick={() => {
                contextState.setCharacter({ basicInfo: detailedObject, location: undefined, origin: undefined, episode: undefined })
            }}
            className={`${index % 2 === 0 ? 'col-span-2 row-span-2' : 'col-span-1'} place-self-stretch rounded-md hover:cursor-pointer border-2 border-transparent hover:border-gray-500 focus:outline-none`}
        />

    )
}
export default CharacterContainer;