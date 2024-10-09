// actions.ts
import {
  ADD_FILE,
  REMOVE_FILE,
  UPDATE_FILE_PROGRESS,
  SET_ACTIVE_FILE,
} from './types';

export const addFile = (file: File, id: string) => ({
  type: ADD_FILE,
  payload: { file, id },
});

export const removeFile = (id: string) => ({
  type: REMOVE_FILE,
  payload: id,
});

export const updateFileProgress = (id: string, progress: number) => ({
  type: UPDATE_FILE_PROGRESS,
  payload: { id, progress },
});

export const setActiveFile = (id: string) => ({
  type: SET_ACTIVE_FILE,
  payload: id,
});
