import { User } from '../types';
import { Notification } from '../types/notification';
import { Color, FileDataDB, Material, ModelDimensions, Pricing, Technology } from '../types/uploadFiles';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './auth/action_types';



export interface RootState {
  auth: AuthState;
  specification: SpecificationState;
  userState: UserReducerState;
  address: AddressState;
  fileState: FileReducerState;
  customization: FileDetailsState;
  register: RegisterState;
  printerDetails: IPrinterDetails[];
  notification: NotificationState;
}



export interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  length: number;
  error: string | null;
}


export interface FileDetailsState {
  files: FileDataDB[];
  reverseDimensions: {
    _id: string;
    unit: string;
    dimensions: ModelDimensions;
  }[];
  activeFileId: string | null;
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
  pricing: Pricing | null;
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
  
   
  
  
  
  export type UserActionTypes =
    | AddUserAction;


  
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
