import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createTaskComment,
  deleteTaskAttachment,
  deleteTaskComment,
  fetchClients,
  fetchLabels,
  fetchTask,
  fetchTaskActivity,
  fetchTaskAttachments,
  fetchTaskComments,
  fetchUsers,
  fetchCurrentUser,
  updateTask,
  updateTaskComment,
} from '../../lib/api';
import { useTaskDetailStore } from '../../store/task-detail.store';
import { TaskDetailsTab } from '../../components/tasks/TaskDetailsTab';
import { CommentEditor } from '../../components/comments/CommentEditor';
import { CommentList } from '../../components/comments/CommentList';
import { ActivityTimeline } from '../../components/activity/ActivityTimeline';
import { EditTaskModal } from '../../modals/EditTaskModal';
import { TaskPriorityBadge, TaskStatusBadge } from '../../components/tasks/TaskStatusBadge';
import type {
  Client,
  SafeUser,
  TaskActivity,
  TaskAttachment,
  TaskComment,
  TaskFormValues,
  TaskLabel,
  TaskRecord,
} from '../../types';

export function TaskDetailsPage() {
  const params = useParams();
  const taskId = Number(params.taskId || '0');
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    task,
    setTask,
    attachmentRefreshKey,
    commentRefreshKey,
    activityRefreshKey,
    touchAttachments,
    touchComments,
    touchActivity,
  } = useTaskDetailStore();

  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [labels, setLabels] = useState<TaskLabel[]>([]);
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [activity, setActivity] = useState<TaskActivity[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!taskId) {
      navigate('/tasks');
      return;
    }

    void Promise.all([
      fetchTask(taskId),
      fetchClients(),
      fetchUsers(),
      fetchLabels(),
      fetchCurrentUser(),
    ])
      .then(([nextTask, nextClients, nextUsers, nextLabels, nextCurrentUser]) => {
        setTask(nextTask);
        setClients(nextClients);
        setUsers(nextUsers);
        setLabels(nextLabels);
        setCurrentUser(nextCurrentUser);
      })
      .catch((error: unknown) => {
        setFeedback(error instanceof Error ? error.message : 'Unable to load task details');
      });
  }, [navigate, setTask, taskId]);

  useEffect(() => {
    if (!taskId) {
      return;
    }

    void fetchTaskAttachments(taskId).then(setAttachments).catch(() => undefined);
  }, [attachmentRefreshKey, taskId]);

  useEffect(() => {
    if (!taskId) {
      return;
    }

    void fetchTaskComments(taskId).then(setComments).catch(() => undefined);
  }, [commentRefreshKey, taskId]);

  useEffect(() => {
    if (!taskId) {
      return;
    }

    void fetchTaskActivity(taskId).then(setActivity).catch(() => undefined);
  }, [activityRefreshKey, taskId]);

  if (!task || !currentUser) {
    return <section className="route-main"><div className="empty-state">{feedback || 'Loading task details...'}</div></section>;
  }

  const refreshAll = async () => {
    const [nextTask, nextAttachments, nextComments, nextActivity] = await Promise.all([
      fetchTask(taskId),
      fetchTaskAttachments(taskId),
      fetchTaskComments(taskId),
      fetchTaskActivity(taskId),
    ]);

    setTask(nextTask);
    setAttachments(nextAttachments);
    setComments(nextComments);
    setActivity(nextActivity);
  };

  return (
    <section className="route-main tasks-page">
      <header className="topbar dashboard-topbar">
        <div className="task-detail-header-copy">
          <a className="mini-link" href="/tasks">Back to tasks</a>
          <h1>{task.title}</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="action-button" onClick={() => setIsEditing(true)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" /></svg>
            <span>Edit task</span>
          </button>
        </div>
      </header>

      <section className="tasks-summary-grid task-detail-stats">
        <article className="stat-card stat-card-blue">
          <div className="stat-card-head">Client</div>
          <div className="stat-card-body">
            <strong>{task.client.name}</strong>
            <span>Current account</span>
          </div>
        </article>
        <article className="stat-card stat-card-green">
          <div className="stat-card-head">Assigned User</div>
          <div className="stat-card-body">
            <strong>{task.user.name}</strong>
            <span>{task.user.role}</span>
          </div>
        </article>
        <article className="stat-card stat-card-purple">
          <div className="stat-card-head">Priority</div>
          <div className="stat-card-body">
            <strong><TaskPriorityBadge priority={task.priority} /></strong>
            <span>Current urgency</span>
          </div>
        </article>
        <article className="stat-card stat-card-orange">
          <div className="stat-card-head">Status</div>
          <div className="stat-card-body">
            <strong><TaskStatusBadge status={task.status} /></strong>
            <span>Delivery stage</span>
          </div>
        </article>
      </section>

      <section className="card-panel task-detail-panel">
        <div className="task-detail-tabs" role="tablist" aria-label="Task detail tabs">
          <button type="button" className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Details</button>
          <button type="button" className={activeTab === 'comments' ? 'active' : ''} onClick={() => setActiveTab('comments')}>Comments</button>
          <button type="button" className={activeTab === 'activity' ? 'active' : ''} onClick={() => setActiveTab('activity')}>Activity Log</button>
        </div>
        {feedback ? <div className="feedback task-detail-feedback" data-tone="error">{feedback}</div> : null}

        {activeTab === 'details' ? (
          <TaskDetailsTab
            task={task}
            attachments={attachments}
            clients={clients}
            users={users}
            labels={labels}
            onDeleteAttachment={(attachment) => {
              void deleteTaskAttachment(task.id, attachment.id)
                .then(async () => {
                  touchAttachments();
                  touchActivity();
                  await refreshAll();
                })
                .catch((error: unknown) => {
                  setFeedback(error instanceof Error ? error.message : 'Unable to delete attachment');
                });
            }}
          />
        ) : null}

        {activeTab === 'comments' ? (
          <div className="comments-panel">
            <CommentEditor
              users={users}
              onSubmit={async (content) => {
                await createTaskComment(task.id, { content });
                touchComments();
                touchActivity();
                await refreshAll();
              }}
            />

            <CommentList
              comments={comments}
              currentUser={currentUser}
              users={users}
              onReply={async (comment, content) => {
                await createTaskComment(task.id, { content, parentId: comment.id });
                touchComments();
                touchActivity();
                await refreshAll();
              }}
              onUpdate={async (comment, content) => {
                await updateTaskComment(comment.id, { content });
                touchComments();
                touchActivity();
                await refreshAll();
              }}
              onDelete={async (comment) => {
                await deleteTaskComment(comment.id);
                touchComments();
                touchActivity();
                await refreshAll();
              }}
            />
          </div>
        ) : null}

        {activeTab === 'activity' ? <ActivityTimeline activity={activity} /> : null}
      </section>

      {isEditing ? (
        <EditTaskModal
          task={task}
          clients={clients}
          users={users}
          labels={labels}
          onClose={() => setIsEditing(false)}
          onSubmit={async (values: TaskFormValues) => {
            const updated = await updateTask(task.id, values);
            setTask(updated);
            touchActivity();
            await refreshAll();
            return updated;
          }}
        />
      ) : null}
    </section>
  );
}
