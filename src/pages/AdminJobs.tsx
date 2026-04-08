import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Spin, Table } from "antd"
import { Content } from "antd/es/layout/layout"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import { useJobs } from "../Hooks/useJobs"
import { useState } from "react"
import type { ColumnsType } from "antd/es/table"
import type { Jobs } from "../Types/Jobs"
import AddJobModal from "../components/AddJobModal"

function AdminJobs(){
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {data, isLoading, isError, error} = useJobs(page, pageSize);
    const [showCreateModal, setShowCreateModal] = useState(false)
    const jobsColumn: ColumnsType<Jobs> = [
        {
            title: "Job Title",
            dataIndex: "title"
        },
        {
            title: "Date Created",
            dataIndex: "dateCreated",
            render: (value) => new Date(value).toLocaleDateString()
        }
    ]
    if(isLoading)return <Spin size="large" className="justify-center flex-1"/>
    
    console.log(data)
    return(
        <Content style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Job Postings</Title>
                    <Text type="secondary">Manage your active, closed, and draft job listings.</Text>
                </div>
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setShowCreateModal(true)}>
                    Create New Job
                </Button>
            </div>
            <Card variant="borderless" styles={{ body:{padding: 0} }}>
                <Table 
                    columns={jobsColumn}
                    dataSource={isError? []:data?.data}
                    pagination={
                        { 
                            pageSize: pageSize, 
                            total: data?.meta.TotalRecords,
                            current: page,
                            responsive:true
                        }
                    }
                />
            </Card>
            <AddJobModal 
                showCreateModal={showCreateModal} 
                setShowCreateModal={setShowCreateModal}
            />
        </Content>
    );
}
export default AdminJobs