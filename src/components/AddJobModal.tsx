import { CloseOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, Modal, notification, Row, Select } from "antd"
import Title from "antd/es/typography/Title"
import TagBox from "./TagBox"
import DocumentBox from "./DocumentBox"
import CustomFieldBox from "./CustomFieldBox"
import { useAddJobMutation } from "../Hooks/useJobs"
import type { FetchJobs, IAddJobReq } from "../global/IJobs"
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { handleError } from "../global/ErrorHandler"
import QuillEditor from "./QuillEditor"

interface AddJobModal {
    showCreateModal: boolean
    setShowCreateModal: Function
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<FetchJobs, Error>>
}

function AddJobModal({ showCreateModal, setShowCreateModal, refetch }: AddJobModal){
    const [form] = Form.useForm();
    const postJob = useAddJobMutation()

    const onClose = () => {
        setShowCreateModal(false)
    }
    const onFinish = (values: IAddJobReq) => {
        values.roles = JSON.stringify(values.roles)
        values.customFields = JSON.stringify(values.customFields)
        values.fileRequirements = JSON.stringify(values.fileRequirements)
        postJob.mutate(values, {
            onError: (error) => {
                handleError(error)
            },
            onSuccess: () => {
                notification.success({
                    title: "Job Posted",
                    description: "Jos is now Posted and Ready for Applications"
                })
                setShowCreateModal(false)
                refetch()
                form.resetFields()
            }
        })
    };

    return (
        <Modal
            open={showCreateModal}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose} disabled={postJob.isPending}>
                    Cancel
                </Button>,
                <Button 
                    key="submit" 
                    type="primary"
                    onClick={() => form.submit()}
                    loading={postJob.isPending}
                >
                    "Create Job"
                </Button>,
            ]}
            width="95%"
            style={{ maxWidth: '800px' }}
            centered
            closable={false}
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button 
                    type="text" 
                    icon={<CloseOutlined />} 
                    onClick={onClose} 
                    style={{ marginLeft: '-12px' }}
                />
                <Title 
                    level={4} 
                    style={{ margin: 0, fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}

                >
                    Create New Job Posting
                </Title>
                </div>
            }
            styles={{
                body:{
                    maxHeight: '75vh',
                    overflowY: 'auto',
                    padding: '16px 24px'
                }
            }}  
        >
            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                disabled= {postJob.isPending}
            >
                <section className="mb-6">
                    <Divider >Basic Job Information</Divider>
                    <Form.Item
                        name="title"
                        label="Job Title"
                        rules={[{ required: true, message: 'Please enter the job title' }]}
                    >
                        <Input placeholder="Title" size="large"/>
                    </Form.Item>
                    <Row
                        gutter={[16, 16]}
                        align="middle"
                        justify="space-between"
                    >
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="salary"
                                label="Salary"
                            >
                                <Input placeholder="Salary (Optional)"></Input>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="employmentType"
                                label="EmploymentType"
                            >
                                <Select 
                                defaultValue={"FullTime"}
                                options={[
                                    {value:"FullTime", label:"Full Time"},
                                    {value:"PartTime", label:"Part Time"},
                                    {value:"Contract", label:"Contract"},
                                    {value:"Internship", label:"Internship"},
                                    {value:"Volunteer", label:"Volunteer"}
                                ]}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="workArrangement"
                                label="Work Arrangement"
                            >
                                <Select 
                                defaultValue={"Onsite"}
                                options={[
                                    {value:"Onsite", label:"Onsite"},
                                    {value:"Remote", label:"Remote"},
                                    {value:"Hybrid", label:"Hybrid"}
                                ]}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="description"
                        label="Job Description"
                        rules={[{ required: true, message: 'Please enter the job title' }]}
                    >
                        <QuillEditor />
                    </Form.Item>
                    <Form.Item
                        name="roles"
                        label="Job Roles"
                        rules={[
                            {required: true, message: 'Tags cannot be empty!'}
                        ]}
                    >
                        <TagBox/>
                    </Form.Item>
                    <Form.Item
                        name="fileRequirements"
                        label="Documents Needed"
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
                    >
                        <DocumentBox/>
                    </Form.Item>
                    <Form.Item
                        name="customFields"
                        label="Custom Requirements"
                    >
                        <CustomFieldBox/>
                    </Form.Item>
                </section>
            </Form>
        </Modal>
    )
}
export default AddJobModal