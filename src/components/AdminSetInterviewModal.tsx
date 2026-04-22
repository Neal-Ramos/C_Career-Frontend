import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Modal, notification, Space } from "antd"
import { useForm } from "antd/es/form/Form"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import dayjs from "dayjs"
import { usePatchApplicationStatus } from "../Hooks/useApplications"
import { handleError } from "../global/ErrorHandler"
import { useNavigate } from "react-router-dom"

interface AdminSetInterviewModal{
    showAdminSetInterviewModal: boolean
    setShowAdminSetInterviewModal: (showAdminSetInterviewModal: boolean) => void
    applicationId: string
    refetchAppTable: () => void
}

function AdminSetInterviewModal({ showAdminSetInterviewModal, setShowAdminSetInterviewModal, applicationId, refetchAppTable }: AdminSetInterviewModal){
    const [form] = useForm()
    const navigate = useNavigate()
    const {mutate, isPending} = usePatchApplicationStatus()
    const handleOnFinish = (data: {interviewDate: dayjs.Dayjs}) => {
        const formattedDate = data.interviewDate.format("YYYY-MM-DDTHH:mm:ss")
        mutate({applicationId: applicationId, status: "Interview", dateInterview: formattedDate}, {
            onSuccess: () => {
                notification.success({title: "Interview Is now Scheduled", description: "The Inteview is now Scheduled"})
                refetchAppTable()
                form.resetFields()
                navigate("/admin/applications")
                setShowAdminSetInterviewModal(false)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return(
        <Modal
            open={showAdminSetInterviewModal}
            onCancel={() => {
                // form.resetFields();
                setShowAdminSetInterviewModal(false);
            }}
            centered
            destroyOnHidden
            title={
                <Space>
                    <CalendarOutlined style={{ color: '#faad14' }} />
                    <Title level={4} style={{ margin: 0 }}>
                        Schedule Interview
                    </Title>
                </Space>
            }
            footer={[
                <Button key="back" onClick={() => setShowAdminSetInterviewModal(false)} loading={isPending}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={isPending}
                    icon={<ClockCircleOutlined />}
                    style={{
                        backgroundColor: '#fadb14', 
                        borderColor: '#fadb14', 
                        color: 'rgba(0, 0, 0, 0.85)',
                        fontWeight: 500 
                    }}
                    onClick={form.submit}
                >
                    Confirm Interview
                </Button>,
            ]}
        >
            <div style={{ padding: '10px 0' }}>
                <Text type="secondary">
                    Please select the date and time for the applicant's interview.
                    This will update the application status to "Interview".
                </Text>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={{ interviewDate: null }}
                style={{ marginTop: '20px' }}
                onFinish={(data) => handleOnFinish(data)}
                disabled={isPending}
            >
                <Form.Item
                    name="interviewDate"
                    label="Interview Date & Time"
                    rules={[{ required: true, message: 'Please select the interview time!' }]}
                >
                    <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder="Select Date and Time"
                        style={{ width: '100%' }}
                        showNow={false}
                        minuteStep={15}
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AdminSetInterviewModal