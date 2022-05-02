import { useMediaQuery } from 'react-responsive'

export const useIsSmallScreen = (): boolean => {
    return useMediaQuery({
        maxWidth: 767,
    })
}
