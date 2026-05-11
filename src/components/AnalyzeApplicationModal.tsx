import { CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, MonitorOutlined } from "@ant-design/icons"
import { Button, Card, Col, Divider, Modal, notification, Progress, Row, Space, Tag } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import Text from "antd/es/typography/Text"
import Title from "antd/es/typography/Title"
import { useAnalyzeApplication } from "../Hooks/useAI"
import type { Application, ParsedAiResultApplication } from "../Types/Applications"
import { handleError } from "../global/ErrorHandler"
import { useState } from "react"
import { usePatchApplicationStatus } from "../Hooks/useApplications"

interface AnalyzeApplicationModal{
    application: Application
    showAnalyzeApplicationModal: boolean
    setShowAnalyzeApplicationModal: (showAnalyzeApplicationModal: boolean ) => void
    refetchApplication: () => void
}

function AnalyzeApplicationModal({application, showAnalyzeApplicationModal, setShowAnalyzeApplicationModal, refetchApplication}: AnalyzeApplicationModal){
    const {mutate, isPending} = useAnalyzeApplication()
    const declineApplication = usePatchApplicationStatus()
    const existingResult: ParsedAiResultApplication|undefined = application.aiResults&& JSON.parse(application.aiResults)
    const [score, setScore] = useState<number|undefined>(existingResult?.Score)
    const [verdict, setVerdict] = useState<string|undefined>(existingResult?.Verdict)
    const [reason, setReason] = useState<string|undefined>(existingResult?.Reason)
    const [interviewSuggestion, setInterviewSuggestion] = useState<string|undefined>(existingResult?.InterviewSuggestion)

    const handleAnalyze = () => {
        mutate(application.applicationId, {
            onSuccess: (res) => {
                console.log(res)
                application.aiResults = JSON.stringify(res)
                setScore(res.score)
                setVerdict(res.verdict)
                setReason(res.reason)
                setInterviewSuggestion(res.interviewSuggestion)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }
    const handleDecline = () => {
        declineApplication.mutate({applicationId: application.applicationId, status: "Declined"}, {
            onSuccess: () => {
                notification.success({title: "Application Declined", description: "Application is now Declined"})
                setShowAnalyzeApplicationModal(false)
                refetchApplication()
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return(
        <Modal
            closable={!isPending}
            onCancel={() => setShowAnalyzeApplicationModal(false)}
            open={showAnalyzeApplicationModal}
            centered
            width={700}
            title={
                <Space className="flex! items-center! gap-2!">
                    <MonitorOutlined style={{ color: '#2b6ffb', fontSize: '20px' }} />
                    <Title level={4} className="m-0! text-slate-800! text-sm! sm:text-lg!">
                        AI Application Analysis
                    </Title>
                </Space>
            }
            footer={
                <div className="flex! flex-col! sm:flex-row! justify-end! gap-2! sm:gap-3! pt-2!">
                    <Button
                        disabled={isPending}
                        type="default"
                        size="large"
                        danger
                        className="rounded-md! px-6! w-full! sm:w-auto! order-2! sm:order-1!"
                        onClick={() => handleDecline()}
                    >
                        Decline
                    </Button>
                    <Button
                        loading={isPending}
                        disabled={application.aiResults != null}
                        type="primary"
                        size="large"
                        className="rounded-md! bg-[#2b6ffb]! px-6! w-full! sm:w-auto! order-1! sm:order-2!"
                        onClick={() => handleAnalyze()}
                    >
                        Analyze
                    </Button>
                </div>
            }
            styles={{ body: {
                padding: '12px',
                maxHeight: 'calc(100vh - 300px)', 
                overflowY: 'auto'
            } }}
        >
            <div className="py-2! sm:py-4!">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Card
                            className="h-full! rounded-xl! border-slate-100! shadow-sm! bg-slate-50/50!"
                            styles={{ body: { padding: '16px', textAlign: 'center' } }}
                        >
                            <Text className="text-slate-500! block! mb-4! uppercase! tracking-wider! text-[10px]! sm:text-xs! font-bold!">
                                Match Score
                            </Text>
                            <div className="flex! justify-center!">
                                <Progress
                                    type="dashboard"
                                    percent={score || 0}
                                    size={140}
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#2b6ffb',
                                    }}
                                    strokeWidth={10}
                                    className="font-bold!"
                                />
                            </div>
                            <div className="mt-2!">
                                <Text className="text-slate-400! text-xs! sm:text-sm!">Compatibility</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card
                            className="h-full! rounded-xl! border-slate-100! shadow-sm! bg-slate-50/50!"
                            styles={{
                                body: {
                                    padding: '16px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '180px'
                                }
                            }}
                        >
                            <Text className="text-slate-500! block! mb-4! uppercase! tracking-wider! text-[10px]! sm:text-xs! font-bold!">
                                AI Verdict
                            </Text>

                            <div className="flex! flex-col! items-center! justify-center! py-2!">
                                {verdict == "Pass" ? (
                                    <CheckCircleFilled className="text-4xl! sm:text-5xl! text-green-500! mb-3!" />
                                ) : (
                                    <CloseCircleFilled className="text-4xl! sm:text-5xl! text-red-500! mb-3!" />
                                )}

                                <Tag
                                    className={`text-lg! sm:text-xl! px-5! py-1! rounded-full! border-0! font-bold! ${
                                        verdict == "Pass" ? 'bg-green-100! text-green-600!' : 'bg-red-100! text-red-600!'
                                    }`}
                                >
                                    {verdict?.toUpperCase() || "No Verdict Yet"}
                                </Tag>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24}>
                        <Card
                            className="rounded-xl! border-slate-100! shadow-sm!"
                            styles={{ body: { padding: '16px' } }}
                        >
                            <div className="flex! items-center! gap-2! mb-3!">
                                <InfoCircleOutlined className="text-blue-500!" />
                                <Text className="font-bold! text-slate-700! text-sm! sm:text-base!">Analysis Summary</Text>
                            </div>

                            <Divider className="my-2!" />

                            <Paragraph className="text-slate-600! text-sm! sm:text-base! leading-relaxed! m-0!">
                                {reason || "Application is not Analyzed yet"}
                            </Paragraph>

                            <div className="mt-4! p-3! sm:p-4! bg-blue-50! rounded-lg! border! border-blue-100!">
                                <Text className="text-blue-700! text-[11px]! sm:text-sm! font-medium! block!">
                                    {`💡 AI Suggestion: ${interviewSuggestion? interviewSuggestion:"No AI Results Yet!"}`}
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}
export default AnalyzeApplicationModal