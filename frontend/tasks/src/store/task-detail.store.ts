import { create } from 'zustand';
import type { TaskDetailTab, TaskRecord } from '../types';

interface TaskDetailState {
  activeTab: TaskDetailTab;
  task: TaskRecord | null;
  attachmentRefreshKey: number;
  commentRefreshKey: number;
  activityRefreshKey: number;
  setActiveTab: (tab: TaskDetailTab) => void;
  setTask: (task: TaskRecord | null) => void;
  touchAttachments: () => void;
  touchComments: () => void;
  touchActivity: () => void;
}

export const useTaskDetailStore = create<TaskDetailState>((set) => ({
  activeTab: 'details',
  task: null,
  attachmentRefreshKey: 0,
  commentRefreshKey: 0,
  activityRefreshKey: 0,
  setActiveTab: (activeTab) => set({ activeTab }),
  setTask: (task) => set({ task }),
  touchAttachments: () => set((state) => ({ attachmentRefreshKey: state.attachmentRefreshKey + 1 })),
  touchComments: () => set((state) => ({ commentRefreshKey: state.commentRefreshKey + 1 })),
  touchActivity: () => set((state) => ({ activityRefreshKey: state.activityRefreshKey + 1 })),
}));
