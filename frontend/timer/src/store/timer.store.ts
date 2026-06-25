import { create } from 'zustand';
import { ApiError, request } from '../lib/api';
import {
  ManualEntryPayload,
  StartTimerPayload,
  StopTimerPayload,
  TimeEntry,
} from '../types';

interface TimerState {
  activeTimer: TimeEntry | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  clearError: () => void;
  refreshActiveTimer: () => Promise<void>;
  startTimer: (payload: StartTimerPayload) => Promise<TimeEntry>;
  stopTimer: (payload?: StopTimerPayload) => Promise<TimeEntry>;
  submitManualEntry: (payload: ManualEntryPayload) => Promise<TimeEntry>;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  activeTimer: null,
  isLoading: false,
  isSaving: false,
  error: null,
  clearError: () => set({ error: null }),
  refreshActiveTimer: async () => {
    set({ isLoading: true, error: null });

    try {
      const activeTimer = await request<TimeEntry | null>('/timer/active');
      set({ activeTimer });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Unable to load timer state';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  startTimer: async (payload) => {
    set({ isSaving: true, error: null });

    try {
      const activeTimer = await request<TimeEntry>('/timer/start', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      set({ activeTimer, error: null });
      return activeTimer;
    } catch (error) {
      const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Request failed';
      set({ error: message });
      throw error;
    } finally {
      set({ isSaving: false });
    }
  },
  stopTimer: async (payload = {}) => {
    set({ isSaving: true, error: null });

    try {
      const stoppedTimer = await request<TimeEntry>('/timer/stop', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      set({ activeTimer: null, error: null });
      return stoppedTimer;
    } catch (error) {
      const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Request failed';
      set({ error: message });
      throw error;
    } finally {
      set({ isSaving: false });
    }
  },
  submitManualEntry: async (payload) => {
    set({ isSaving: true, error: null });

    try {
      const entry = await request<TimeEntry>('/timer/manual', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      set({ error: null });
      return entry;
    } catch (error) {
      const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Request failed';
      set({ error: message });
      throw error;
    } finally {
      set({ isSaving: false });
    }
  },
}));
