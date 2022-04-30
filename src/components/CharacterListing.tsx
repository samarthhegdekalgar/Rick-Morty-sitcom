import { Empty } from "antd";
import { FC, useRef } from "react";
import { useGetInfiniteCharacters } from "../hooks/useGetInfiniteCharacters";
import CharacterContainer from "./CharacterContainer";
import EmptyData from "./EmptyData";

/**
 * This component is to list all the available characters.
 * This will fetch the characters from the API and display them.
 */
const CharacterListing: FC = () => {
    const { data, fetchNextPage, hasNextPage, error: hasError } = useGetInfiniteCharacters()
    const characters = data?.pages.flatMap(page => page.results)

    const listInnerRef = useRef(null);

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 20 && hasNextPage) {
                fetchNextPage()
            }
        }
    };
    console.log(characters, hasError)

    return (
        <>
            {
                !characters || hasError ?
                    <EmptyData /> :
                    <div className="grid grid-flow-row-dense lg:grid-cols-6 gap-3 grid-cols-1 h-full overflow-scroll" ref={listInnerRef} onScroll={onScroll}>
                        {characters?.map((character, index) => {
                            return (
                                <CharacterContainer
                                    key={character.id}
                                    image={character.image}
                                    index={index}
                                    name={character.name}
                                />
                            )
                        })}
                    </div>}
        </>
    )
}
export default CharacterListing;