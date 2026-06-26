import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalShell } from '../../../shared/components/ModalShell';
import { TaskAttachmentsUploader } from '../components/tasks/TaskAttachmentsUploader';
import { TaskAttachmentList } from '../components/tasks/TaskAttachmentList';
import { TaskDescriptionEditor } from '../components/editor/TaskDescriptionEditor';
import { buildAuthenticatedFileUrl, deleteTaskAttachment, fetchTaskAttachments, uploadTaskAttachments } from '../lib/api';
import type { Client, SafeUser, TaskAttachment, TaskFormValues, TaskLabel, TaskRecord } from '../types';

const taskFormSchema = z.object({
  title: z.string().trim().min(2).max(191),
  clientId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'TO_REVIEW', 'COMPLETED', 'ON_HOLD']),
  labels: z.array(z.string()).default([]),
  descriptionHtml: z.string().default('<p></p>'),
});

interface TaskFormModalProps {
  mode: 'create' | 'edit';
  task?: TaskRecord;
  clients: Client[];
  users: SafeUser[];
  labels: TaskLabel[];
  onClose: () => void;
  onSubmit: (values: TaskFormValues, pendingFiles: File[]) => Promise<TaskRecord>;
}

function defaultValues(task?: TaskRecord): TaskFormValues {
  return {
    title: task?.title || '',
    clientId: task?.clientId || 0,
    userId: task?.userId || 0,
    priority: task?.priority || 'MEDIUM',
    status: task?.status || 'OPEN',
    labels: task?.labels.map((label) => label.name) || [],
    descriptionHtml: task?.descriptionHtml || '<p></p>',
  };
}

export function TaskFormModal({
  mode,
  task,
  clients,
  users,
  labels,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [existingAttachments, setExistingAttachments] = useState<TaskAttachment[]>([]);
  const [attachmentMessage, setAttachmentMessage] = useState('');
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultValues(task),
  });

  useEffect(() => {
    form.reset(defaultValues(task));
  }, [form, task]);

  useEffect(() => {
    if (!task) {
      return;
    }

    void fetchTaskAttachments(task.id).then(setExistingAttachments).catch(() => {
      setAttachmentMessage('Unable to load attachments right now.');
    });
  }, [task]);

  return (
    <ModalShell open={true} onClose={onClose} rootClassName="modal-backdrop" panelClassName="modal-card">
      <header className="modal-header">
        <div>
          <span className="section-chip">Task</span>
          <h2>{mode === 'create' ? 'Create task' : 'Edit task'}</h2>
          <p>Capture the brief, assign the work, and keep the team aligned.</p>
        </div>
        <button type="button" className="modal-close-button" onClick={onClose} aria-label="Close task modal">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <form
        className="task-form"
        onSubmit={form.handleSubmit(async (values) => {
          setIsSaving(true);
          try {
            await onSubmit(values, pendingFiles);
            setPendingFiles([]);
            onClose();
          } finally {
            setIsSaving(false);
          }
        })}
      >
          <div className="field">
            <label htmlFor="task-title-react">Task title</label>
            <input id="task-title-react" type="text" {...form.register('title')} />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="task-client-react">Client</label>
              <select id="task-client-react" {...form.register('clientId', { valueAsNumber: true })}>
                <option value={0}>Select client</option>
                {clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="task-user-react">Assigned user</label>
              <select id="task-user-react" {...form.register('userId', { valueAsNumber: true })}>
                <option value={0}>Select user</option>
                {users.map((user) => <option key={user.id} value={user.id}>{user.name} ({user.role})</option>)}
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="task-priority-react">Priority</label>
              <select id="task-priority-react" {...form.register('priority')}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="task-status-react">Status</label>
              <select id="task-status-react" {...form.register('status')}>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="TO_REVIEW">To Review</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
          </div>

          <Controller
            control={form.control}
            name="labels"
            render={({ field }) => {
              const available = labels.filter((label) => !field.value.includes(label.name));

              return (
                <div className="label-field">
                  <span>Labels</span>
                  <div className="label-pill-list">
                    {field.value.length > 0 ? field.value.map((value) => (
                      <button
                        key={value}
                        type="button"
                        className="label-pill"
                        onClick={() => field.onChange(field.value.filter((label) => label !== value))}
                      >
                        {value} ×
                      </button>
                    )) : <span className="muted-copy">No labels selected yet.</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="task-label-select-react">Add existing label</label>
                    <select
                      id="task-label-select-react"
                      defaultValue=""
                      onChange={(event) => {
                        const value = event.target.value;
                        if (!value) {
                          return;
                        }

                        field.onChange([...field.value, value]);
                        event.target.value = '';
                      }}
                    >
                      <option value="">Add existing label</option>
                      {available.map((label) => <option key={label.id} value={label.name}>{label.name}</option>)}
                    </select>
                  </div>
                </div>
              );
            }}
          />

          <Controller
            control={form.control}
            name="descriptionHtml"
            render={({ field }) => (
              <div>
                <span className="editor-label">Description</span>
                <TaskDescriptionEditor
                  users={users}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Outline scope, acceptance criteria, code snippets, reference links, or a lightweight checklist."
                  onImageUpload={task ? async (file) => {
                    const attachments = await uploadTaskAttachments(task.id, [file]);
                    const nextAttachment = attachments[attachments.length - 1];
                    setExistingAttachments(attachments);

                    if (!nextAttachment) {
                      throw new Error('Image upload failed');
                    }

                    return buildAuthenticatedFileUrl(`/api/tasks/${task.id}/attachments/${nextAttachment.id}/file`);
                  } : undefined}
                />
              </div>
            )}
          />

          <div className="attachments-panel">
            <div className="attachments-panel-header">
              <strong>Attachments</strong>
              <small>{task ? 'Upload now or remove existing files below.' : 'Files will upload right after the task is created.'}</small>
            </div>

            <TaskAttachmentsUploader
              onFilesSelected={(files) => {
                if (task) {
                  void uploadTaskAttachments(task.id, files)
                    .then(setExistingAttachments)
                    .catch(() => setAttachmentMessage('Unable to upload those files right now.'));
                  return;
                }

                setPendingFiles((current) => [...current, ...files]);
              }}
            />

            {task ? (
              <TaskAttachmentList
                attachments={existingAttachments}
                taskId={task.id}
                onDelete={(attachment) => {
                  void deleteTaskAttachment(task.id, attachment.id)
                    .then(() => fetchTaskAttachments(task.id))
                    .then(setExistingAttachments)
                    .catch(() => setAttachmentMessage('Unable to delete this attachment right now.'));
                }}
              />
            ) : pendingFiles.length > 0 ? (
              <div className="pending-attachment-list">
                {pendingFiles.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="pending-attachment-item">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="client-action client-action-edit"
                      onClick={() => {
                        setPendingFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state compact">No pending attachments yet.</div>
            )}

            {attachmentMessage ? <p className="feedback-message">{attachmentMessage}</p> : null}
          </div>

          <footer className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : mode === 'create' ? 'Create task' : 'Save changes'}
            </button>
          </footer>
      </form>
    </ModalShell>
  );
}
