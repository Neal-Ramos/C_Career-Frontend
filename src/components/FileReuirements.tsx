import { Col, Form, Row, Upload } from "antd"

interface FileRequirements {
    files: {
        label: string
        required: boolean
    }[]
}

function FileRequirements({files}: FileRequirements) {
    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    return(
        <Row gutter={[16, 16]}>
            {files.map((file) => (
                <Col xs={24} md={12} key={file.label}>
                    <Form.Item 
                        label={
                        <span>
                            {file.label} 
                            <small style={{ color: file.required ? 'red' : 'gray', marginLeft: '5px' }}>
                            {file.required ? "* Required" : "(Optional)"}
                            </small>
                        </span>
                        } 
                        name={file.label}
                        valuePropName="fileList" 
                        getValueFromEvent={normFile}
                        rules={[{ required: file.required, message: `${file.label} is required` }]}
                    >
                        <Upload.Dragger name="resumeFile" maxCount={1} beforeUpload={() => false}>
                            <p className="text-blue-500! text-2xl!">📜</p>
                            <p className="ant-upload-text">Drop {file.label} here</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Col>
            ))}
        </Row>
    )
}
export default FileRequirements