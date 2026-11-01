import { createSlice, UnknownAction } from '@reduxjs/toolkit';
import { ActionLogEntry, ActionLogState } from '../../types';

const initialState: ActionLogState = {
  logs: [],
};

const isTrackedAction = (
  action: UnknownAction
): action is UnknownAction & { payload?: unknown } => {
  return (
    typeof action.type === 'string' &&
    (action.type.startsWith('stats/') || action.type.startsWith('inventory/'))
  );
};

export const actionLogSlice = createSlice({
  name: 'actionLog',
  initialState,
  reducers: {
    clearLogs: (state) => {
      state.logs = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isTrackedAction, (state, action) => {
      const now = new Date();
      const timeString = `${now.toTimeString().split(' ')[0]}.${String(
        now.getMilliseconds()
      ).padStart(3, '0')}`;

      const newEntry: ActionLogEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type: action.type,
        payload: action.payload !== undefined ? action.payload : null,
        timestamp: timeString,
      };

      state.logs.unshift(newEntry);
      if (state.logs.length > 5) {
        state.logs = state.logs.slice(0, 5);
      }
    });
  },
});

export const { clearLogs } = actionLogSlice.actions;

export default actionLogSlice.reducer;
