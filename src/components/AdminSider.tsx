import { ThunderboltOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import type { ItemType, MenuItemType } from "antd/es/menu/interface"
import Title from "antd/es/typography/Title"

interface AdminSider{
    collapsed: boolean
    setCollapsed: Function
    items: ItemType<MenuItemType>[]
}

function AdminSider({collapsed, setCollapsed, items}: AdminSider){
    return(<Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width={260}
        style={{ boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)', height: '100dvh' }}
    >
        <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
                width: 32, 
                height: 32, 
                background: '#fff', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                <ThunderboltOutlined style={{ color: '#001529', fontSize: '18px' }} />
            </div>
            {!collapsed && (
                <Title level={4} style={{ color: '#fff', margin: 0, fontSize: '18px' }}>
                Career<span style={{ color: '#40a9ff' }}>Control</span>
                </Title>
            )}
        </div>
        <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
        />
    </Sider>)
}
export default AdminSider