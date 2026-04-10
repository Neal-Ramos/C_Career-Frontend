import { MinusCircleOutlined } from "@ant-design/icons"
import { Button, Checkbox, Input, Space } from "antd"
import Text from "antd/es/typography/Text"
import { useState } from "react"

interface CustomFieldBox{
    value?: {label: string, required: boolean}[]
    onChange?: (value: {}[]) => void
}

function CustomFieldBox({value = [], onChange}: CustomFieldBox){
    const [newFieldLabel, setNewFieldLabel] = useState("")

    const handleAddField = () => {
        onChange?.([...value, {label: newFieldLabel, required: true}])
        setNewFieldLabel("")
    }
    const handleChangeReqButton = (index: number) => {
        onChange?.(value.map((v, i) => {
            if(i == index)return {label: v.label, required: !v.required}
            return v
        }))
    }
    const handleRemoveReq = (index: number) => {
        onChange?.(value.filter((_, i) => i!=index))
    }

    return (
        <div className="flex flex-col gap-2">
            {value.map((e, i) => {
                return(
                    <>
                        <Space.Compact className="flex justify-center items-center gap-1">
                            <div style={{ 
                                border: '1px solid #d9d9d9', 
                                borderRadius: '8px',  
                                background: '#fff',
                                borderRight: "none",
                                flex: 1,
                                padding: 5
                            }}>
                                <Text>{e.label}</Text>
                            </div>
                            <Button
                                type="text" 
                                danger 
                                icon={<MinusCircleOutlined />}
                                style={{
                                    borderRadius: "0 8px 8px 0"
                                }}
                                onClick={() => handleRemoveReq(i)}
                            />
                            <Checkbox
                                checked={e.required}
                                onClick={() => handleChangeReqButton(i)}
                            >Required</Checkbox>
                        </Space.Compact>
                    </>
                )
            })}
            <Space.Compact>
                <Input
                    placeholder="Add Custom Requirement"
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                />
                <Button
                type="primary"
                    disabled={!newFieldLabel.trim()}
                    onClick={handleAddField}
                >Add Field</Button>
            </Space.Compact>
        </div>
    )
}
export default CustomFieldBox