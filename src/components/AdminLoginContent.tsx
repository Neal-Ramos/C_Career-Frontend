import { ArrowRightOutlined, LockOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons"
import { Badge, Button, Card, Checkbox, Flex, Form, Input } from "antd"
import { Content } from "antd/es/layout/layout"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import OtpModal from "./OtpModal"
import { useState } from "react"

interface AdminLoginContent{
  showOtpModal: Function
}

function AdminLoginContent(){
    const [otpModal, setOtpModal] = useState(false)
    const [codeOwner, setCodeOwner] = useState<string>("")
    const isLoading = false

    const onFinish = (value: {password: string, username: string, remember: boolean}) => {
      console.log(value)
      setOtpModal(true)
      setCodeOwner(value.username)
    }

    return(
        <Content style={{ zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
          <div style={{ width: '100%', maxWidth: '420px', marginTop: '20px' }}>
            <Flex vertical align="center" style={{ marginBottom: '32px' }}>
              <Badge count="Admin" offset={[-10, 10]} color="#52c41a">
                <div style={{ 
                  background: '#fff', 
                  padding: '16px', 
                  borderRadius: '16px', 
                  marginBottom: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)' 
                }}>
                  <SafetyCertificateOutlined style={{ fontSize: '40px', color: '#002140' }} />
                </div>
              </Badge>
              <Title level={2} style={{ color: '#fff', margin: '12px 0 0 0', letterSpacing: '-0.5px' }}>
                C <span style={{ color: '#69b1ff' }}>Career</span> Control
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.65)', marginTop: '4px', fontSize: '14px' }}>
                Secure Administrator Portal
              </Text>
            </Flex>
            <Card 
              bordered={false} 
              style={{ 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                borderRadius: '12px'
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <Title level={4} style={{ margin: 0 }}>System Login</Title>
                <Text type="secondary" style={{ fontSize: '13px' }}>Enter your administrator credentials below.</Text>
              </div>

              <Form
                name="admin_login_form"
                layout="vertical"
                onFinish={(e) => onFinish(e)}
                size="large"
              >
                <Form.Item
                  label={<Text strong style={{ fontSize: '13px' }}>Admin Username</Text>}
                  name="username"
                  rules={[{ required: true, message: 'Admin username is required' }]}
                >
                  <Input 
                    prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
                    placeholder="e.g. admin_jane" 
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <Flex justify="space-between" style={{ width: '100%' }}>
                      <Text strong style={{ fontSize: '13px' }}>Password</Text>
                    </Flex>
                  }
                  name="password"
                  rules={[{ required: true, message: 'Password is required' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="••••••••"
                  />
                </Form.Item>

                <Flex justify="space-between" align="center" style={{ marginBottom: '24px' }}>
                  <Form.Item name="remember" valuePropName="checked" initialValue={true} noStyle>
                    <Checkbox style={{ fontSize: '13px' }}>Trust this device</Checkbox>
                  </Form.Item>
                  <Button type="link" size="small" style={{ fontSize: '13px' }}>
                    Reset Access?
                  </Button>
                </Flex>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    block 
                    loading={isLoading}
                    icon={<ArrowRightOutlined />}
                    iconPlacement="end"
                    style={{ 
                      height: '52px', 
                      fontWeight: '700', 
                      background: '#001529',
                      fontSize: '16px'
                    }}
                  >
                    Authenticate
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Text type="secondary" style={{ fontSize: '13px' }}>
                Authorized Personnel Only. <br />
                All login attempts are logged and monitored.
              </Text>
            </div>
          </div>
          <OtpModal isModalVisible={otpModal} setIsModalVisible={setOtpModal} codeOwner={codeOwner}/>
        </Content>
    )
}
export default AdminLoginContent