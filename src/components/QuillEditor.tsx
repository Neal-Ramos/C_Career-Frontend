import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"

interface QuillEditor{
    value?: string
    onChange?: (value: string) => void
}
const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
    ],
}
const formats = [
    "header",
    "bold", "italic", "underline", "strike",
    "list",
    "link", "image",
]

function QuillEditor({value, onChange}:QuillEditor){

    const handleOnchange = (val: string) => {
        onChange?.(val)
    }

    return(
        <div className="h-50">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={(val) => handleOnchange(val)}
                modules={modules}
                formats={formats}
                placeholder="Write something..."
                className="h-full"
            />
        </div>
    )
}
export default QuillEditor