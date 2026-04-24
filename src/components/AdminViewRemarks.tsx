import { CalendarOutlined, FileTextOutlined } from "@ant-design/icons"
import { Button, Modal, Space } from "antd"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import ReactQuill from "react-quill-new"

interface AdminViewRemarks{
    adminViewRemarksModalVisible: boolean
    setAdminViewRemarksModalVisible: (adminViewRemarksModalVisible: boolean) => void
    remarksValue: string
}

function AdminViewRemarks({adminViewRemarksModalVisible, setAdminViewRemarksModalVisible, remarksValue}:AdminViewRemarks){


    return(
        <Modal
            centered
            open={adminViewRemarksModalVisible}
            onCancel={() => setAdminViewRemarksModalVisible(false)}
            width={700}
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
                        onClick={() => setAdminViewRemarksModalVisible(false)}
                        className="text-gray-500 hover:text-gray-700 font-medium"
                    >
                        Back
                    </Button>
                </div>
            }
        >
            <div className="py-4">
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                    <FileTextOutlined />
                    <Text strong className="text-sm">INTERNAL REMARKS & NOTES</Text>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-400 transition-colors shadow-sm">
                    <ReactQuill
                        value={remarksValue}
                        readOnly
                        theme="snow"
                        modules={{
                            toolbar: null,
                        }}
                        className="h-75 md:h-150 overflow-auto p-4"
                    />
                </div>
                
                <div className="mt-2 text-right">
                    <Text type="secondary" className="text-[11px]">
                        * These remarks is be visible to other administrators.
                    </Text>
                </div>
            </div>
        </Modal>
    )
}
export default AdminViewRemarks