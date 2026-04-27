import { SearchOutlined } from "@ant-design/icons"
import { Avatar, Badge, Button, Card, Col, Input, Row, Select, Space, Table } from "antd"
import { Option } from "antd/es/mentions"
import type { ColumnsType } from "antd/es/table"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import { useState } from "react"
import { useApplication } from "../Hooks/useApplications"
import { Content } from "antd/es/layout/layout"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import type { Application } from "../Types/Applications"
import type { AdminApplicationOutletContextType } from "../Types/OutletContextType/AdminApplicationOutletContextType"

function AdminApplications(){
    const {applicationId} = useParams()
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState<string|undefined>(undefined)
    const [filterStatus, setFilterStatus] = useState<string|undefined>(undefined)

    const {data, isLoading, isError, refetch} = useApplication(page, pageSize, search, filterStatus)

    if (applicationId) return <Outlet context={{refetchAppTable: refetch} satisfies AdminApplicationOutletContextType}/>
    if (isError) return <div>Error...</div>

    const handleChangePage = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }
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
                    <Row gutter={[16, 16]} align="middle" justify="space-between">
                        <Col xs={24} md={8}>
                            <Input
                                placeholder="Search Applicant Email..."
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                allowClear
                            />
                        </Col>
                        <Col xs={12} md={5}>
                            <Select
                                placeholder="Status"
                                style={{ width: '100%' }}
                                onChange={value => setFilterStatus(value)}
                                allowClear
                                value={filterStatus}
                            >
                                <Option value="Pending" key="1"/>
                                <Option value="Interview" key="2"/>
                                <Option value="Approved" key="3"/>
                                <Option value="Declined" key="4"/>
                            </Select>
                        </Col>
                        <Col xs={24} md={6} style={{ textAlign: 'right' }}>
                            <Space>
                                <Badge count={data?.meta.TotalRecord} overflowCount={999} color="#1677ff">
                                    <Text type="secondary" style={{ marginRight: 8 }}>Results</Text>
                                </Badge>
                                <Button onClick={() => {
                                    setSearch('');
                                    setFilterStatus(undefined);
                                }}>Reset</Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>
                <Card variant="borderless" styles={{ body: { padding: 0 } }} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={data?.data}
                        rowKey={record => record.applicationId}
                        pagination={{
                            total: data?.meta.TotalRecord,
                            current: page,
                            pageSize: pageSize,
                            showTotal: (total) => `Total ${total} applicants`,
                            placement: ["bottomEnd"],
                            responsive: true,
                            onChange: (page, pageSize) => handleChangePage(page, pageSize)
                        }}
                        scroll={{ x: 800 }}
                    />
                </Card>
            </div>
        </Content>
    )
}
export default AdminApplications