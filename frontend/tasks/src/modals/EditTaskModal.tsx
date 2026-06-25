import type { Client, SafeUser, TaskFormValues, TaskLabel, TaskRecord } from '../types';
import { TaskFormModal } from './TaskFormModal';

interface EditTaskModalProps {
  task: TaskRecord;
  clients: Client[];
  users: SafeUser[];
  labels: TaskLabel[];
  onClose: () => void;
  onSubmit: (values: TaskFormValues, pendingFiles: File[]) => Promise<TaskRecord>;
}

export function EditTaskModal(props: EditTaskModalProps) {
  return <TaskFormModal mode="edit" {...props} />;
}
