import { useMediaQuery } from 'react-responsive'

export const useIsSmallScreen = (): boolean =>
    useMediaQuery({
        maxWidth: 767
    })
