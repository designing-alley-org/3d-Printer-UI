import { User } from '../types';
import { Color, Material, Technology } from '../types/uploadFiles';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './auth/action_types';


import {
  ADD_FILE,REMOVE_FILE,UPDATE_FILE_PROGRESS,SET_ACTIVE_FILE
} from './stlFile/action_types';

export interface RootState {
  auth: AuthState;
  specification: SpecificationState;
  userState: UserReducerState;
  address: AddressState;
  fileState: FileReducerState;
  register: RegisterState;
  printerDetails: IPrinterDetails[];
}

// types.ts
export interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

export interface SpecificationState {
  colors: Color[];
  materials: Material[];
  technologies: Technology[];
}



export interface user{
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AddressState {
  addressId: string;
}

interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;



export interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: string;
}

export type RegisterActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction;


  //====================== STL FILE ========================


  export interface FileState {
    id: string;
    file: File;
    name: string;
    size: string;
    progress: number;
  }
  
  export interface FileReducerState {
    files: FileState[];
    activeFileId: string | null;
  }

  export interface UserReducerState{
    user: User | null;
  }
  
   interface AddFileAction {
    type: typeof ADD_FILE;
    payload: {
      file: File;
      id: string;
    };
  }
  
  interface RemoveFileAction {
    type: typeof REMOVE_FILE;
    payload: string;
  }
  
  interface UpdateFileProgressAction {
    type: typeof UPDATE_FILE_PROGRESS;
    payload: {
      id: string;
      progress: number;
    };
  }
  
  interface SetActiveFileAction {
    type: typeof SET_ACTIVE_FILE;
    payload: string;
  }
  
  export type UserActionTypes =
    | AddUserAction;


  export type FileActionTypes =
    | AddFileAction
    | RemoveFileAction
    | UpdateFileProgressAction
    | SetActiveFileAction;
  
export interface IPrinterDetails {
  printerName: string;
  Model: string;
  buildVolume: string;
  layerResolution: string;
  materialCompatibility: string;
  technologyType: string;
  nozzleSize: string;
  printSpeed: string;
  extruders: number;
  maxBedHeat: string;
  heatSinkSize: string;
}
