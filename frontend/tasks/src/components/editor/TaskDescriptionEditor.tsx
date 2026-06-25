import { useEffect, useMemo, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import Mention from '@tiptap/extension-mention';
import { createLowlight, common } from 'lowlight';
import type { SafeUser } from '../../types';

const lowlight = createLowlight(common);

interface MentionOption {
  id: string;
  label: string;
}

interface TaskDescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  users?: SafeUser[];
  compact?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}

function createMentionSuggestion(users: SafeUser[]) {
  return {
    items: ({ query }: { query: string }) => users
      .filter((user) => {
        const candidate = `${user.name} ${user.email}`.toLowerCase();
        return candidate.includes(query.toLowerCase());
      })
      .slice(0, 6)
      .map<MentionOption>((user) => ({
        id: String(user.id),
        label: user.name,
      })),
    render: () => {
      let popup: HTMLDivElement | null = null;
      let selectedIndex = 0;
      let currentProps: {
        items: MentionOption[];
        command: (item: MentionOption) => void;
        clientRect?: () => DOMRect | null;
      } | null = null;

      const updatePopup = () => {
        if (!popup || !currentProps) {
          return;
        }

        popup.innerHTML = '';

        currentProps.items.forEach((item, index) => {
          const option = document.createElement('button');
          option.type = 'button';
          option.className = `mention-option${index === selectedIndex ? ' active' : ''}`;
          option.textContent = item.label;
          option.onclick = () => currentProps?.command(item);
          popup?.appendChild(option);
        });

        const rect = currentProps.clientRect?.();
        if (rect) {
          popup.style.left = `${rect.left + window.scrollX}px`;
          popup.style.top = `${rect.bottom + window.scrollY + 8}px`;
        }
      };

      return {
        onStart: (props: typeof currentProps) => {
          currentProps = props;
          selectedIndex = 0;
          popup = document.createElement('div');
          popup.className = 'mention-popup';
          document.body.appendChild(popup);
          updatePopup();
        },
        onUpdate: (props: typeof currentProps) => {
          currentProps = props;
          updatePopup();
        },
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
          if (!currentProps || currentProps.items.length === 0) {
            return false;
          }

          if (event.key === 'ArrowDown') {
            selectedIndex = (selectedIndex + 1) % currentProps.items.length;
            updatePopup();
            return true;
          }

          if (event.key === 'ArrowUp') {
            selectedIndex = (selectedIndex + currentProps.items.length - 1) % currentProps.items.length;
            updatePopup();
            return true;
          }

          if (event.key === 'Enter') {
            currentProps.command(currentProps.items[selectedIndex]);
            return true;
          }

          if (event.key === 'Escape') {
            popup?.remove();
            popup = null;
            return true;
          }

          return false;
        },
        onExit: () => {
          popup?.remove();
          popup = null;
          currentProps = null;
        },
      };
    },
  };
}

export function TaskDescriptionEditor({
  value,
  onChange,
  placeholder = 'Write the task details here...',
  users = [],
  compact = false,
  onImageUpload,
}: TaskDescriptionEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mentionSuggestion = useMemo(() => createMentionSuggestion(users), [users]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ['http', 'https', 'mailto'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention-chip',
        },
        suggestion: mentionSuggestion,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: `tiptap-editor${compact ? ' compact' : ''}`,
      },
      handleDrop: (_view, event) => {
        const file = Array.from(event.dataTransfer?.files || []).find((candidate) => candidate.type.startsWith('image/'));
        if (!file || !onImageUpload) {
          return false;
        }

        void onImageUpload(file).then((url) => {
          editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
        });

        return true;
      },
      handlePaste: (_view, event) => {
        const file = Array.from(event.clipboardData?.files || []).find((candidate) => candidate.type.startsWith('image/'));
        if (!file || !onImageUpload) {
          return false;
        }

        void onImageUpload(file).then((url) => {
          editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
        });

        return true;
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || '<p></p>', { emitUpdate: false });
    }
  }, [editor, value]);

  const insertImage = async (file?: File) => {
    if (!editor || !onImageUpload || !file) {
      return;
    }

    const url = await onImageUpload(file);
    editor.chain().focus().setImage({ src: url, alt: file.name }).run();
  };

  return (
    <div className={`editor-shell${isFullscreen ? ' fullscreen' : ''}`}>
      <div className="editor-toolbar">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHighlight().run()}>Highlight</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>Bullets</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleTaskList().run()}>Checklist</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code</button>
        <button type="button" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Table</button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter a link URL');
            if (!url) {
              return;
            }

            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }}
        >
          Link
        </button>
        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={!onImageUpload}>Image</button>
        <button type="button" onClick={() => editor?.chain().focus().undo().run()}>Undo</button>
        <button type="button" onClick={() => editor?.chain().focus().redo().run()}>Redo</button>
        <button type="button" className="toolbar-spacer" onClick={() => setIsFullscreen((current) => !current)}>
          {isFullscreen ? 'Exit full screen' : 'Full screen'}
        </button>
      </div>

      <EditorContent editor={editor} />
      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          void insertImage(file);
          event.target.value = '';
        }}
      />
    </div>
  );
}
