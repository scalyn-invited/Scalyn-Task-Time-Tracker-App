import type { Client, SafeUser, TaskFormValues, TaskLabel, TaskRecord } from '../types';
import { TaskFormModal } from './TaskFormModal';

interface CreateTaskModalProps {
  clients: Client[];
  users: SafeUser[];
  labels: TaskLabel[];
  onClose: () => void;
  onSubmit: (values: TaskFormValues, pendingFiles: File[]) => Promise<TaskRecord>;
}

export function CreateTaskModal(props: CreateTaskModalProps) {
  return <TaskFormModal mode="create" {...props} />;
}
