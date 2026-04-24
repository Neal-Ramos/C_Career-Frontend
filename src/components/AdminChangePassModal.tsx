import { LockOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, notification } from "antd"
import { useForm } from "antd/es/form/Form"
import type { IAdminChangePasswordReq } from "../global/IAdminAccount"
import { useAdminChangePassword } from "../Hooks/useAdminAccounts"
import { handleError } from "../global/ErrorHandler"

interface AdminChangePassModal{
    isPasswordModalVisible: boolean
    setIsPasswordModalVisible: (isPasswordModalVisible: boolean) => void
}

function AdminChangePassModal({isPasswordModalVisible, setIsPasswordModalVisible}: AdminChangePassModal){
    const [form] = useForm()
    const {mutate, isPending} = useAdminChangePassword()

    const handleOnFinish = (data: IAdminChangePasswordReq) => {
        mutate(data, {
            onSuccess: () => {
                notification.success({title: "Password Changed!", description: "Your Password is now Changed!"})
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return (
        <Modal
            footer={() => {
                return(
                    <>
                        <Button
                            onClick={() => setIsPasswordModalVisible(false)}
                        >Cancel</Button>
                        <Button 
                            type="primary"
                            onClick={() => form.submit()}
                        >Update Password</Button>
                    </>
                )
            }}
            title={<span><LockOutlined /> Change Password</span>}
            onCancel={() => setIsPasswordModalVisible(false)}
            open={isPasswordModalVisible}
            centered
        >
            <Form
                disabled={isPending}
                form={form}
                layout="vertical"
                onFinish={(val) => handleOnFinish(val)}
            >
                <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
                </Form.Item>
                <Form.Item
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match!'));
                        },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AdminChangePassModal