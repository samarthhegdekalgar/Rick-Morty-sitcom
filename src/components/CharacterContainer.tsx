import { FC } from "react"

export interface CharacterContainerProps {
    image: string
    name: string
    index: number
}

/**
 * This component holds the every character in the list.
 */
const CharacterContainer: FC<CharacterContainerProps> = ({ image, index, name }: CharacterContainerProps) => {
    return (
        <img
            src={image}
            key={name}
            alt={name}
            className={`${index % 2 === 0 ? 'col-span-2 row-span-2' : 'col-span-1'} place-self-stretch `}
        />
    )
}
export default CharacterContainer;