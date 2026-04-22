import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Checkbox, Input, Select, Space } from "antd"

interface DocumentBox {
    value?: {
        label: string,
        required: boolean,
        fileType: string
    }[]
    onChange?: (value:{}[]) => void
}

function DocumentBox({value = [], onChange}: DocumentBox){
    const handleAddDoc = () => {
        const newList = [...value, { label: "", required: true, fileType: ".pdf" }];
        onChange?.(newList);
    }
    const handleRemoveDoc = (removeIndex: number) => {
        const newList = [...value].filter((_, i) => i != removeIndex);
        onChange?.(newList);
    }
    const handleOnchange = (index: number, newValue: {label: string, required: boolean, fileType: string}) => {
        var newList = [...value]
        newList[index] = newValue
        onChange?.(newList);
    }
    return(
        <>
            <div className="flex-col gap-3 flex">
                {value.map((val, i) => {
                    return (
                        <div className="flex gap-4 items-center flex-wrap">
                            <Space.Compact className="flex-1 min-w-75">
                                <Input 
                                    value={val.label||""}
                                    placeholder="Document Name"
                                    onChange={(e) => handleOnchange(i, {...val, label: e.target.value})}
                                />
                                <Button 
                                    type="text" 
                                    danger 
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => handleRemoveDoc(i)}
                                />
                            </Space.Compact>
                            <Space wrap>
                                <Select
                                    defaultValue={val.fileType||".pdf"}
                                    options={[
                                        {value:".pdf", label:"pdf"},
                                        {value:"image/*", label:"img"}
                                    ]}
                                    onChange={(e) =>  handleOnchange(i , {...val, fileType: e})}
                                />
                                <Checkbox 
                                    onChange={(e) =>  handleOnchange(i , {...val, required: e.target.checked})}
                                    checked={val.required}
                                >
                                    Required
                                </Checkbox>
                            </Space>
                        </div>
                    )
                })}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAddDoc}>
                    Add File Requirement
                </Button>
            </div>
        </>
    )
}
export default DocumentBox