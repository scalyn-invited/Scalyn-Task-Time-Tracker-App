import { CommentItem } from './CommentItem';
import type { SafeUser, TaskComment } from '../../types';

interface CommentListProps {
  comments: TaskComment[];
  currentUser: SafeUser;
  users: SafeUser[];
  onReply: (comment: TaskComment, content: string) => Promise<void>;
  onUpdate: (comment: TaskComment, content: string) => Promise<void>;
  onDelete: (comment: TaskComment) => Promise<void>;
}

function buildCommentTree(comments: TaskComment[]): TaskComment[] {
  const byId = new Map<number, TaskComment>();
  const roots: TaskComment[] = [];

  comments.forEach((comment) => {
    byId.set(comment.id, { ...comment, replies: [] });
  });

  byId.forEach((comment) => {
    if (comment.parentId && byId.has(comment.parentId)) {
      byId.get(comment.parentId)?.replies?.push(comment);
      return;
    }

    roots.push(comment);
  });

  return roots;
}

export function CommentList({
  comments,
  currentUser,
  users,
  onReply,
  onUpdate,
  onDelete,
}: CommentListProps) {
  const tree = buildCommentTree(comments);

  if (tree.length === 0) {
    return <div className="empty-state">No comments yet. Start the conversation here.</div>;
  }

  return (
    <div className="comment-list">
      {tree.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          users={users}
          onReply={onReply}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
