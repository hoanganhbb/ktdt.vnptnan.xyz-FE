import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

import MenuBar from './MenuBar';
import './tiptap-editor.css';

/**
 * TiptapEditor — drop-in replacement for react-quill.
 *
 * Props:
 *  - value        : HTML string (controlled)
 *  - onChange      : (html: string) => void
 *  - placeholder   : string
 *  - readOnly      : boolean
 *  - style         : CSSProperties  (applied to wrapper)
 *  - className     : string
 */
const TiptapEditor = ({
  value = '',
  onChange,
  placeholder = 'Nhập nội dung…',
  readOnly = false,
  style,
  className = ''
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Placeholder.configure({ placeholder })
    ],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getHTML());
    }
  });

  /* ------ link helper ------ */
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  /* ------ image helper ------ */
  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={`tiptap-editor-wrapper ${className}`} style={style}>
      {!readOnly && <MenuBar editor={editor} setLink={setLink} addImage={addImage} />}
      <EditorContent editor={editor} className="tiptap-editor-content" />
    </div>
  );
};

export default TiptapEditor;
