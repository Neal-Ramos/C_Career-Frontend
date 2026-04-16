import { Button, DatePicker, Divider, Form, Input, Modal, notification, Upload } from "antd"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import type { GetJobsByIdResponse } from "../global/IJobs"
import { useForm } from "antd/es/form/Form"
import type { ParsedFileRequirementsJobs, ParsedCustomFieldsJobs } from "../Types/Jobs"
import { UploadOutlined } from "@ant-design/icons"
import type { UploadChangeParam } from "antd/es/upload"
import { useAddApplication } from "../Hooks/useApplications"
import { getYear } from "../helpers/GetYear"
import { useNavigate } from "react-router-dom"

interface ApplyJobModal {
    isModalVisible: boolean
    setIsModalVisible: (isModalVisible: boolean) => void
    job: GetJobsByIdResponse
    parsedFileReq: ParsedFileRequirementsJobs[]
    parsedCustomFields: ParsedCustomFieldsJobs[]
}
interface SubmitApplicationData{
    jobId: string
    lastName: string
    firstName: string
    middleName: string
    contactNumber: string
    email: string
    location: string
    universityName: string
    graduationYear: string
    degree: string
    birthDate: Date
    customFields: Record<string, string>
    files: Record<string, UploadChangeParam>
}

function ApplyJobModal({
    isModalVisible, 
    setIsModalVisible, 
    job,
    parsedFileReq,
    parsedCustomFields
}: ApplyJobModal){
    const [form] = useForm()
    const navigate = useNavigate()
    const addApplication = useAddApplication()

    const handleOnFinish = (data: SubmitApplicationData) => {

        const formData = new FormData()
        formData.append("jobId", job.data.jobId)
        formData.append("lastName", data.lastName)
        formData.append("firstName", data.firstName)
        formData.append("middleName", data.middleName)
        formData.append("contactNumber", data.contactNumber)
        formData.append("email", data.email)
        formData.append("location", data.location)
        formData.append("universityName", data.universityName)
        formData.append("graduationYear", getYear(data.graduationYear))
        formData.append("degree", data.degree)
        formData.append("birthDate", data.birthDate.toString())
        formData.append("customFields", JSON.stringify(parsedCustomFields.map(e => {return {[e.label]: data.customFields[e.label]}})))
        for(const key in data.files){
            formData.append(key, data.files[key].fileList[0].originFileObj!)
        }

        addApplication.mutate(formData, {
            onSuccess: () => {
                notification.success({title: "Application Submitted", description: "Your Application is now Submitted and Waiting for Review"})
                navigate("/")
            },
            onError: () => {
                notification.error({title: "Something Went Wrong", description: "Try Again Later"})
            }
        })
    }

    return(
        <Modal
            title={null}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={1400}
            centered
        >
            <div className="pt-4 px-2">
                <div className="mb-6">
                    <Title level={3} className="mb-1!">Apply for {job?.data?.title}</Title>
                    <Text type="secondary">Please fill in all required information and upload necessary documents.</Text>
                </div>
            </div>
            <Form 
                form={form}
                layout="vertical"
                requiredMark="optional"
                onFinish={handleOnFinish}
            >
                <Divider className="text-blue-600! m-0! mb-4!">Personal Information</Divider>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Form.Item 
                        name="lastName" 
                        label="Last Name" 
                        rules={[{ required: true, message: 'Last name is required' }]}
                    
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item 
                        name="firstName" 
                        label="First Name" 
                        rules={[{ required: true, message: 'First name is required' }]}
                    
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item 
                        name="middleName" 
                        label="Middle Name" 
                        rules={[{ required: false}]}
                    
                    >
                        <Input placeholder="Middle Name" />
                    </Form.Item>
                    <Form.Item 
                        name="email" 
                        label="Email Address" 
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    
                    >
                        <Input placeholder="@gmail.com" />
                    </Form.Item>
                    <Form.Item 
                        name="birthDate" 
                        label="Birth Date" 
                        rules={[{ required: true, message: 'Birth date is required' }]}
                    
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item 
                        name="contactNumber" 
                        label="Contact #" 
                        rules={[
                            { 
                                required: true, 
                                message: "Contact Number is required!" 
                            },
                            { 
                                len: 11, 
                                message: "Contact Number must be exactly 11 digits!" 
                            },
                            { 
                                pattern: /^[0-9]+$/, 
                                message: "Contact Number must contain only numbers (no letters or spaces)!" 
                            },
                        ]}
                    
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item 
                        name="location" label="Location" 
                        rules={[{ required: true, message: 'Location is required' }]}
                    
                    >
                        <Input className="w-full" />
                    </Form.Item>
                </div>

                <Divider className="text-blue-600! m-0! mb-4!">Academic Information</Divider>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Form.Item name="universityName" label="University Name" rules={[{ required: true, message: 'University Name is required' }]}>
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item name="degree" label="Degree" rules={[{ required: true, message: 'Degree is required' }]}>
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item name="graduationYear" label="GraduationYear" rules={[{ required: true, message: 'Graduation Year is required' }]}>
                        <DatePicker className="w-full" picker="year"/>
                    </Form.Item>
                </div>
                {parsedCustomFields.length > 0 && (
                    <>
                        <Divider className="text-blue-600! m-0! mb-4!">Job Specific Questions</Divider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                            {parsedCustomFields.map((field, index) => (
                                <Form.Item 
                                    key={index} 
                                    name={['customFields', field.label]} 
                                    label={field.label} 
                                    rules={[{ required: field.required, message: `${field.label} is required` }]}
                                >
                                    <Input placeholder={`Enter ${field.label.toLowerCase()}`} />
                                </Form.Item>
                            ))}
                        </div>
                    </>
                )}

                {parsedFileReq.length > 0 && (
                    <>
                        <Divider className="text-blue-600! m-0! mb-4!">Document Uploads</Divider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {parsedFileReq.map((file, index) => (
                                <Form.Item 
                                    key={index} 
                                    name={['files', file.label]} 
                                    label={file.label} 
                                    rules={[{ required: file.required, message: `${file.label} is required` }]}
                                >
                                    <Upload maxCount={1} beforeUpload={() => false}>
                                        <Button icon={<UploadOutlined />} className="w-full text-left flex items-center justify-between">
                                            Upload {file.label}
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            ))}
                        </div>
                    </>
                )}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <Button onClick={() => setIsModalVisible(false)} size="large" danger>Cancel</Button>
                    <Button type="primary" size="large" className="bg-blue-600 font-semibold px-8" onClick={() => form.submit()}>
                        Submit Application
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}
export default ApplyJobModal