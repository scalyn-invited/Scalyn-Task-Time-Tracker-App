import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ApiError, createManualTimeEntry, fetchActiveTimer, pauseTimer as pauseTimerRequest, resumeTimer as resumeTimerRequest, startTimer as startTimerRequest, stopTimer as stopTimerRequest } from '../lib/api';
import {
  ManualEntryPayload,
  StartTimerPayload,
  StopTimerPayload,
  TimeEntry,
  TimerStatus,
} from '../types';

interface TimerState {
  activeTimer: TimeEntry | null;
  timerStatus: TimerStatus | null;
  pausedAt: string | null;
  totalPausedSeconds: number;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  clearError: () => void;
  refreshActiveTimer: () => Promise<void>;
  startTimer: (payload: StartTimerPayload) => Promise<TimeEntry>;
  pauseTimer: () => Promise<TimeEntry>;
  resumeTimer: () => Promise<TimeEntry>;
  stopTimer: (payload?: StopTimerPayload) => Promise<TimeEntry>;
  submitManualEntry: (payload: ManualEntryPayload) => Promise<TimeEntry>;
}

function syncTimerEntry(entry: TimeEntry | null): Pick<TimerState, 'activeTimer' | 'timerStatus' | 'pausedAt' | 'totalPausedSeconds'> {
  if (!entry) {
    return {
      activeTimer: null,
      timerStatus: null,
      pausedAt: null,
      totalPausedSeconds: 0,
    };
  }

  return {
    activeTimer: entry,
    timerStatus: entry.status,
    pausedAt: entry.pausedAt,
    totalPausedSeconds: entry.totalPausedSeconds,
  };
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      activeTimer: null,
      timerStatus: null,
      pausedAt: null,
      totalPausedSeconds: 0,
      isLoading: false,
      isSaving: false,
      error: null,
      clearError: () => set({ error: null }),
      refreshActiveTimer: async () => {
        set({ isLoading: true, error: null });

        try {
          const activeTimer = await fetchActiveTimer();
          set(syncTimerEntry(activeTimer));
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
          const activeTimer = await startTimerRequest(payload);
          set(syncTimerEntry(activeTimer));
          return activeTimer;
        } catch (error) {
          const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Request failed';
          set({ error: message });
          throw error;
        } finally {
          set({ isSaving: false });
        }
      },
      pauseTimer: async () => {
        set({ isSaving: true, error: null });

        try {
          const activeTimer = await pauseTimerRequest();
          set(syncTimerEntry(activeTimer));
          return activeTimer;
        } catch (error) {
          const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Request failed';
          set({ error: message });
          throw error;
        } finally {
          set({ isSaving: false });
        }
      },
      resumeTimer: async () => {
        set({ isSaving: true, error: null });

        try {
          const activeTimer = await resumeTimerRequest();
          set(syncTimerEntry(activeTimer));
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
          const stoppedTimer = await stopTimerRequest(payload);
          set(syncTimerEntry(null));
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
          return await createManualTimeEntry(payload);
        } catch (error) {
          const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Request failed';
          set({ error: message });
          throw error;
        } finally {
          set({ isSaving: false });
        }
      },
    }),
    {
      name: 'scalyn-timer-store',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        activeTimer: state.activeTimer,
        timerStatus: state.timerStatus,
        pausedAt: state.pausedAt,
        totalPausedSeconds: state.totalPausedSeconds,
      }),
    },
  ),
);
