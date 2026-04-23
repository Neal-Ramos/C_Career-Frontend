import { useState } from "react";
import ReactQuill from "react-quill-new";
import { Button } from "antd";
import "react-quill-new/dist/quill.snow.css";

interface QuillViewerProps {
  value: string;
}

function QuillViewer({ value }: QuillViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className={`relative transition-all duration-300 overflow-hidden ${
          !isExpanded ? "max-h-20" : "max-h-none"
        }`}
      >
        <ReactQuill
          value={value}
          readOnly
          theme="snow"
          modules={{
            toolbar: null,
          }}
        />
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      <Button
        type="link"
        onClick={() => setIsExpanded(!isExpanded)}
        className="pt-0! h-auto! mt-1 w-fit text-blue-600 font-semibold "
      >
        {isExpanded ? "Show Less..." : "Show More..."}
      </Button>
    </div>
  );
}

export default QuillViewer;