import { useState } from 'react';
import { formatRelativeTime, initials } from '../../lib/format';
import type { SafeUser, TaskComment } from '../../types';
import { CommentEditor } from './CommentEditor';
import { ReplyForm } from './ReplyForm';

interface CommentItemProps {
  comment: TaskComment;
  currentUser: SafeUser;
  users: SafeUser[];
  depth?: number;
  onReply: (comment: TaskComment, content: string) => Promise<void>;
  onUpdate: (comment: TaskComment, content: string) => Promise<void>;
  onDelete: (comment: TaskComment) => Promise<void>;
}

export function CommentItem({
  comment,
  currentUser,
  users,
  depth = 0,
  onReply,
  onUpdate,
  onDelete,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const canEdit = currentUser.id === comment.userId;
  const canReply = depth < 2;

  return (
    <article className="comment-item">
      <header className="comment-header">
        <div className="comment-author">
          <span className="task-avatar">{initials(comment.user.name)}</span>
          <div>
            <strong>{comment.user.name}</strong>
            <small>{formatRelativeTime(comment.createdAt)}{comment.editedAt ? ' • edited' : ''}</small>
          </div>
        </div>
        <div className="comment-actions">
          {canReply ? <button type="button" className="client-action client-action-edit" onClick={() => setIsReplying((value) => !value)}>Reply</button> : null}
          {canEdit ? <button type="button" className="client-action client-action-edit" onClick={() => setIsEditing((value) => !value)}>Edit</button> : null}
          {canEdit ? <button type="button" className="client-action client-action-archive" onClick={() => void onDelete(comment)}>Delete</button> : null}
        </div>
      </header>

      {isEditing ? (
        <CommentEditor
          users={users}
          value={comment.content}
          submitLabel="Save changes"
          onCancel={() => setIsEditing(false)}
          onSubmit={async (value) => {
            await onUpdate(comment, value);
            setIsEditing(false);
          }}
        />
      ) : (
        <div className="comment-body tiptap-rendered" dangerouslySetInnerHTML={{ __html: comment.content }} />
      )}

      {isReplying ? (
        <ReplyForm
          users={users}
          onCancel={() => setIsReplying(false)}
          onSubmit={async (value) => {
            await onReply(comment, value);
            setIsReplying(false);
          }}
        />
      ) : null}

      {comment.replies && comment.replies.length > 0 ? (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              users={users}
              depth={depth + 1}
              onReply={onReply}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
