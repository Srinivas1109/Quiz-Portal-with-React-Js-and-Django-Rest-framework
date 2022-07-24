import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ClimbingBoxLoader, BeatLoader } from "react-spinners";

export default function TextEditor(props) {
    const [editorLoading, setEditorLoading] = useState(true)
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            // props.onChange(editorRef.current.getContent())
            if (props.param === "question") {
                props.onChange((prev) => {
                    return {
                        ...prev,
                        question: editorRef.current.getContent()
                    }
                })
            } else if (props.param === "explanation") {

                props.onChange((prev) => {
                    return {
                        ...prev,
                        explanation: editorRef.current.getContent()
                    }
                })

            } else if (props.param === "textBoxAnswer") {

                props.onChange((prev) => {
                    return {
                        ...prev,
                        text_box_answer: editorRef.current.getContent()
                    }
                })

            } else if (props.param === "userTextAnswer") {

                props.onChange((prev) => {
                    return [...prev, { [props.relatedTo]: editorRef.current.getContent() }]
                })

            }
        }

    };

    const color = "#17A2B8"

    return (
        <>
            {editorLoading &&
                <div className='editor-spinner-container'>
                    <BeatLoader color={color} loading={editorLoading} size={15} />
                </div>
            }
            <Editor
                apiKey='jhw1il6iqzeyi3b8youygp0aemow4rmnfzi2lg6g63n1hbim'
                onInit={(evt, editor) => { editorRef.current = editor; setEditorLoading(false) }}
                initialValue=""
                init={{
                    placeholder: "Enter your text here...",
                    height: 200,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={log}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </>
    );
}