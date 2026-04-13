import { ArrowUpOutlined, BookOutlined, TeamOutlined, ThunderboltOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Row, Space, Spin, Table, Tag } from "antd"
import { Content } from "antd/es/layout/layout"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import AdminDashboardCards, { type IAdminDashboardCards } from "../components/AdminDashboardCards"
import type { ColumnsType } from "antd/es/table"
import { useApplication } from "../Hooks/useApplications"
import type { Application } from "../Types/Applications"
import { useNavigate } from "react-router-dom"

function AdminDashboard(){
    const {data, isLoading, isError} = useApplication(1,10)
    const navigate = useNavigate()
 
    if(isLoading) return <Spin size="large" className="flex-1 justify-center"/>
    if(isError) return <div>Error...</div>
    const columns: ColumnsType<Application> = [
        {
            title: 'Applicant',
            ellipsis: true,
            width: 200,
            render: (_, record) => (
                <Space>
                    <Avatar>{record.email?.charAt(0)}</Avatar>
                    <div>
                        <Text strong>{record.lastName}, {record.firstName} {record.middleName?.charAt(0)||""}</Text>
                    </div>
                </Space>
            ),
            align:"center"
        },
        {
            title: 'Email',
            ellipsis: true,
            width: 200,
            render: (_, record) => (
                <Space>
                    <div>
                        <Text strong>{record.email}</Text>
                    </div>
                </Space>
            ),
            align:"center"
        },
        {
            title: 'Contact #',
            ellipsis: true,
            width: 200,
            render: (_, record) => (
                <Space>
                    <div>
                        <Text strong>{record.contactNumber}</Text>
                    </div>
                </Space>
            ),
            align:"center"
        },
        {
            title: 'Date Submission',
            ellipsis: true,
            width: 200,
            render: (_, record) => (
                <Space>
                    <div>
                        <Text strong>{new Date(record.dateSubmitted).toLocaleDateString()}</Text>
                    </div>
                </Space>
            ),
            align:"center"
        },
        {
            title: 'Status',
            ellipsis: true,
            width: 200,
            render: (_, record) => (
                <Space>
                    <div>
                        <Text strong>{record.status}</Text>
                    </div>
                </Space>
            ),
            align:"center"
        }
    ] 
    const cards: IAdminDashboardCards[] = [
        {
            textProps:{
                type: "success",
                style:{ fontSize: '12px' }
            },
            textValue:"12.5% since last month",
            TextIcon:<ArrowUpOutlined/>,
            title:"Total Applications",
            value:123,
            prefix:<TeamOutlined
                style={{ color: '#1677ff' }}
            />
        },
        {
            textProps:{
                type: "success",
                style:{ fontSize: '12px' }
            },
            textValue:"12.5% since last month",
            TextIcon:<ArrowUpOutlined/>,
            title:"Pending Applications",
            value:123,
            prefix:<TeamOutlined
                style={{ color: '#ebe534' }}
            />
        },
        {
            textProps:{
                type: "success",
                style:{ fontSize: '12px' }
            },
            textValue:"12.5% since last month",
            TextIcon:<ArrowUpOutlined/>,
            title:"Accepted Applicants",
            value:123,
            prefix:<TeamOutlined
                style={{ color: '#5ceb34' }}
            />
        },
        {
            textProps:{
                type: "success",
                style:{ fontSize: '12px' }
            },
            textValue:"12.5% since last month",
            TextIcon:<ArrowUpOutlined/>,
            title:"Jobs Available",
            value:123,
            prefix:<BookOutlined
                style={{ color: '#1677ff' }}
            />
        },
    ]
    
    return(
        <Content 
            style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}
        >
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <Title level={2} style={{ margin: 0 }}>System Overview</Title>
                <Text type="secondary">Welcome back to the Career Management Console.</Text>
              </div>
              <Button type="primary" size="large" icon={<ThunderboltOutlined />}>
                Generate Report
              </Button>
            </div>

            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                {cards.map(c => {
                    return <AdminDashboardCards
                        textProps={{
                            type:c.textProps?.type,
                            style:c.textProps?.style
                        }}
                        textValue={c.textValue}
                        TextIcon={c.TextIcon}
                        title={c.title}
                        value={c.value}
                        prefix={c.prefix}
                    />
                })}
            </Row>
            <Card 
              title="Recent Applications" 
              variant="borderless" 
              extra={<Button type="link" onClick={() => navigate("/admin/applications")}>View All</Button>}
              styles={{ body: { padding: 0 } }}
            >
                <Table
                        columns={columns}
                        dataSource={data?.data}
                        rowKey={record => record.applicationId}
                        pagination={false}
                        scroll={{ x: 800 }}
                    />
            </Card>
        </Content>
    )
}
export default AdminDashboard