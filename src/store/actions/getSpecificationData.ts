import { getSpecificationDataService } from "../../services/order";
import { addDataSpec } from "../customizeFilesDetails/SpecificationReducer";

interface IGetSpecificationData {
    dispatch: any;
}

export const getSpecificationData = ({ dispatch }: IGetSpecificationData) => {
    getSpecificationDataService()
        .then((res) => {
            if (!res) {
                res = [];
            }
            dispatch(addDataSpec(res));
        })
        .catch((err) => {
            console.error("Error fetching files:", err);
        });
};
