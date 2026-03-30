import { Col, Form, Row, Upload } from "antd"

interface FileRequirements {
    files: {
        FileName: string
        Required: boolean
    }[]
}

function FileRequirements({files}: FileRequirements) {
    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    return(
        <Row gutter={16}>
            {
                files.map(file => {
                    return <Col xs={24} md={12}>
                        <Form.Item 
                            label={file.FileName} 
                            name={file.FileName.replace(" ", "" )} 
                            valuePropName="fileList" 
                            getValueFromEvent={normFile}
                            rules={[{ required: file.Required, message: `${file.FileName} is required` }]}
                        >
                            <Upload.Dragger name="resumeFile" maxCount={1} beforeUpload={() => false}>
                                <p className="text-blue-500! text-2xl!">📜</p>
                                <p className="ant-upload-text">Drop {file.FileName} here</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Col>
                })
            }
        </Row>
    )
}
export default FileRequirements