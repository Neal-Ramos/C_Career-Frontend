import { CalendarOutlined, CheckOutlined, CloseCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Modal, notification, Space } from "antd";
import Title from "antd/es/typography/Title";
import QuillEditor from "./QuillEditor";
import { usePatchApplicationStatus } from "../Hooks/useApplications";
import { useNavigate } from "react-router-dom";
import { handleError } from "../global/ErrorHandler";
import { useState } from "react";
import Text from "antd/es/typography/Text";

interface AdminInterviewRemarksModal{
    adminInterviewRemarksModalVisible: boolean
    setAdminInterviewRemarksModalVisible: (adminInterviewRemarksModalVisible: boolean) => void
    applicationId: string
    refetchAppTable: () => void
}

function AdminInterviewRemarksModal({adminInterviewRemarksModalVisible, setAdminInterviewRemarksModalVisible, applicationId, refetchAppTable}:AdminInterviewRemarksModal){
    const navigate = useNavigate()
    const patchApplicationStatus = usePatchApplicationStatus()
    const [remarksValue, setRemarksValue] = useState("")

    const handleProcessApplication = (status: string) => {
        patchApplicationStatus.mutate({status: status, applicationId: applicationId, interviewRemarks: remarksValue}, {
            onSuccess: () => {
                notification.success({title: `Application is now ${status}`})
                refetchAppTable()
                setRemarksValue("")
                navigate("/admin/applications")
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return(
        <Modal
            centered
            open={adminInterviewRemarksModalVisible}
            onCancel={() => setAdminInterviewRemarksModalVisible(false)}
            width={700} // Increased width for better writing space
            title={
                <div className="flex flex-col gap-1 pb-2">
                    <Space size="middle">
                        <div className="bg-blue-50 p-2 rounded-lg">
                            <CalendarOutlined style={{ color: '#2b5dfb', fontSize: '20px' }} />
                        </div>
                        <div>
                            <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
                                Interview Evaluation
                            </Title>
                            <Text type="secondary" className="text-xs font-normal">
                                Record final remarks and decide on the application status
                            </Text>
                        </div>
                    </Space>
                </div>
            }
            footer={
                <div className="flex items-center justify-between w-full pt-4 border-t border-gray-50">
                    <Button 
                        type="text"
                        onClick={() => setAdminInterviewRemarksModalVisible(false)}
                        className="text-gray-500 hover:text-gray-700 font-medium"
                    >
                        Cancel
                    </Button>
                    
                    <Space size="small">
                        <Button 
                            danger 
                            size="large" 
                            icon={<CloseCircleOutlined />} 
                            className="rounded-xl font-semibold border-red-200 bg-red-50 hover:bg-red-100 h-11 px-6 shadow-sm"
                            onClick={() => handleProcessApplication("Declined")}
                        >
                            Decline
                        </Button>
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={<CheckOutlined />} 
                            className="rounded-xl shadow-lg px-8 font-semibold bg-blue-600 hover:bg-blue-700 border-none h-11"
                            onClick={() => handleProcessApplication("Approved")}
                        >
                            Approve Application
                        </Button>
                    </Space>
                </div>
            }
        >
            <div className="py-4">
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                    <FileTextOutlined />
                    <Text strong className="text-sm">INTERNAL REMARKS & NOTES</Text>
                </div>

                {/* Editor Container */}
                <div className="rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-400 transition-colors shadow-sm">
                    <QuillEditor 
                        value={remarksValue} 
                        onChange={setRemarksValue}
                        className="h-75 sm:h-125 min-h-62.5"
                    />
                </div>
                
                <div className="mt-2 text-right">
                    <Text type="secondary" className="text-[11px]">
                        * These remarks will be visible to other administrators.
                    </Text>
                </div>
            </div>
        </Modal>
    )
}
export default AdminInterviewRemarksModal