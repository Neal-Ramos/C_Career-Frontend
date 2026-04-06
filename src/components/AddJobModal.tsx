import { CloseOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Modal } from "antd"
import TextArea from "antd/es/input/TextArea"
import Title from "antd/es/typography/Title"
import TagBox from "./TagBox"

interface AddJobModal {
    showCreateModal: boolean
    setShowCreateModal: Function
}

function AddJobModal({ showCreateModal, setShowCreateModal }: AddJobModal){
    const [form] = Form.useForm();

    const onClose = () => {
        setShowCreateModal(false)
    }
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <Modal
            open={showCreateModal}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button 
                    key="submit" 
                    type="primary"
                    onClick={() => form.submit()}
                >
                    Create Job
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
            >
                <section className="mb-6">
                    <Divider >Basic Job Information</Divider>
                    <Form.Item
                        name="jobTitle"
                        label="Job Title"
                        rules={[{ required: true, message: 'Please enter the job title' }]}
                    >
                        <Input placeholder="Title" size="large"/>
                    </Form.Item>
                    <Form.Item
                        name="jobDescription"
                        label="Job Description"
                        rules={[{ required: true, message: 'Please enter the job title' }]}
                    >
                        <TextArea rows={4}/>
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
                    
                </section>
            </Form>
        </Modal>
    )
}
export default AddJobModal