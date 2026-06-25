import { buildAuthenticatedFileUrl } from '../../lib/api';
import { formatBytes, formatDateTime } from '../../lib/format';
import type { TaskAttachment } from '../../types';

interface TaskAttachmentListProps {
  attachments: TaskAttachment[];
  taskId: number;
  onDelete?: (attachment: TaskAttachment) => void;
}

function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

export function TaskAttachmentList({ attachments, taskId, onDelete }: TaskAttachmentListProps) {
  if (attachments.length === 0) {
    return <div className="empty-state compact">No attachments yet.</div>;
  }

  return (
    <div className="attachment-list">
      {attachments.map((attachment) => {
        const filePath = `/api/tasks/${taskId}/attachments/${attachment.id}/file`;
        const previewUrl = buildAuthenticatedFileUrl(filePath);
        const downloadUrl = buildAuthenticatedFileUrl(filePath, { download: true });

        return (
          <article key={attachment.id} className="attachment-card">
            <div className="attachment-preview">
              {isImage(attachment.mimeType) ? (
                <img src={previewUrl} alt={attachment.originalName} />
              ) : (
                <div className="attachment-file-pill">{attachment.originalName.split('.').pop()?.toUpperCase() || 'FILE'}</div>
              )}
            </div>
            <div className="attachment-copy">
              <strong>{attachment.originalName}</strong>
              <small>{formatBytes(attachment.fileSize)} • {formatDateTime(attachment.createdAt)}</small>
              <small>Uploaded by {attachment.uploader?.name || 'Unknown user'}</small>
            </div>
            <div className="attachment-actions">
              <a className="client-action client-action-edit" href={previewUrl} target="_blank" rel="noreferrer">View</a>
              <a className="client-action client-action-edit" href={downloadUrl}>Download</a>
              {onDelete ? (
                <button type="button" className="client-action client-action-archive" onClick={() => onDelete(attachment)}>Delete</button>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
