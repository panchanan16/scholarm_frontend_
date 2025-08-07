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
              // Get the current paragraph or container
              const currentElement = editor.selection.getNode();
              const currentHtml = currentElement.innerHTML || currentElement.textContent;
              
              // Check if there's a [number] pattern that's not already a link
              const hasPattern = /\[(\d+)\](?![^<]*<\/a>)/.test(currentHtml);
              
              if (hasPattern) {
                // Save cursor position relative to the current element
                const selection = editor.selection;
                const range = selection.getRng();
                const startContainer = range.startContainer;
                const startOffset = range.startOffset;
                
                // Replace patterns in this element only
                const newHtml = currentHtml.replace(
                  /\[(\d+)\](?![^<]*<\/a>)/g,
                  '<a href="#ref-$1">[$1]</a>'
                );
                
                if (newHtml !== currentHtml) {
                  // Update the element content
                  currentElement.innerHTML = newHtml;
                  
                  // Try to restore cursor position
                  try {
                    const newRange = editor.dom.createRng();
                    
                    // If the start container still exists and is text
                    if (startContainer && startContainer.nodeType === 3 && startContainer.parentNode) {
                      newRange.setStart(startContainer, Math.min(startOffset, startContainer.textContent.length));
                      newRange.setEnd(startContainer, Math.min(startOffset, startContainer.textContent.length));
                    } else {
                      // Find a text node near the end of the element to place cursor
                      const walker = editor.dom.createTreeWalker(currentElement, NodeFilter.SHOW_TEXT);
                      let lastTextNode = null;
                      let node;
                      
                      while (node = walker.nextNode()) {
                        lastTextNode = node;
                      }
                      
                      if (lastTextNode) {
                        newRange.setStart(lastTextNode, lastTextNode.textContent.length);
                        newRange.setEnd(lastTextNode, lastTextNode.textContent.length);
                      }
                    }
                    
                    selection.setRng(newRange);
                  } catch (err) {
                    // If cursor restoration fails, just place at end of element
                    editor.selection.select(currentElement);
                    editor.selection.collapse(false);
                  }
                }
              }
            }
          });

          // On paste
          editor.on("paste", function (e) {
            setTimeout(() => {
              const content = editor.getContent();
              const newContent = content.replace(
                /\[(\d+)\]/g,
                '<a href="#ref-$1">[$1]</a>'
              );

              if (newContent !== content) {
                const bookmark = editor.selection.getBookmark(2, true);
                editor.setContent(newContent);
                
                try {
                  editor.selection.moveToBookmark(bookmark);
                } catch (e) {
                  // Fallback: place cursor at end
                  editor.selection.select(editor.getBody(), true);
                  editor.selection.collapse(false);
                }
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