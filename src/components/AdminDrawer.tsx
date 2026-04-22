import { DashboardOutlined, TeamOutlined, FileTextOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { Drawer, Menu, notification } from "antd"
import type { ItemType, MenuItemType } from "antd/es/menu/interface"
import { useNavigate, useLocation } from "react-router-dom"
import { useLogout } from "../Hooks/useAuthentication"

interface AdminDrawer{
    showDrawer: boolean
    setShowdrawer: (showDrawer: boolean) => void
}

function AdminDrawer({showDrawer, setShowdrawer}: AdminDrawer){
    const navigate = useNavigate()
    const location = useLocation()
    const logout = useLogout()

    const items: ItemType<MenuItemType>[] = [
        { key: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard'},
        { key: '/admin/jobs', icon: <TeamOutlined />, label: 'Jobs'},
        { key: '/admin/applications', icon: <FileTextOutlined />, label: 'Applications'},
        { key: '/admin/settings', icon: <SettingOutlined />, label: 'Settings', children: [
                { 
                    key: '/admin/settings/profile', 
                    icon: <UserOutlined />, 
                    label: 'Profile' 
                },
                {
                    key: 'logout',
                    icon: <LogoutOutlined />, 
                    label: 'Logout',
                }
            ],
        },
    ]
    const handleLogout = () => {
        logout.mutate({}, {
            onSuccess: () => {
                localStorage.clear()
                navigate("/login")
            },
            onError: () => {
                notification.error({title: "Something went Wrong!", description: "Server Error!"})
            }
        })
        console.log("Logout")
    }


    return (
        <Drawer
            open={showDrawer}
            onClose={() => setShowdrawer(false)}
        >
            <Menu
            selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
            onClick={(e) => {
                switch (e.key){
                    case "logout":{
                        handleLogout()
                        return
                    }
                    default:{
                        navigate(e.key)
                        setShowdrawer(false)
                    }
                }
            }}
        />
        </Drawer>
    )
}
export default AdminDrawer