import { MinusCircleOutlined } from "@ant-design/icons"
import { Button, Checkbox, Input, Select, Space } from "antd"
import Text from "antd/es/typography/Text"
import { useState } from "react"
import type { ParsedCustomFieldsJobs } from "../Types/Jobs"

interface CustomFieldBox{
    value?: ParsedCustomFieldsJobs[]
    onChange?: (value: ParsedCustomFieldsJobs[]) => void
}

function CustomFieldBox({value = [], onChange}: CustomFieldBox){
    const [newFieldLabel, setNewFieldLabel] = useState("")

    const handleAddField = () => {
        onChange?.([...value, {label: newFieldLabel, required: true, inputType: "text"}])
        setNewFieldLabel("")
    }
    const handleChangeReqButton = (index: number) => {
        onChange?.(value.map((v, i) => {
            if(i == index)return {...v, required: !v.required}
            return v
        }))
    }
    const handleRemoveReq = (index: number) => {
        onChange?.(value.filter((_, i) => i!=index))
    }
    const handleChangeInputType = (index: number, type: "text"|"date"|"number") => {
        onChange?.(value.map((v, i) => {
            if(i == index)return {...v, inputType: type}
            return v
        }))
    }

    return (
        <div className="flex flex-col gap-2">
            {value.map((e, i) => {
                return(
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                        <div style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: '8px',
                            background: '#fff',
                            padding: 5,
                            flex: 1,
                        }}>
                            <Text>{e.label}</Text>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="text"
                                danger
                                icon={<MinusCircleOutlined />}
                                style={{ borderRadius: '8px' }}
                                onClick={() => handleRemoveReq(i)}
                            />
                            <Select
                                style={{ width: 100 }}
                                defaultValue={e.inputType || ""}
                                options={[
                                    { value: 'text', label: 'Text' },
                                    { value: 'date', label: 'Date' },
                                    { value: 'number', label: 'Number' }
                                ]}
                                onChange={(val) => handleChangeInputType(i, val)}
                            />
                            <Checkbox
                                checked={e.required}
                                onClick={() => handleChangeReqButton(i)}
                            >
                                Required
                            </Checkbox>
                        </div>
                    </div>
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