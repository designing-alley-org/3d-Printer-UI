import { getAllPrintersService } from "../../services/printer";

export const getAllPrinters = async (setPrinterDetails: any) => {
   try {
   const res = await getAllPrintersService();
   const data = res?.data?.data;
   const filteredData = data.filter((item: any) => item.status === 1);
   setPrinterDetails(filteredData);
   } catch (error) {
    
   }
};