import { CommentEditor } from './CommentEditor';
import type { SafeUser } from '../../types';

interface ReplyFormProps {
  users: SafeUser[];
  onSubmit: (value: string) => Promise<void>;
  onCancel: () => void;
}

export function ReplyForm({ users, onSubmit, onCancel }: ReplyFormProps) {
  return <CommentEditor users={users} submitLabel="Reply" onSubmit={onSubmit} onCancel={onCancel} />;
}
