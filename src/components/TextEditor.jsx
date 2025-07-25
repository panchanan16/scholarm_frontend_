import { Editor } from "@tinymce/tinymce-react";

const BASE_URL = "";
const entityCore = "";

function TextEditor({ name, setInForm, initialContent, editorRef }) {
  return (
    <Editor
      onInit={(_evt, editor) =>
        editorRef ? (editorRef.current = editor) : null
      }
      onEditorChange={(content) =>
        setInForm ? setInForm(name, content) : null
      }
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      initialValue={`${initialContent ? initialContent : ""}`}
      init={{
        selector: "textarea",
        license_key: "gpl",
        height: 300,
        menubar: true,
        forced_root_block: "p",
        forced_root_block_attrs: {
          class: "article-paragraph",
        },
        setup: function (editor) {
          editor.on("keyup", function (e) {
            if (e.key === " ") {
              const content = editor.getContent();
              const newContent = content.replace(
                /\[(\d+)\]/g,
                '<a href="#ref-$1">[$1]</a>'
              );

              if (newContent !== content) {
                editor.setContent(newContent);
              }
            }
          });

          // On paste ---
          // Convert on paste
          editor.on("paste", function (e) {
            setTimeout(() => {
              const content = editor.getContent();
              const newContent = content.replace(
                /\[(\d+)\]/g,
                '<a href="#ref-$1">[$1]</a>'
              );

              if (newContent !== content) {
                editor.setContent(newContent);
              }
            }, 100);
          });
        },
        images_upload_url: "postAcceptor.php",
        images_upload_handler: function (blobInfo, progress) {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("otherfile", blobInfo.blob());

            fetch(`${entityCore}/texteditor/fileupload`, {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.location) {
                  resolve(`${BASE_URL}${data.location}`);
                } else {
                  reject("Upload failed: No location returned.");
                }
              })
              .catch((error) => {
                reject("HTTP Error: " + error.message);
              });
          });
        },
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}

export default TextEditor;
