import { getCurrentUserService } from '../../services/user';
import { addUserDetails } from '../user/reducer';

export const getCurrentUser = async (dispatch: Function) => {
  try {
    const response = await getCurrentUserService();
    dispatch(addUserDetails(response?.data?.data));
  } catch (error) {
    console.log(error);
  }
};
