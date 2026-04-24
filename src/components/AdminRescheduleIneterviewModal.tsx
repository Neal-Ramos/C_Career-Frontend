import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Modal, notification, Space } from "antd"
import { useForm } from "antd/es/form/Form"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import { useReschedInterview } from "../Hooks/useApplicantInterview"
import { handleError } from "../global/ErrorHandler"

interface AdminSetInterviewModal{
    showAdminReschedInterviewModal: boolean
    setShowAdminReschedInterviewModal: (showAdminSetInterviewModal: boolean) => void
    applicationId: string
    refetchAppTable: () => void
    refetch: () => void
}

function AdminReschedInterviewModal({ showAdminReschedInterviewModal, setShowAdminReschedInterviewModal, applicationId, refetchAppTable, refetch }: AdminSetInterviewModal){
    const [form] = useForm()
    const navigate = useNavigate()
    const {mutate, isPending} = useReschedInterview()
    const handleOnFinish = (data: {interviewDate: dayjs.Dayjs}) => {
        const formattedDate = data.interviewDate.format("YYYY-MM-DDTHH:mm:ss")
        mutate({applicationId: applicationId, newSchedule: formattedDate},{
            onSuccess: () => {
                notification.success({title: "Interview Rescheduled", description: "The Inteview is now Rescheduled"})
                refetchAppTable()
                refetch()
                form.resetFields()
                navigate("/admin/applications")
                setShowAdminReschedInterviewModal(false)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return(
        <Modal
            open={showAdminReschedInterviewModal}
            onCancel={() => {
                setShowAdminReschedInterviewModal(false);
            }}
            centered
            destroyOnHidden
            title={
                <Space>
                    <CalendarOutlined style={{ color: '#2b5dfb' }} />
                    <Title level={4} style={{ margin: 0 }}>
                        Reschedule Interview
                    </Title>
                </Space>
            }
            footer={[
                <Button key="back" onClick={() => setShowAdminReschedInterviewModal(false)} disabled={isPending}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={isPending}
                    icon={<ClockCircleOutlined />}
                    style={{
                        backgroundColor: '#2b5dfb', 
                        borderColor: '#2b5dfb', 
                        color: 'rgba(255, 255, 255)',
                        fontWeight: 500 
                    }}
                    onClick={form.submit}
                >
                    Confirm Schedule
                </Button>,
            ]}
        >
            <div style={{ padding: '10px 0' }}>
                <Text type="secondary">
                    Please select the date and time for the applicant's interview.
                    This Will Set the Current Interview To Rescheduled.
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
export default AdminReschedInterviewModal