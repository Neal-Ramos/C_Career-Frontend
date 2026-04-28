import { Button, Card, Descriptions, Divider, Layout, List, Space, Spin, Tag } from "antd"
import { useJobsById } from "../Hooks/useJobs"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeftOutlined, CheckCircleOutlined, FileTextOutlined, InfoCircleOutlined, SendOutlined, UserOutlined } from "@ant-design/icons"
import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"
import { NormalizeDate } from "../helpers/NormalizeDate"
import type { ParsedCustomFieldsJobs, ParsedFileRequirementsJobs, ParsedRolesJobs } from "../Types/Jobs"
import { useState } from "react"
import ApplyJobModal from "../components/ApplyJobModal"
import QuillViewer from "../components/QuillViewer"

function ApplyJob() {
    const navigate = useNavigate()
    const { jobGuid } = useParams()
    const { data, isLoading, isError } = useJobsById(jobGuid!)
    const [isModalVisible, sesetIsModalVisibletIs] = useState(false)
    if (isLoading) return <Spin size="large" className="w-full h-dvh flex items-center justify-center" />
    if (isError || !data) return <div className="p-10 text-center">Error loading job details...</div>

    const parsedFileReq: ParsedFileRequirementsJobs[] = JSON.parse(data.data.fileRequirements || "[]")
    const parsedCustomFields: ParsedCustomFieldsJobs[] = JSON.parse(data.data.customFields || "[]")
    const parsedRoles: ParsedRolesJobs = JSON.parse(data.data.roles || "[]")


    return (
        <Layout className="min-h-screen! bg-gray-50!">
            <ApplyJobModal 
                isModalVisible={isModalVisible} 
                setIsModalVisible={sesetIsModalVisibletIs} 
                job={data}
                parsedFileReq={parsedFileReq}
                parsedCustomFields={parsedCustomFields}
            />
            <div
                className="w-full"
                style={{ 
                    background: `linear-gradient(180deg, #001529 0%, #001e3c 100%)`, 
                    padding: '40px 16px 80px 16px', 
                }}
            >
                <div className="max-w-4xl mx-auto w-full">
                    <Button 
                        type="link" 
                        icon={<ArrowLeftOutlined />} 
                        onClick={() => navigate(-1)}
                        className="p-0! mb-6! flex! items-center!"
                        style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                        Back to Available Jobs
                    </Button>
                    <Title 
                        level={1} 
                        className="m-0! text-white! font-extrabold! wrap-break-word!"
                        style={{ fontSize: 'clamp(24px, 5vw, 36px)' }}
                    >
                        {data.data.title}
                    </Title>
                </div>
            </div>
            
            <div className="max-w-400 mx-auto -mt-10 px-4 mb-10 w-full">
                <Card 
                    variant="borderless" 
                    className="rounded-2xl! shadow-lg! overflow-hidden!"
                    styles={{ body: { padding: 'clamp(16px, 4vw, 32px)' } }}
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                        <div className="flex flex-col">
                            <Text type="secondary" className="text-[12px]! font-semibold! uppercase tracking-wider!">
                                Posted Date
                            </Text>
                            <Text strong className="text-lg!">{NormalizeDate(data.data.dateCreated!)}</Text>
                            <Space size={8}>
                                <Tag className="m-0! rounded-lg! border-none! bg-blue-100! px-3! py-0.5!">
                                    <Text strong className="text-[#3b5998]! text-xs!">
                                        {data.data.workArrangement}
                                    </Text>
                                </Tag>
                                <Tag className="m-0! rounded-lg! border-none! bg-slate-200! px-3! py-0.5!">
                                    <Text strong className="text-slate-600! text-xs!">
                                        {data.data.employmentType}
                                    </Text>
                                </Tag>
                            </Space>
                        </div>
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={<SendOutlined />}
                            className="w-full! sm:w-auto! h-12! px-10! rounded-lg! font-semibold! shadow-md!"
                            onClick={() => sesetIsModalVisibletIs(true)}
                        >
                            Apply Now
                        </Button>
                    </div>

                    <Divider className="my-0! mb-8!" />

                    {/* Description Section */}
                    <section className="mb-10">
                        <Title level={4} className="font-bold!">Description</Title>
                        <QuillViewer value={data.data.description}/>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {parsedRoles.map((role, idx) => (
                                <Tag 
                                    key={idx} 
                                    color="blue" 
                                    className="rounded-full! px-4! py-0.5! font-medium! bg-blue-50! text-blue-600!"
                                >
                                    {role}
                                </Tag>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <Title level={4} className="font-bold! flex! items-center! gap-2!">
                            <UserOutlined /> Information Required
                        </Title>
                        <Descriptions 
                            bordered 
                            size="small" 
                            column={1} 
                            className="bg-white!"
                            labelStyle={{ background: '#f8fafc', fontWeight: 600, width: 'clamp(120px, 20%, 200px)', color: '#64748b' }}
                        >
                            <Descriptions.Item label="Identity">FirstName, MiddleName, LastName, BirthDate</Descriptions.Item>
                            <Descriptions.Item label="Contact Info">Email, ContactNumber, Location</Descriptions.Item>
                            <Descriptions.Item label="Academics">UniversityName, Degree, GraduationYear</Descriptions.Item>
                        </Descriptions>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card 
                            size="small" 
                            title={<Space><FileTextOutlined className="text-blue-500" /> <Text strong>File Requirements</Text></Space>}
                            className="bg-slate-50! border-slate-200! rounded-xl!"
                        >
                            <List
                                dataSource={parsedFileReq}
                                renderItem={(item) => (
                                    <List.Item className="px-0! py-2!">
                                        <div className="flex items-center gap-3 w-full">
                                            <CheckCircleOutlined className={item.required ? 'text-blue-500!' : 'text-slate-400!'} />
                                            <Text className="flex-1!">{item.label}</Text>
                                            {item.required && <Tag color="error" className="text-[10px] rounded-md m-0">REQUIRED</Tag>}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card 
                            size="small" 
                            title={<Space><InfoCircleOutlined className="text-blue-500" /> <Text strong>Custom Job Questions</Text></Space>}
                            className="bg-slate-50! border-slate-200! rounded-xl!"
                        >
                            <List
                                dataSource={parsedCustomFields}
                                renderItem={(item) => (
                                    <List.Item className="px-0! py-2!">
                                        <div className="flex flex-col">
                                            <Text strong>{item.label}</Text>
                                            <Text type="secondary" className="text-xs!">
                                                {item.required ? 'This field is mandatory' : 'Optional'}
                                            </Text>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default ApplyJob