import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor(props) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            props.onChange(editorRef.current.getContent())
        }
    };

    return (
        <>
            <Editor
                apiKey='jhw1il6iqzeyi3b8youygp0aemow4rmnfzi2lg6g63n1hbim'
                onInit={(evt, editor) => editorRef.current = editor}
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
            onEditorChange= {log}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </>
    );
}