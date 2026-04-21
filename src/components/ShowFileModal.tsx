import { useEffect, useMemo } from "react" // Added useMemo and useEffect for cleanup
import { Button, Image, Modal, Spin } from "antd"
import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons"
import { useGetApplicationFile } from "../Hooks/useApplications"
import Text from "antd/es/typography/Text"

interface ShowFileModalProps {
    showFileModal: boolean
    setShowFileModal: (showFileModal: boolean) => void
    publicId: string
}

function ShowFileModal({ showFileModal, setShowFileModal, publicId }: ShowFileModalProps) {
    const { data, isLoading } = useGetApplicationFile(publicId, showFileModal)

    const fileExtension = useMemo(() => publicId.split('.').pop()?.toLowerCase() ?? "", [publicId])
    const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(fileExtension)
    const isPdf = fileExtension === "pdf"

    const objectUrl = useMemo(() => (data ? URL.createObjectURL(data) : ""), [data])

    useEffect(() => {
        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl)
        }
    }, [objectUrl])

    const handleDownload = () => {
        if (!data) return
        const a = document.createElement("a")
        a.href = objectUrl
        a.download = publicId.split('/').pop() ?? "file"
        a.click()
    }

    return (
        <Modal
            open={showFileModal}
            onCancel={() => setShowFileModal(false)}
            width={typeof window !== 'undefined' && window.innerWidth < 768 ? "95%" : "60%"}
            centered
            destroyOnHidden
            footer={[
                <div key="footer-actions" className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button 
                        key="download" 
                        icon={<DownloadOutlined />} 
                        onClick={handleDownload} 
                        disabled={!data}
                        className="w-full sm:w-auto"
                    >
                        Download
                    </Button>
                    <Button 
                        key="close" 
                        onClick={() => setShowFileModal(false)}
                        className="w-full sm:w-auto"
                    >
                        Close
                    </Button>
                </div>
            ]}
        >
            <div className="mt-4 min-h-75 flex flex-col items-center justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spin size="large" tip="Loading file..." />
                    </div>
                ) : !data ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                        <FileTextOutlined style={{ fontSize: 48 }} className="text-gray-300" />
                        <Text type="secondary">Failed to load file. It may no longer exist.</Text>
                    </div>
                ) : isImage ? (
                    <div className="w-full flex justify-center">
                        <Image
                            src={objectUrl}
                            alt={publicId}
                            className="max-h-[70vh] object-contain"
                            style={{ width: "100%" }}
                            fallback="https://placehold.co/800x600?text=Failed+to+Load"
                        />
                    </div>
                ) : isPdf ? (
                    <iframe
                        title="PDF Preview"
                        src={`${objectUrl}#view=FitH`}
                        className="w-full h-[60vh] sm:h-[70vh] border-none rounded-md"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                        <FileTextOutlined style={{ fontSize: 48 }} className="text-gray-300" />
                        <Text type="secondary">Preview not available for .{fileExtension} files.</Text>
                        <Button type="primary" ghost icon={<DownloadOutlined />} onClick={handleDownload}>
                            Download instead
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default ShowFileModal