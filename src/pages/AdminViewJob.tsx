import { useNavigate, useParams } from "react-router-dom"
import { useDeleteJob, useJobsById, useUpdateJobMutation } from "../Hooks/useJobs"
import { Content } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"
import { Button, Card, Col, Divider, Form, Input, notification, Popconfirm, Row, Space, Spin } from "antd"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"
import TagBox from "../components/TagBox"
import CustomFieldBox from "../components/CustomFieldBox"
import DocumentBox from "../components/DocumentBox"
import { useForm } from "antd/es/form/Form"
import type { IUpdateJobReq } from "../global/IJobs"

function AdminViewJob(){
    const [form] = useForm()
    const {jobId} = useParams()
    const navigate = useNavigate()
    const deleteJob = useDeleteJob()
    const updateJob = useUpdateJobMutation()
    const {data, isLoading, isError} = useJobsById(jobId as string)

    const handleOnFinish = (updatedJob: IUpdateJobReq) => {
        updateJob.mutate({
            ...updatedJob,
            customFields: JSON.stringify(updatedJob.customFields),
            fileRequirements: JSON.stringify(updatedJob.fileRequirements),
            roles: JSON.stringify(updatedJob.roles)
        },{
            onSuccess: () => {
                notification.success({title: "Job Updated!", description: "Job is now Updated!"})
            }
        })
    }
    const handleDelete = () => {
        deleteJob.mutate(jobId!, {
            onSuccess: () => {
                notification.success({title: "Job Deleted!", description: "Job is now Deleted and its Applications!"})
                navigate("/admin/jobs")
            }
        })
    }

    if(isLoading) return <Spin size="large" className="flex-1 justify-center"/>
    if(isError) return <>Error...</>
    return(
        <Content
            className="min-h-screen bg-[#f9fafb] h-fit!"
            style={{ padding: '24px 16px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}
        >
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                    <Button 
                        type="link" 
                        icon={<ArrowLeftOutlined />} 
                        className="mb-2 p-0 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={() => window.history.back()}
                    >
                        Back to Listings
                    </Button>
                    <Title level={2} style={{ margin: 0, fontWeight: 700 }}>{data?.data.title}</Title>
                    <Text type="secondary">Detailed configuration and management for this listing.</Text>
                </div>
                
                <Space size="middle" className="w-full md:w-auto flex justify-end">
                    <Popconfirm
                        title="Delete Job!"
                        description="Deleting this will also Delete all the Application Related to this Job. Are you Sure?"
                        onConfirm={handleDelete}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button 
                            danger 
                            size="large" 
                            icon={<DeleteOutlined />} 
                            className="flex items-center rounded-lg border-red-200 bg-white hover:bg-red-50"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button 
                        type="primary" 
                        size="large" 
                        icon={<EditOutlined />} 
                        className="flex items-center rounded-lg shadow-sm px-8"
                        onClick={() => form.submit()}
                    >
                        Save
                    </Button>
                </Space>
            </div>
            <Card
                variant="outlined"
                className="shadow-sm border border-gray-100"
                style={{ borderRadius: '12px' }}
                styles={{ body: { padding: 'clamp(16px, 5vw, 32px)' }}}
            >
                <Form
                    form={form}
                    layout="vertical"
                    scrollToFirstError
                    requiredMark="optional"
                    onFinish={(val) => {handleOnFinish({editSummary: "Nothing",jobId: jobId, ...val})}}
                >
                    <Divider className="mt-0!">
                        <Space className="text-blue-600">
                            <InfoCircleOutlined /> 
                            <span className="font-bold uppercase tracking-widest text-[11px]">Basic Information</span>
                        </Space>
                    </Divider>
                    <Row gutter={[24, 0]}>
                        <Col xs={24} lg={24}>
                            <Form.Item
                                name="title"
                                label={<Text strong className="text-gray-600">Job Title</Text>}
                                rules={[{ required: true, message: 'Please enter the job title' }]}
                                initialValue={data?.data.title}
                            >
                                <Input placeholder="e.g. Lead Product Designer" size="large" className="rounded-md hover:border-blue-400 focus:border-blue-500 transition-all" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name="description"
                                label={<Text strong className="text-gray-600">Job Description</Text>}
                                rules={[{ required: true, message: 'Please enter the job title' }]}
                                initialValue={data?.data.description}
                            >
                                <TextArea 
                                    rows={6} 
                                    placeholder="Enter full job description here..." 
                                    className="rounded-md border-gray-200"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider className="mt-0!">
                        <Space className="text-blue-600">
                            <InfoCircleOutlined /> 
                            <span className="font-bold uppercase tracking-widest text-[11px]">Roles & Skills</span>
                        </Space>
                    </Divider>
                    <Row gutter={[24, 24]}>
                        <Col xs={24}>
                            <Form.Item
                                name="roles"
                                label={<Text strong className="text-gray-600">Skill Tags</Text>}
                                tooltip="The key skills required for this role"
                                rules={[
                                    {required: true, message: 'Tags cannot be empty!'}
                                ]}
                                initialValue={JSON.parse(data?.data.roles||"[]")}
                            >
                                <TagBox />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider className="mt-0!">
                        <Space className="text-blue-600">
                            <InfoCircleOutlined /> 
                            <span className="font-bold uppercase tracking-widest text-[11px]">Submission Requirements</span>
                        </Space>
                    </Divider>
                        <Form.Item
                            name="fileRequirements"
                            label={<Text strong className="text-gray-600">Required Documents</Text>}
                            rules={[
                                {
                                    validator: (_, val) => {
                                        const hasEmptyLabel = val.some((item: any) => !item.label || item.label.trim() === "");
                                        if (hasEmptyLabel) {
                                            return Promise.reject(new Error('All document names must be filled'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                            initialValue={JSON.parse(data?.data.fileRequirements||"[]")}
                        >
                            <DocumentBox />
                        </Form.Item>
                    
                        <Form.Item
                            name="customFields"
                            label={<Text strong className="text-gray-600">Custom Information</Text>}
                            initialValue={JSON.parse(data?.data.customFields||"[]")}
                        >
                            <CustomFieldBox />
                        </Form.Item>
                </Form>
            </Card>
        </Content>
    )
}
export default AdminViewJob