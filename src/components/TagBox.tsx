import { Button, Input, Space, Tag } from "antd"
import { useState } from "react"
interface TagBoxProps {
    value?: string[]
    onChange?: (value: string[]) => void
}

function TagBox({ value = [], onChange }: TagBoxProps) {
    const [newTag, setNewTag] = useState<string>("")

    const handleAddTag = () => {
        onChange?.([...value, newTag])
        setNewTag("")
    }

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = value.filter(v => v !== tagToRemove);
        onChange?.(updatedTags);
    }

    return (
        <>
            <div style={{ 
                border: '1px solid #d9d9d9',
                padding: '8px', 
                borderRadius: '8px', 
                marginBottom: '8px', 
                minHeight: '40px',
                background: '#fff'
            }}>
                {value.length === 0 && <span style={{ color: '#bfbfbf' }}>No tags added</span>}
                {value.map(t => (
                    <Tag 
                        key={t} 
                        closable 
                        onClose={(e) => {
                            e.preventDefault();
                            handleRemoveTag(t);
                        }}
                        style={{ marginBottom: '4px' }}
                    >
                        {t}
                    </Tag>
                ))}
            </div>
            <Space.Compact style={{ width: '100%' }}>
                <Input 
                    value={newTag} 
                    onChange={e => setNewTag(e.target.value)} 
                    placeholder="Enter role..."
                    onPressEnter={(e) => {
                        e.preventDefault();
                        handleAddTag();
                    }}
                />
                <Button 
                    type="primary" 
                    onClick={handleAddTag}
                    {...{
                        disabled: newTag.trim()? false:true
                    }}
                >Add</Button>
            </Space.Compact>
        </>
    )
}

export default TagBox