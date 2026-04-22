import { Avatar, Badge, Button, Card, Col, DatePicker, Divider, Form, Input, Layout, notification, Row, Space } from "antd"
import { useAdminStore } from "../store/useAdminStore"
import { Content } from "antd/es/layout/layout"
import { CalendarOutlined, CloseOutlined, EditOutlined, IdcardOutlined, KeyOutlined, MailOutlined, SafetyCertificateOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons"
import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"
import { useState } from "react"
import { useForm } from "antd/es/form/Form"
import dayjs from "dayjs"
import type { AdminAccount } from "../Types/AdminAccounts"
import type { IUpdateAdminAccountReq } from "../global/IAdminAccount"
import { useUpdateAdminAccount } from "../Hooks/useAdminAccounts"
import AdminChangePassModal from "../components/AdminChangePassModal"
import { handleError } from "../global/ErrorHandler"

function AdminProfile(){
    const [form] = useForm()
    const updateAdminAccount = useUpdateAdminAccount()
    const { adminAccountContext, setAdminContext } = useAdminStore()
    const [isEditing, setIsEditing] = useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)

    const handleOnFinish = (data: IUpdateAdminAccountReq) => {
        data.birthDate = new Date(data.birthDate).toISOString()

        updateAdminAccount.mutate(data, {
            onSuccess: (data) => {
                notification.success({title: "Account Updated", description: "Your Account in Now Updated!"})
                setAdminContext(data.data)
                setIsEditing(false)
            },
            onError: (error) => {
                handleError(error)
            }
        })

    }

    if(!adminAccountContext) return<></>
    return(
        <Layout style={{ background: '#f0f2f5', padding: '24px' }}>
            <AdminChangePassModal isPasswordModalVisible={isPasswordModalVisible} setIsPasswordModalVisible={setIsPasswordModalVisible}/>
            <Content>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={8}>
                            <Space orientation="vertical" size={24} style={{ width: '100%' }}>
                                <Card className="shadow-sm" style={{ textAlign: 'center', borderRadius: '12px' }}>
                                    <Badge count="Admin" offset={[-10, 110]} color="#1890ff">
                                        <Avatar 
                                            size={120} 
                                            icon={<UserOutlined />} 
                                            style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}
                                        />
                                    </Badge>
                                    <Title level={4} style={{ marginTop: '16px', marginBottom: '4px' }}>
                                        {adminAccountContext.firstName} {adminAccountContext.lastName}
                                    </Title>
                                    <Text type="secondary">{adminAccountContext.email}</Text>

                                    <Divider />

                                    <Space orientation="vertical" style={{ width: '100%' }}>
                                        <Button 
                                            block 
                                            icon={<KeyOutlined />} 
                                            onClick={() => setIsPasswordModalVisible(true)}
                                            >
                                            Change Password
                                            </Button>
                                            {!isEditing ? (
                                            <Button 
                                                block 
                                                type="primary" 
                                                icon={<EditOutlined />} 
                                                onClick={() => setIsEditing(true)}
                                            >
                                                Edit Profile
                                            </Button>
                                            ) : (
                                            <Space style={{ width: '100%' }}>
                                                <Button 
                                                    danger 
                                                    icon={<CloseOutlined />} 
                                                    onClick={() => setIsEditing(false)}
                                                    style={{ flex: 1 }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button 
                                                    type="primary" 
                                                    icon={<SaveOutlined />}
                                                    style={{ flex: 1 }}
                                                    onClick={() => form.submit()}
                                                >
                                                    Save
                                                </Button>
                                            </Space>
                                        )}
                                    </Space>
                                </Card>
                                <Card 
                                    style={{ 
                                        borderRadius: '12px', 
                                        background: 'linear-gradient(135deg, #597ef7 0%, #2f54eb 100%)',
                                        border: 'none'
                                    }}
                                >
                                    <Space orientation="vertical" size={12}>
                                        <SafetyCertificateOutlined style={{ fontSize: '32px', color: 'rgba(255,255,255,0.8)' }} />
                                        <div>
                                        <Title level={5} style={{ color: '#fff', margin: 0 }}>Security Status</Title>
                                        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', display: 'block', marginTop: '4px' }}>
                                            Your account is currently secured with standard administrator privileges.
                                        </Text>
                                        </div>
                                    </Space>
                                </Card>
                            </Space>
                        </Col>

                        <Col xs={24} md={16}>
                            <Card 
                                title={<span><IdcardOutlined /> Personal Information</span>} 
                                className="shadow-sm"
                                style={{ borderRadius: '12px' }}
                            >
                                <Form
                                    form={form}
                                    layout="vertical"
                                    initialValues={{
                                        ...adminAccountContext,
                                        birthDate: dayjs(adminAccountContext.birthDate)
                                    }}
                                    onFinish={(val: AdminAccount) => handleOnFinish(val)}
                                >
                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                    <Form.Item label="First Name" name="firstName"
                                        rules={[{required: true}]}
                                    >
                                        {isEditing ? <Input /> : <Text strong>{adminAccountContext.firstName}</Text>}
                                    </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                    <Form.Item label="Last Name" name="lastName"
                                        rules={[{required: true}]}
                                    >
                                        {isEditing ? <Input /> : <Text strong>{adminAccountContext.lastName}</Text>}
                                    </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                    <Form.Item label="Middle Name" name="middleName">
                                        {isEditing ? <Input placeholder="N/A" /> : <Text strong>{adminAccountContext.middleName || "-"}</Text>}
                                    </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                    <Form.Item label="Username" name="userName"
                                        rules={[{required: true}]}
                                    >
                                        {isEditing ? <Input /> : <Text strong>{adminAccountContext.userName}</Text>}
                                    </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item label="Email Address" name="email"
                                    rules={[{required: true}]}
                                >
                                    {isEditing ? <Input prefix={<MailOutlined />} /> : <Text strong>{adminAccountContext.email}</Text>}
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                    <Form.Item label="Birth Date" name="birthDate"
                                        rules={[{required: true}]}
                                    >
                                        {isEditing ? (
                                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                                        ) : (
                                        <Text strong>
                                            <CalendarOutlined style={{ marginRight: '8px' }} />
                                            {dayjs(adminAccountContext.birthDate).format('MMMM D, YYYY')}
                                        </Text>
                                        )}
                                    </Form.Item>
                                    </Col>
                                </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}
export default AdminProfile