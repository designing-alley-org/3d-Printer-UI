export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface UpdateEmailPayload {
  new_email: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}
