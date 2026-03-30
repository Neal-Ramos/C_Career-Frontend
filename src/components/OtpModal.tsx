import { ArrowRightOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons"
import { Button, Flex, Input } from "antd"
import Modal from "antd/es/modal/Modal"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import { useEffect, useState } from "react"

interface OtpModal{
    isModalVisible: boolean
    setIsModalVisible: Function
    codeOwner: string
}

function OtpModal({isModalVisible, setIsModalVisible, codeOwner}:OtpModal){
    const [timerValue, setTimerValue] = useState(60)

    const handleSubmit = async(code: string) => {
        console.log(code, codeOwner)
    }

    useEffect(() => {
        if (timerValue <= 0) return
        
        const interval = setInterval(() => {
            setTimerValue(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval);
    },[timerValue])

    return(
        <Modal
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            centered
            closable={true}
            width={440}
            styles={{
            mask: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 26, 51, 0.4)' }
            }}
        >
            <Flex vertical gap={32} style={{ padding: '40px 32px 32px 32px' }}>
            {/* Header Section */}
            <Flex vertical align="center" gap={12} style={{ textAlign: 'center' }}>
                <div style={{ 
                backgroundColor: '#eff6ff', 
                padding: '16px', 
                borderRadius: '50%',
                display: 'inline-flex'
                }}>
                <SafetyCertificateOutlined style={{ fontSize: '32px', color: "#3b82f6" }} />
                </div>
                <Title level={3} style={{ margin: 0, fontWeight: 600 }}>Two-Step Verification</Title>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                    Enter the 6-digit security code sent to your <br /> 
                <Text strong style={{ color: '#334155' }}>{"emailDisplay"}</Text>
                </Text>
            </Flex>

            {/* OTP Input Section */}
            <Flex vertical gap={24}>
                <Input.OTP 
                    size="large" 
                    length={6} 
                    onChange={(e) => handleSubmit(e)}
                    style={{ justifyContent: 'space-between' }}
                />
                
                <Button
                type="primary"
                block
                size="large"
                // loading={loading}
                // onClick={() => onVerify?.('')}
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                style={{ fontWeight: 600, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                >
                Verify Identity
                </Button>
            </Flex>

            {/* Resend Section */}
            <Flex justify="space-between" align="center">
                <Text type="secondary" style={{ fontSize: '13px' }}>Didn't receive the code?</Text>
                {timerValue > 0 ? (
                <Text type="secondary" italic style={{ fontSize: '13px' }}>Resend in {timerValue}s</Text>
                ) : (
                <Button 
                    type="link" 
                    style={{ padding: 0, height: 'auto', fontWeight: 600 }}
                    // onClick={onResend}
                >
                    Resend Access Code?
                </Button>
                )}
            </Flex>
            </Flex>

            {/* Modal Footer Branding */}
            <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '16px', 
            borderTop: '1px solid #f1f5f9',
            textAlign: 'center' 
            }}>
            <Text style={{ 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: 500
            }}>
                <LockOutlined /> Secure Administrator Portal
            </Text>
            </div>
        </Modal>
    )
}
export default OtpModal