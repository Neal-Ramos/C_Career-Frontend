import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Table } from "antd"
import { Content } from "antd/es/layout/layout"
import type { ColumnType } from "antd/es/table"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import type { IJob } from "../global/IJobs"

function AdminJobs(){
    const jobsColumn: ColumnType<IJob>[] = [
        {
            title: "Title",
            dataIndex:"title",
            key:"jobId"
        }
    ]

    return(
        <Content style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Job Postings</Title>
                    <Text type="secondary">Manage your active, closed, and draft job listings.</Text>
                </div>
                <Button type="primary" size="large" icon={<PlusOutlined />}>
                    Create New Job
                </Button>
            </div>
            <Card variant="borderless" styles={{ body:{padding: 0} }}>
                <Table 
                columns={jobsColumn} 
                // dataSource={} 
                pagination={{ pageSize: 5 }}
                />
            </Card>
        </Content>
    )
}
export default AdminJobs