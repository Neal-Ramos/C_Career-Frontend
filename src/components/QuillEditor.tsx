import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"

type ReactQuillProps = React.ComponentProps<typeof ReactQuill>;
interface QuillEditor extends ReactQuillProps {
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
    "link", "image"
]

function QuillEditor({value, onChange, ...props}:QuillEditor){

    const handleOnchange = (val: string) => {
        onChange?.(val)
    }

    return(
        <div className={"h-50 border p-2 border-gray-400 rounded-[5px]"}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={(val) => handleOnchange(val)}
                modules={modules}
                formats={formats}
                placeholder="Write something..."
                className="h-full"
                {...props}
            />
        </div>
    )
}
export default QuillEditor