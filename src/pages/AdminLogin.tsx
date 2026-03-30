import { ConfigProvider, Layout } from "antd"
import AdminLoginContent from "../components/AdminLoginContent"
import { Footer } from "antd/es/layout/layout"

function AdminLogin(){

    return(
        <ConfigProvider
            theme={{
                token: {
                colorPrimary: '#002140', // Darker professional primary for Admin
                borderRadius: 8,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                },
            }}
        >
            <Layout style={{ minHeight: '100vh', background: '#f0f2f5', position: 'relative', overflow: 'hidden' }}>
                <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '350px',
                    background: 'linear-gradient(135deg, #001529 0%, #002140 100%)',
                    zIndex: 0,
                }}
            />
                <AdminLoginContent/>
                <Footer style={{ 
                    textAlign: 'center', 
                    background: 'transparent', 
                    zIndex: 1, 
                    paddingBottom: '32px',
                    color: '#8c8c8c'
                    }}>
                    C Career Management Console v4.2.0 • © 2026
                </Footer>
            </Layout>
        </ConfigProvider>
    )
}
export default AdminLogin