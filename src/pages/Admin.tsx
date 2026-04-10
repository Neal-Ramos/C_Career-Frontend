import { Avatar, Badge, Button, ConfigProvider, Layout, Space } from "antd"
import AdminSider from "../components/AdminSider"
import { useState } from "react"
import { BellOutlined } from "@ant-design/icons"
import { Outlet } from "react-router-dom"
import { Header } from "antd/es/layout/layout"
import Text from "antd/es/typography/Text"

function Admin(){
  const [collapsed, setCollapsed] = useState(false)

  return(<ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1677ff',
        borderRadius: 8,
        colorBgContainer: '#ffffff',
      },
      components: {
        Layout: {
          headerBg: '#ffffff',
          siderBg: '#001529',
        },
        Menu: {
          darkItemBg: '#001529',
          darkItemSelectedBg: '#1677ff',
        }
      },
    }}
  >
    <Layout>
        <AdminSider
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
        <Layout>
          <Header style={{ 
            padding: '0 24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end', 
            borderBottom: '1px solid #f0f0f0',
          }}>
            <Space size={24}>
              <Badge count={3} size="small">
                <Button type="text" icon={<BellOutlined style={{ fontSize: '18px' }} />} />
              </Badge>
              <Space>
                <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Admin Jane</div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Super User</Text>
                </div>
                <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" />
              </Space>
            </Space>
          </Header>
          <Outlet/>
        </Layout>
    </Layout>
  </ConfigProvider>)
}
export default Admin