import { useState } from 'react';
import { TaskDescriptionEditor } from '../editor/TaskDescriptionEditor';
import type { SafeUser } from '../../types';

interface CommentEditorProps {
  users: SafeUser[];
  value?: string;
  submitLabel?: string;
  onSubmit: (value: string) => Promise<void>;
  onCancel?: () => void;
}

export function CommentEditor({
  users,
  value = '<p></p>',
  submitLabel = 'Post comment',
  onSubmit,
  onCancel,
}: CommentEditorProps) {
  const [content, setContent] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className="comment-editor">
      <TaskDescriptionEditor
        compact
        users={users}
        value={content}
        placeholder="Add a comment, mention teammates with @, and keep the thread moving."
        onChange={setContent}
      />
      <div className="comment-editor-actions">
        {onCancel ? <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button> : null}
        <button
          type="button"
          className="btn btn-primary"
          disabled={isSaving}
          onClick={async () => {
            setIsSaving(true);
            try {
              await onSubmit(content);
              setContent('<p></p>');
            } finally {
              setIsSaving(false);
            }
          }}
        >
          {isSaving ? 'Saving...' : submitLabel}
        </button>
      </div>
    </div>
  );
}
