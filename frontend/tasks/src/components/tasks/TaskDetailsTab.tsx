import { TaskAttachmentList } from './TaskAttachmentList';
import type { Client, SafeUser, TaskAttachment, TaskRecord, TaskLabel } from '../../types';

interface TaskDetailsTabProps {
  task: TaskRecord;
  attachments: TaskAttachment[];
  clients: Client[];
  users: SafeUser[];
  labels: TaskLabel[];
  onDeleteAttachment: (attachment: TaskAttachment) => void;
}

export function TaskDetailsTab({
  task,
  attachments,
  onDeleteAttachment,
}: TaskDetailsTabProps) {
  return (
    <section className="task-details-grid">
      <article className="card-panel task-detail-card task-detail-prose-card">
        <div className="section-header task-detail-section-header">
          <div>
            <h2>Description</h2>
          </div>
        </div>
        {task.descriptionHtml ? (
          <div className="tiptap-rendered" dangerouslySetInnerHTML={{ __html: task.descriptionHtml }} />
        ) : (
          <div className="empty-state compact">No description added yet.</div>
        )}
      </article>

      <article className="card-panel task-detail-card">
        <div className="section-header task-detail-section-header">
          <div>
            <h2>Attachments</h2>
          </div>
        </div>
        <TaskAttachmentList attachments={attachments} taskId={task.id} onDelete={onDeleteAttachment} />
      </article>
    </section>
  );
}
