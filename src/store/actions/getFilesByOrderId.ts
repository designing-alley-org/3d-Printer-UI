import { set } from "react-hook-form"
import { getFilesByOrderIdService, getFileByOrderIdUploadstlService} from "../../services/order"
import { addAllFiles } from "../customizeFilesDetails/reducer"

interface IGetFilesByOrderId {
    orderId: string ,
    setFetchFiles: any,
    dispatch: any
}
export const getFilesByOrderId = ({orderId, setFetchFiles ,dispatch}: IGetFilesByOrderId
) => {
    getFilesByOrderIdService(orderId)
        .then((res) => {
            if (!res) {
                res = [];
            }
            if(setFetchFiles){
                setFetchFiles(res)
            }
            if (dispatch) {
                dispatch(addAllFiles(res));
                return;
            }
            return res;
        })
        .catch((err) => {
            console.error('Error fetching files:', err);
        })
}


// export const getFilesByOrderIdForUploadstl = async (orderId: string,setFiles:string ) => {
//     try {
//         const response = await getFileByOrderIdUploadstlService(orderId);
//         if (response === undefined) {
//             console.warn("Files data is missing");
//             return;
//         }
//         return response;
//         console.log("response", response);
//     } catch (err) {
//         console.error("Error in getFilesByOrderId", err);
//     }}