import { FC, useState } from "react";
import { Layout as AntdLayout } from "antd";
import { Content, Footer, } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { CloseOutlined, CloseSquareTwoTone } from "@ant-design/icons";
/**
 * This component contains the layout of the app.
 */
const Layout: FC = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <AntdLayout className={'text-white h-screen overflow-clip bg-slate-900'}>
            <AntdLayout className="h-full">
                <Content className={`${collapsed ? 'w-full' : 'w-[60%] opacity-50 pointer-events-none'}  h-full transition-all`} onClick={() => setCollapsed(!collapsed)}>Content</Content>
                <Sider className="h-full bg-slate-700 absolute top-0 right-0 z-10 transition-all " width={collapsed ? '0%' : '40%'}>
                    <div className="p-2">
                        <button onClick={() => setCollapsed(true)} className="focus:outline-none">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="close" className="h-8 w-8" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                    </div>
                </Sider>
            </AntdLayout>
            <Footer className="bg-slate-800 w-full h-10 grid place-content-center bottom-0 absolute">Footer</Footer>
        </AntdLayout>
    );
}
export default Layout;