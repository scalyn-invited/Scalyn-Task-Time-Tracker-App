import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  cancelTimer,
  createManualTimeEntry,
  createTaskComment,
  deleteTaskAttachment,
  deleteTaskComment,
  deleteTimeEntry,
  fetchActiveTimer,
  fetchClients,
  fetchLabels,
  fetchTask,
  fetchTaskActivity,
  fetchTaskAttachments,
  fetchTaskComments,
  fetchTaskTimeLogs,
  fetchUsers,
  fetchCurrentUser,
  pauseTimer,
  resumeTimer,
  startTimer,
  stopTimer,
  updateTask,
  updateTaskComment,
  updateTimeEntry,
} from '../../lib/api';
import { useTaskDetailStore } from '../../store/task-detail.store';
import { TaskDetailsTab } from '../../components/tasks/TaskDetailsTab';
import { CommentEditor } from '../../components/comments/CommentEditor';
import { CommentList } from '../../components/comments/CommentList';
import { ActivityTimeline } from '../../components/activity/ActivityTimeline';
import { EditTaskModal } from '../../modals/EditTaskModal';
import { TaskPriorityBadge, TaskStatusBadge } from '../../components/tasks/TaskStatusBadge';
import { TaskFieldPopover } from '../../components/tasks/TaskFieldPopover';
import { TaskDetailsTimeEntryCard } from '../../components/timer/TaskDetailsTimeEntryCard';
import { TimerSavedModal } from '../../components/timer/TimerSavedModal';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { TaskTimeLogsTab } from '../../components/tasks/TaskTimeLogsTab';
import { TaskTimeEntryEditModal } from '../../components/tasks/TaskTimeEntryEditModal';
import type {
  Client,
  ManualEntryPayload,
  SafeUser,
  TaskActivity,
  TaskAttachment,
  TaskComment,
  TaskFormValues,
  TaskLabel,
  TaskRecord,
  TimeEntry,
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
  const [timeLogs, setTimeLogs] = useState<TimeEntry[]>([]);
  const [timeLogsLoading, setTimeLogsLoading] = useState(true);
  const [editingTimeLog, setEditingTimeLog] = useState<TimeEntry | null>(null);
  const [editTimeLogClientId, setEditTimeLogClientId] = useState('');
  const [editTimeLogTaskId, setEditTimeLogTaskId] = useState('');
  const [editTimeLogStartTime, setEditTimeLogStartTime] = useState('');
  const [editTimeLogEndTime, setEditTimeLogEndTime] = useState('');
  const [editTimeLogDescription, setEditTimeLogDescription] = useState('');
  const [pendingDeleteTimeLogId, setPendingDeleteTimeLogId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [activeTimer, setActiveTimer] = useState<TimeEntry | null>(null);
  const [savedTimer, setSavedTimer] = useState<TimeEntry | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [pendingDeleteAttachment, setPendingDeleteAttachment] = useState<TaskAttachment | null>(null);
  const [pendingDeleteComment, setPendingDeleteComment] = useState<TaskComment | null>(null);
  const [openFieldEditor, setOpenFieldEditor] = useState<{ field: 'status' | 'priority' } | null>(null);
  const fieldTriggerRef = useRef<HTMLButtonElement | null>(null);

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
    void fetchActiveTimer()
      .then(setActiveTimer)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void fetchActiveTimer()
        .then(setActiveTimer)
        .catch(() => undefined);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

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

  useEffect(() => {
    if (!taskId) {
      return;
    }

    setTimeLogsLoading(true);
    void fetchTaskTimeLogs(taskId)
      .then((rows) => {
        setTimeLogs(rows);
      })
      .catch(() => undefined)
      .finally(() => {
        setTimeLogsLoading(false);
      });
  }, [taskId, activeTimer?.id, isSavedModalOpen]);

  useEffect(() => {
    if (isEditing) {
      setOpenFieldEditor(null);
      fieldTriggerRef.current = null;
    }
  }, [isEditing]);

  useEffect(() => {
    if (!editingTimeLog) {
      setEditTimeLogClientId('');
      setEditTimeLogTaskId('');
      setEditTimeLogStartTime('');
      setEditTimeLogEndTime('');
      setEditTimeLogDescription('');
      return;
    }

    setEditTimeLogClientId(String(editingTimeLog.clientId));
    setEditTimeLogTaskId(String(editingTimeLog.taskId));
    setEditTimeLogStartTime(editingTimeLog.startTime.slice(0, 16));
    setEditTimeLogEndTime(editingTimeLog.endTime ? editingTimeLog.endTime.slice(0, 16) : '');
    setEditTimeLogDescription(editingTimeLog.description ?? '');
  }, [editingTimeLog]);

  if (!task || !currentUser) {
    return <section className="route-main"><div className="empty-state">{feedback || 'Loading task details...'}</div></section>;
  }

  const refreshAll = async () => {
    const [nextTask, nextAttachments, nextComments, nextActivity, nextTimeLogs] = await Promise.all([
      fetchTask(taskId),
      fetchTaskAttachments(taskId),
      fetchTaskComments(taskId),
      fetchTaskActivity(taskId),
      fetchTaskTimeLogs(taskId),
    ]);

    setTask(nextTask);
    setAttachments(nextAttachments);
    setComments(nextComments);
    setActivity(nextActivity);
    setTimeLogs(nextTimeLogs);
  };

  const updateTaskField = async (field: 'status' | 'priority', value: string) => {
    if (!task) {
      return;
    }

    const updated = await updateTask(task.id, field === 'status' ? { status: value as TaskRecord['status'] } : { priority: value as TaskRecord['priority'] });
    setTask(updated);
    touchActivity();
    await refreshAll();
  };

  const runTaskTimer = async (payload: { clientId: number; taskId: number; description?: string }) => {
    const entry = await startTimer(payload);
    setActiveTimer(entry);
    setFeedback('');
  };

  const pauseActiveTimer = async () => {
    const entry = await pauseTimer();
    setActiveTimer(entry);
    setFeedback('');
  };

  const resumeActiveTimer = async () => {
    const entry = await resumeTimer();
    setActiveTimer(entry);
    setFeedback('');
  };

  const stopActiveTimer = async (payload?: { description?: string }) => {
    const entry = await stopTimer(payload);
    setActiveTimer(null);
    setSavedTimer(entry);
    setIsSavedModalOpen(true);
    setFeedback('');
  };

  const cancelActiveTimer = async () => {
    await cancelTimer();
    setActiveTimer(null);
    setFeedback('');
    setCancelConfirmOpen(false);
  };

  const saveManualEntry = async (payload: ManualEntryPayload) => {
    const entry = await createManualTimeEntry(payload);
    const nextActiveTimer = await fetchActiveTimer().catch(() => activeTimer);
    setActiveTimer(nextActiveTimer);
    setSavedTimer(entry);
    setIsSavedModalOpen(true);
    setFeedback('');
  };

  const saveEditedTimeLog = async () => {
    if (!editingTimeLog) {
      return;
    }

    try {
      await updateTimeEntry(editingTimeLog.id, {
        clientId: editTimeLogClientId ? Number(editTimeLogClientId) : undefined,
        taskId: editTimeLogTaskId ? Number(editTimeLogTaskId) : undefined,
        startTime: editTimeLogStartTime ? new Date(editTimeLogStartTime).toISOString() : undefined,
        endTime: editTimeLogEndTime ? new Date(editTimeLogEndTime).toISOString() : undefined,
        description: editTimeLogDescription,
      });
      setEditingTimeLog(null);
      setFeedback('Time entry updated successfully.');
      await refreshAll();
    } catch (error: unknown) {
      setFeedback(error instanceof Error ? error.message : 'Unable to update time entry');
    }
  };

  const confirmDeleteTimeLog = async () => {
    if (pendingDeleteTimeLogId === null) {
      return;
    }

    try {
      await deleteTimeEntry(pendingDeleteTimeLogId);
      setPendingDeleteTimeLogId(null);
      setFeedback('Time entry deleted successfully.');
      await refreshAll();
    } catch (error: unknown) {
      setFeedback(error instanceof Error ? error.message : 'Unable to delete time entry');
    }
  };

  const confirmDeleteAttachment = async () => {
    if (!pendingDeleteAttachment) {
      return;
    }

    try {
      await deleteTaskAttachment(task.id, pendingDeleteAttachment.id);
      setPendingDeleteAttachment(null);
      touchAttachments();
      touchActivity();
      await refreshAll();
    } catch (error: unknown) {
      setFeedback(error instanceof Error ? error.message : 'Unable to delete attachment');
    }
  };

  const confirmDeleteComment = async () => {
    if (!pendingDeleteComment) {
      return;
    }

    try {
      await deleteTaskComment(pendingDeleteComment.id);
      setPendingDeleteComment(null);
      touchComments();
      touchActivity();
      await refreshAll();
    } catch (error: unknown) {
      setFeedback(error instanceof Error ? error.message : 'Unable to delete comment');
    }
  };

  const activeConfirmTarget = pendingDeleteAttachment ? 'attachment' : pendingDeleteComment ? 'comment' : null;
  const hasCommentReplies = Boolean(pendingDeleteComment?.replies && pendingDeleteComment.replies.length > 0);

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
            <strong>
              <TaskPriorityBadge
                priority={task.priority}
                onClick={(event) => {
                  setOpenFieldEditor((current) => (current?.field === 'priority' ? null : { field: 'priority' }));
                  fieldTriggerRef.current = event.currentTarget;
                }}
                isActive={openFieldEditor?.field === 'priority'}
                ariaLabel={`Update priority for ${task.title}`}
              />
            </strong>
            <span>Current urgency</span>
          </div>
        </article>
        <article className="stat-card stat-card-orange">
          <div className="stat-card-head">Status</div>
          <div className="stat-card-body">
            <strong>
              <TaskStatusBadge
                status={task.status}
                onClick={(event) => {
                  setOpenFieldEditor((current) => (current?.field === 'status' ? null : { field: 'status' }));
                  fieldTriggerRef.current = event.currentTarget;
                }}
                isActive={openFieldEditor?.field === 'status'}
                ariaLabel={`Update status for ${task.title}`}
              />
            </strong>
            <span>Delivery stage</span>
          </div>
        </article>
      </section>

      <section className="task-detail-layout">
        <TaskDetailsTimeEntryCard
          task={task}
          activeTimer={activeTimer}
          onStartTimer={runTaskTimer}
          onPauseTimer={pauseActiveTimer}
          onResumeTimer={resumeActiveTimer}
          onStopTimer={stopActiveTimer}
          onCancelTimerClick={() => setCancelConfirmOpen(true)}
          onCreateManualEntry={saveManualEntry}
        />

        <section className="card-panel task-detail-panel">
          <div className="task-detail-tabs" role="tablist" aria-label="Task detail tabs">
            <button type="button" className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Details</button>
            <button type="button" className={activeTab === 'comments' ? 'active' : ''} onClick={() => setActiveTab('comments')}>Comments</button>
            <button type="button" className={activeTab === 'time-logs' ? 'active' : ''} onClick={() => setActiveTab('time-logs')}>Time Logs</button>
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
                setPendingDeleteComment(null);
                setPendingDeleteAttachment(attachment);
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
                  setPendingDeleteAttachment(null);
                  setPendingDeleteComment(comment);
                }}
              />
            </div>
          ) : null}

          {activeTab === 'time-logs' ? (
            <TaskTimeLogsTab
              entries={timeLogs}
              loading={timeLogsLoading}
              onEdit={(entry) => {
                setEditingTimeLog(entry);
              }}
              onDelete={(entry) => {
                setPendingDeleteTimeLogId(entry.id);
              }}
            />
          ) : null}

          {activeTab === 'activity' ? <ActivityTimeline activity={activity} /> : null}
        </section>
      </section>

      {task && openFieldEditor ? (
        <TaskFieldPopover
          open={Boolean(openFieldEditor)}
          field={openFieldEditor.field}
          taskTitle={task.title}
          value={openFieldEditor.field === 'priority' ? task.priority : task.status}
          anchorRef={fieldTriggerRef}
          onClose={() => setOpenFieldEditor(null)}
          onSave={async (nextValue) => {
            await updateTaskField(openFieldEditor.field, nextValue);
            setOpenFieldEditor(null);
          }}
        />
      ) : null}

      <TaskTimeEntryEditModal
        entry={editingTimeLog}
        clients={clients}
        tasks={[task, ...timeLogs.map((entry) => entry.task as unknown as TaskRecord).filter((candidate, index, list) => list.findIndex((item) => item.id === candidate.id) === index)]}
        editClientId={editTimeLogClientId}
        editTaskId={editTimeLogTaskId}
        editStartTime={editTimeLogStartTime}
        editEndTime={editTimeLogEndTime}
        editDescription={editTimeLogDescription}
        onClose={() => setEditingTimeLog(null)}
        onClientChange={setEditTimeLogClientId}
        onTaskChange={setEditTimeLogTaskId}
        onStartTimeChange={setEditTimeLogStartTime}
        onEndTimeChange={setEditTimeLogEndTime}
        onDescriptionChange={setEditTimeLogDescription}
        onSubmit={() => {
          void saveEditedTimeLog();
        }}
      />

      <ConfirmModal
        open={cancelConfirmOpen}
        title="Cancel active timer?"
        message="This will discard the current timer and any unsaved tracked time."
        confirmLabel="Cancel timer"
        cancelLabel="Keep timer"
        destructive
        onClose={() => setCancelConfirmOpen(false)}
        onConfirm={() => {
          void cancelActiveTimer();
        }}
      />

      <ConfirmModal
        open={pendingDeleteTimeLogId !== null}
        title="Delete time entry?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onClose={() => setPendingDeleteTimeLogId(null)}
        onConfirm={() => {
          void confirmDeleteTimeLog();
        }}
      />

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

      <TimerSavedModal
        open={isSavedModalOpen}
        entry={savedTimer}
        onClose={() => setIsSavedModalOpen(false)}
        onViewTimesheet={() => {
          setIsSavedModalOpen(false);
          navigate('/timesheets');
        }}
      />

      <ConfirmModal
        open={Boolean(activeConfirmTarget)}
        title={activeConfirmTarget === 'attachment' ? 'Delete attachment?' : 'Delete comment?'}
        message={
          activeConfirmTarget === 'attachment'
            ? <>Delete &quot;{pendingDeleteAttachment?.originalName}&quot;? This action cannot be undone.</>
            : hasCommentReplies
              ? <>Delete this comment? Its replies will also be removed. This action cannot be undone.</>
              : <>Delete this comment? This action cannot be undone.</>
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        titleId="task-detail-delete-confirm-title"
        messageId="task-detail-delete-confirm-message"
        onClose={() => {
          setPendingDeleteAttachment(null);
          setPendingDeleteComment(null);
        }}
        onConfirm={() => {
          if (activeConfirmTarget === 'attachment') {
            void confirmDeleteAttachment();
            return;
          }

          void confirmDeleteComment();
        }}
      />
    </section>
  );
}
