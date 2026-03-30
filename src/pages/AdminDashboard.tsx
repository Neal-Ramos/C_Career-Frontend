import { ArrowUpOutlined, BookOutlined, TeamOutlined, ThunderboltOutlined } from "@ant-design/icons"
import { Button, Card, Row, Table, Tag } from "antd"
import { Content } from "antd/es/layout/layout"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import AdminDashboardCards, { type IAdminDashboardCards } from "../components/AdminDashboardCards"
import type { ColumnsType } from "antd/es/table"



interface CandidateData {
  key: string;
  name: string;
  status: "Pending" | "Approved" | "Declined";
  date: string;
  applied: string
}

function AdminDashboard(){

    const columns: ColumnsType<CandidateData> = [
        {
            title: 'Candidate',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Applied For',
            dataIndex: 'applied',
            key: 'applied',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'default';
                if (status === 'Approved') color = 'success';
                if (status === 'Declined') color = 'volcano';
                if (status === 'Pending') color = 'warning';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <Text type="secondary">{text}</Text>,
        }
    ]
    const candidateData: CandidateData[] = [
        {key: "1", name: "Neal J. Ramos", status: "Pending", applied: "Frontend", date:"18-9-2004"}
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
        <Content style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
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
              extra={<Button type="link">View All</Button>}
              styles={{ body: { padding: 0 } }}
            >
                <Table
                    columns={columns} 
                    dataSource={candidateData} 
                    pagination={false}
                />
            </Card>
        </Content>
    )
}
export default AdminDashboard