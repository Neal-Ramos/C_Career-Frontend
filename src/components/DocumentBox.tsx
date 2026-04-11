import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Checkbox, Input, Space } from "antd"

interface DocumentBox {
    value?: {
        label: string,
        required: boolean
    }[]
    onChange?: (value:{}[]) => void
}

function DocumentBox({value = [], onChange}: DocumentBox){
    const handleAddDoc = () => {
        const newList = [...value, { label: "", required: true }];
        onChange?.(newList);
    }
    const handleRemoveDoc = (removeIndex: number) => {
        const newList = [...value].filter((_, i) => i != removeIndex);
        onChange?.(newList);
    }
    const handleOnchange = (index: number, newValue: {label: string, required: boolean}) => {
        const newList = value.map((v ,i) => {
            if(i == index){
                return newValue
            }
            return v
        });
        onChange?.(newList);
    }
    return(
        <>
            <div className="flex-col gap-3 flex">
                {value.map((val, i) => {
                    return <div className="flex gap-4 items-center">
                        <Space.Compact className="flex-1">
                            <Input 
                                value={val.label||""}
                                placeholder="Document Name"
                                onChange={(e) => handleOnchange(i, {label: e.target.value, required: val.required})}
                            />
                            <Button 
                                type="text" 
                                danger 
                                icon={<MinusCircleOutlined />}
                                onClick={() => handleRemoveDoc(i)}
                            />
                        </Space.Compact>
                        <Checkbox 
                            onChange={(e) =>  handleOnchange(i, {label: val.label, required: e.target.checked})}
                            checked={val.required}
                        >
                            Required
                        </Checkbox>
                    </div>
                })}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAddDoc}>
                    Add File Requirement
                </Button>
            </div>
        </>
    )
}
export default DocumentBox