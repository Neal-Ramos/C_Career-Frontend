import { FilterOutlined, SearchOutlined } from "@ant-design/icons"
import { Avatar, Badge, Button, Card, Col, Input, Row, Select, Space, Spin, Table } from "antd"
import { Option } from "antd/es/mentions"
import type { ColumnsType } from "antd/es/table"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import { useState } from "react"
import { useApplication } from "../Hooks/useApplications"
import { Content } from "antd/es/layout/layout"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import type { Application } from "../Types/Applications"

function AdminApplications(){
    const {applicationId} = useParams()
    const navigate = useNavigate()
    const {data, isLoading, isError} = useApplication(1,5)
    const [searchText, setSearchText] = useState("")
    const [statusFilter, setStatusFilter] = useState<string|null>()
    const [jobFilter, setJobFilter] = useState<string|null>()

    if (applicationId) return <Outlet/>
    if (isLoading) return <Spin size="large" className="flex-1 justify-center"/>
    if (isError) return <div>Error...</div>

    const jobTitles = [
        {label: "test", key: 1},
        {label: "test", key: 2},
        {label: "test", key: 3},
    ]
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
        },
        {
            title: 'Action',
            ellipsis: true,
            width: 200,
            render: (value) => (
                <Space>
                    <Button variant="outlined" type="primary" onClick={() => navigate(`/admin/applications/${value}`)}>View</Button>
                </Space>
            ),
            align:"center",
            dataIndex: "applicationId"
        }
    ]
    return(
        <Content style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Applications</Title>
                <Text type="secondary">Review and manage candidate submissions across all active roles.</Text>
                <Card variant="borderless" style={{ marginBottom: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} md={8}>
                            <Input
                                placeholder="Search by name or email..."
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                allowClear
                            />
                        </Col>
                        <Col xs={12} md={5}>
                            <Select
                                placeholder="Filter by Job"
                                style={{ width: '100%' }}
                                onChange={value => setJobFilter(value)}
                                allowClear
                                suffixIcon={<FilterOutlined />}
                                value={jobFilter}
                                >
                                {jobTitles.map(title => (
                                    <Option key={title.key.toString()} value={title.label}/>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={12} md={5}>
                            <Select
                                placeholder="Status"
                                style={{ width: '100%' }}
                                onChange={value => setStatusFilter(value)}
                                allowClear
                                value={statusFilter}
                            >
                                <Option value="Pending" key="1"/>
                                <Option value="Accepted" key="2"/>
                                <Option value="Rejected" key="3"/>
                            </Select>
                        </Col>
                        <Col xs={24} md={6} style={{ textAlign: 'right' }}>
                            <Space>
                                <Badge count={data?.meta.TotalRecord} overflowCount={999} color="#1677ff">
                                    <Text type="secondary" style={{ marginRight: 8 }}>Results</Text>
                                </Badge>
                                <Button onClick={() => {
                                    setSearchText('');
                                    setJobFilter(null);
                                    setStatusFilter(null);
                                }}>Reset</Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>
                <Card variant="borderless" styles={{ body: { padding: 0 } }} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Table
                        columns={columns}
                        dataSource={data?.data}
                        rowKey={record => record.applicationId}
                        pagination={{
                            total: data?.meta.TotalRecord,
                            pageSize: 5,
                            showTotal: (total) => `Total ${total} applicants`,
                            placement: ["bottomEnd"]
                        }}
                        scroll={{ x: 800 }}
                    />
                </Card>
            </div>
        </Content>
    )
}
export default AdminApplications