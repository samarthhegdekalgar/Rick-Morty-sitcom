import { FC, ReactNode, useContext } from 'react'
import { Layout as AntdLayout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import { useIsSmallScreen } from '../hooks/useIsSmallScreen'
import { CharacterContext } from './CharacterContextManagement'

interface LayoutProps {
  sliderContent: ReactNode
  mainContent: ReactNode
}
/**
 * This component contains the layout of the app.
 */
const Layout: FC<LayoutProps> = ({ mainContent, sliderContent }: LayoutProps) => {
  const { setCharacter, character } = useContext(CharacterContext)
  const isSmallScreen = useIsSmallScreen()

  return (
    <AntdLayout className={'text-white overflow-clip bg-slate-900 p-2 '}>
      <AntdLayout className="h-full">
        <Content
          className={`${
            !character ? 'w-full' : 'w-[60%] opacity-50 pointer-events-none'
          }  h-full transition-all overflow-hidden`}
        >
          {mainContent}
        </Content>
        <Sider
          className={`h-full bg-white absolute top-0 right-0 z-10 transition-all overflow-hidden`}
          width={!character ? '0%' : character && isSmallScreen ? '100%' : '40%'}
        >
          <div className="flex flex-col">
            <div className="py-3 px-4 border-b border-slate-200 flex items-center sticky">
              <button onClick={() => setCharacter(undefined)} className="focus:outline-none">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="close"
                  className="h-8 w-8 text-gray-400"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                </svg>
              </button>
            </div>
            <div className="flex">{sliderContent}</div>
          </div>
          <div />
        </Sider>
      </AntdLayout>
    </AntdLayout>
  )
}
export default Layout
