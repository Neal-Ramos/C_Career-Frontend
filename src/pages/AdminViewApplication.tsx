import { useNavigate, useParams } from "react-router-dom"
import { useApplicationById, usePatchApplicationStatus } from "../Hooks/useApplications"
import { Content } from "antd/es/layout/layout"
import { Button, Card, Descriptions, Divider, List, notification, Spin, Tag } from "antd"
import { ArrowLeftOutlined, BookOutlined, CalendarOutlined, CheckOutlined, ClockCircleOutlined, CloseCircleOutlined, FileTextOutlined, InfoCircleOutlined, MailOutlined, PhoneOutlined, QuestionCircleOutlined, RocketOutlined, UserOutlined } from "@ant-design/icons"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import type { ParsedCustomFieldApplication, ParsedFileSubmittedApplication } from "../Types/Applications"
import type { ParsedRolesJobs } from "../Types/Jobs"

function AdminViewApplication(){
    const {applicationId} = useParams()
    const navigate = useNavigate()
    const patchApplicationStatus = usePatchApplicationStatus()
    const {data, isLoading, isError} = useApplicationById(applicationId||"")

    if(isLoading) return <Spin size="large" className="flex-1 justify-center"/>
    if(isError) return <>Error...</>

    const files: ParsedFileSubmittedApplication[] = JSON.parse(data?.data.fileSubmitted||"[]")
    const customFields: ParsedCustomFieldApplication[] = JSON.parse(data?.data.customFields||"[]")
    const roles: ParsedRolesJobs = JSON.parse(data?.data.job.roles||"[]")

    const handleProcessApplication = (status: string) => {
        patchApplicationStatus.mutate({status: status, applicationId: applicationId!}, {
            onSuccess: () => {
                notification.success({title: `Application is now ${status}`})
                navigate("/admin/applications")
            },
            onError: () => {
                notification.error({title: `Something Went Wrong`})
            }
        })
    }

    return(
        <Content
            className="min-h-screen bg-[#f9fafb] h-fit!"
            style={{ padding: '24px 16px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}
        >
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex-1">
                    <Button 
                        type="link" 
                        icon={<ArrowLeftOutlined />} 
                        className="mb-2 p-0 text-gray-500 hover:text-blue-600 transition-colors flex items-center"
                        onClick={() => window.history.back()}
                    >
                        Back to Listings
                    </Button>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <Title 
                            level={2} 
                            style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}
                            className="text-2xl md:text-3xl"
                        >
                            {data?.data.lastName}, {data?.data.firstName} {data?.data.middleName || ""}
                        </Title>
                        <Tag color="orange" className="px-3 py-0.5 rounded-full uppercase text-[10px] font-bold border-none bg-orange-100 text-orange-600 m-0">
                            {data?.data.status}
                        </Tag>
                    </div>
                    <Text type="secondary" className="text-[14px] mt-1 block">
                        Applicant for <span className="font-semibold text-gray-700">{data?.data.job?.title}</span>
                    </Text>
                </div>
                
                <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                    <Button 
                        danger 
                        size="large" 
                        icon={<CloseCircleOutlined />} 
                        className="flex-1 sm:flex-initial flex items-center justify-center rounded-xl font-medium border-red-100 bg-white hover:bg-red-50 h-12 px-6"
                        onClick={() => handleProcessApplication("Declined")}
                    >
                        Decline
                    </Button>
                    <Button 
                        type="primary" 
                        size="large" 
                        icon={<CheckOutlined />} 
                        className="flex-1 sm:flex-initial flex items-center justify-center rounded-xl shadow-md px-10 font-medium bg-blue-600 border-none h-12"
                        onClick={() => handleProcessApplication("Approved")}
                    >
                        Approve
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Personal Information */}
                    <Card 
                        title={<span className="flex items-center gap-2"><UserOutlined /> Personal Information</span>} 
                        className="shadow-sm border-none rounded-2xl overflow-hidden"
                    >
                        <Descriptions column={{ xs: 1, sm: 2 }} bordered={false}>
                            <Descriptions.Item label={<span className="text-gray-400 flex items-center gap-2"><MailOutlined className="text-[12px]" /> Email</span>}>{data?.data.email}</Descriptions.Item>
                            <Descriptions.Item label={<span className="text-gray-400 flex items-center gap-2"><PhoneOutlined className="text-[12px]" /> Contact</span>}>{data?.data.contactNumber}</Descriptions.Item>
                            <Descriptions.Item label={<span className="text-gray-400 flex items-center gap-2"><BookOutlined className="text-[12px]" /> University</span>}>{data?.data.universityName}</Descriptions.Item>
                            <Descriptions.Item label={<span className="text-gray-400 flex items-center gap-2"><BookOutlined className="text-[12px]" /> Degree</span>}>{data?.data.degree}</Descriptions.Item>
                            <Descriptions.Item label={<span className="text-gray-400 flex items-center gap-2"><CalendarOutlined className="text-[12px]" /> Grad Year</span>}>{data?.data.graduationYear}</Descriptions.Item>
                            <Descriptions.Item label={<span className="text-gray-400 flex items-center gap-2"><ClockCircleOutlined className="text-[12px]" /> Date Applied</span>}>{new Date(data?.data.dateSubmitted!).toLocaleDateString()}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Custom Question Responses */}
                    <Card 
                        title={<span className="flex items-center gap-2"><QuestionCircleOutlined /> Custom Question Responses</span>} 
                        className="shadow-sm border-none rounded-2xl"
                    >
                        {customFields.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={customFields}
                                renderItem={(field, index) => {
                                    const fieldName = Object.keys(field)[0];
                                    const answer = field[fieldName];
                                    return (
                                        <div key={index} className="mb-6 last:mb-0">
                                            <Text type="secondary" className="text-[11px] uppercase font-bold tracking-widest block mb-2 px-1">
                                                {fieldName}
                                            </Text>
                                            <div className="bg-[#f3f4f6] p-4 rounded-xl border border-gray-100">
                                                <Text className="text-gray-800 text-[15px] leading-relaxed">{answer || "No response provided"}</Text>
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                        ) : (
                            <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <Text type="secondary">No custom questions were required for this position.</Text>
                            </div>
                        )}
                    </Card>

                    {/* Attachments */}
                    <Card 
                        title={<span className="flex items-center gap-2"><FileTextOutlined /> Attachments</span>} 
                        className="shadow-sm border-none rounded-2xl"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {files.length > 0 ? files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer"
                                    onClick={() => console.log("Viewing file:", file.PublicId)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                                            <FileTextOutlined className="text-lg" />
                                        </div>
                                        <div className="flex flex-col">
                                            <Text className="font-semibold text-[13px] leading-tight">{file.DocumentName}</Text>
                                            <Text type="secondary" className="text-[11px]">File Type: {file.Format}</Text>
                                        </div>
                                    </div>
                                    <Button type="primary" className="text-blue-500 font-bold text-xs group-hover:bg-blue-50">VIEW</Button>
                                </div>
                            )) : (
                                <Text type="secondary">No files submitted.</Text>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    <Card 
                        className="shadow-sm border-none rounded-2xl overflow-hidden"
                        styles={{body: {padding: 0}}}
                    >
                        <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6">
                            <Tag className="bg-blue-400/30 border-none text-white text-[10px] font-bold mb-2 rounded-md px-2 py-0.5">OPEN POSITION</Tag>
                            <Title level={3} style={{ color: 'white', margin: 0, letterSpacing: '-0.02em' }}>{data?.data.job?.title}</Title>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <Text type="secondary" className="text-[11px] uppercase font-bold tracking-wider block mb-2">Description</Text>
                                <Text className="text-gray-600 block leading-relaxed italic">
                                    "{data?.data.job?.description}"
                                </Text>
                            </div>

                            <div className="mb-6">
                                <Text type="secondary" className="text-[11px] uppercase font-bold tracking-wider block mb-2">Key Requirements</Text>
                                <div className="flex flex-wrap gap-2">
                                    {roles.map((role, idx) => (
                                        <Tag key={idx} className="bg-gray-100 border-none rounded-md px-3 py-1 text-gray-600 font-medium">
                                            {role}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <Divider style={{ margin: '20px 0' }} />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <CalendarOutlined className="text-blue-500 bg-blue-50 p-2 rounded-lg" />
                                    <div>
                                        <Text type="secondary" className="text-[11px] block leading-none mb-1">DATE CREATED</Text>
                                        <Text className="font-medium text-[13px]">{new Date(data?.data.job?.dateCreated!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RocketOutlined className="text-purple-500 bg-purple-50 p-2 rounded-lg" />
                                    <div>
                                        <Text type="secondary" className="text-[11px] block leading-none mb-1">SYSTEM STATUS</Text>
                                        <Text className="font-medium text-[13px]">Active Recruitment</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card 
                        title={<span className="flex items-center gap-2"><InfoCircleOutlined /> Review Status</span>} 
                        className="shadow-sm border-none rounded-2xl"
                    >
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                            <Text className="text-orange-700 text-sm font-medium block mb-1">Action Required</Text>
                            <Text className="text-orange-600/80 text-[13px] leading-snug">
                                This application is currently pending review. Please verify the attachments and custom responses before making a decision.
                            </Text>
                        </div>
                    </Card>
                </div>
            </div>
        </Content>
    )
}
export default AdminViewApplication