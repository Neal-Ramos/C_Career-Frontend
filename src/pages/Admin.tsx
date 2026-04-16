import { Avatar, Badge, Button, ConfigProvider, Layout, Space } from "antd"
import AdminSider from "../components/AdminSider"
import { BellOutlined } from "@ant-design/icons"
import { Outlet } from "react-router-dom"
import { Header } from "antd/es/layout/layout"
import Text from "antd/es/typography/Text"
import useActivityTracker from "../Hooks/useActivityTracker"
import { useAdminStore } from "../store/useAdminStore"

function Admin(){
  useActivityTracker();
  const { adminAccountContext } = useAdminStore()


  return(
  <ConfigProvider
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
        {
          <AdminSider
            className="hidden md:block"
        />
        }
        <Layout  className="max-h-dvh overflow-auto">
          <Header 
            style={{ 
              padding: '0 24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end', 
              borderBottom: '1px solid #f0f0f0',
            }
          }>
            <Space size={24}>
              <Badge count={3} size="small">
                <Button type="text" icon={<BellOutlined style={{ fontSize: '18px' }} />} />
              </Badge>
              <Space>
                <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{adminAccountContext?.lastName}, {adminAccountContext?.firstName} {adminAccountContext?.middleName&& adminAccountContext?.middleName[0]}.</div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{adminAccountContext?.email}</Text>
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