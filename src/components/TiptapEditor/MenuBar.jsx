import React from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Link2Off,
  ImageIcon,
  Highlighter,
  Type,
  Heading1,
  Heading2,
  Heading3,
  RemoveFormatting
} from 'lucide-react';

const BTN_CLS = 'tiptap-menu-btn';
const BTN_ACTIVE = 'tiptap-menu-btn active';
const DIVIDER = <span className="tiptap-menu-divider" />;

const MenuBar = ({ editor, setLink, addImage }) => {
  if (!editor) return null;

  const btn = active => (active ? BTN_ACTIVE : BTN_CLS);

  return (
    <div className="tiptap-menu-bar">
      {/* ---- History ---- */}
      <button
        type="button"
        className={BTN_CLS}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Hoàn tác"
      >
        <Undo2 size={16} />
      </button>
      <button
        type="button"
        className={BTN_CLS}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Làm lại"
      >
        <Redo2 size={16} />
      </button>

      {DIVIDER}

      {/* ---- Headings ---- */}
      <button
        type="button"
        className={btn(editor.isActive('paragraph'))}
        onClick={() => editor.chain().focus().setParagraph().run()}
        title="Đoạn văn"
      >
        <Type size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('heading', { level: 1 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('heading', { level: 2 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('heading', { level: 3 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      {DIVIDER}

      {/* ---- Marks ---- */}
      <button
        type="button"
        className={btn(editor.isActive('bold'))}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Đậm"
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('italic'))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Nghiêng"
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('underline'))}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Gạch chân"
      >
        <UnderlineIcon size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('strike'))}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Gạch ngang"
      >
        <Strikethrough size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('highlight'))}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        title="Highlight"
      >
        <Highlighter size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('code'))}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Code"
      >
        <Code size={16} />
      </button>

      {DIVIDER}

      {/* ---- Color picker ---- */}
      <label className="tiptap-color-label" title="Màu chữ">
        <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1 }}>A</span>
        <input
          type="color"
          className="tiptap-color-input"
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
        />
      </label>

      {DIVIDER}

      {/* ---- Alignment ---- */}
      <button
        type="button"
        className={btn(editor.isActive({ textAlign: 'left' }))}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        title="Căn trái"
      >
        <AlignLeft size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive({ textAlign: 'center' }))}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        title="Căn giữa"
      >
        <AlignCenter size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive({ textAlign: 'right' }))}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        title="Căn phải"
      >
        <AlignRight size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive({ textAlign: 'justify' }))}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        title="Căn đều"
      >
        <AlignJustify size={16} />
      </button>

      {DIVIDER}

      {/* ---- Lists ---- */}
      <button
        type="button"
        className={btn(editor.isActive('bulletList'))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Danh sách"
      >
        <List size={16} />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('orderedList'))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Danh sách số"
      >
        <ListOrdered size={16} />
      </button>

      {DIVIDER}

      {/* ---- Block ---- */}
      <button
        type="button"
        className={btn(editor.isActive('blockquote'))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Trích dẫn"
      >
        <Quote size={16} />
      </button>
      <button
        type="button"
        className={BTN_CLS}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Đường kẻ ngang"
      >
        <Minus size={16} />
      </button>

      {DIVIDER}

      {/* ---- Link ---- */}
      <button type="button" className={btn(editor.isActive('link'))} onClick={setLink} title="Chèn liên kết">
        <Link2 size={16} />
      </button>
      <button
        type="button"
        className={BTN_CLS}
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        title="Bỏ liên kết"
      >
        <Link2Off size={16} />
      </button>

      {/* ---- Image ---- */}
      <button type="button" className={BTN_CLS} onClick={addImage} title="Chèn ảnh">
        <ImageIcon size={16} />
      </button>

      {DIVIDER}

      {/* ---- Clear formatting ---- */}
      <button
        type="button"
        className={BTN_CLS}
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        title="Xóa định dạng"
      >
        <RemoveFormatting size={16} />
      </button>
    </div>
  );
};

export default MenuBar;
