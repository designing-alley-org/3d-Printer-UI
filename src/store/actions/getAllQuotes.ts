import { getAllQuotesService } from "../../services/order";

const getAllQuotes = async (setQuote: any,orderId: string) => {
    try {
        const response = await getAllQuotesService(orderId);
        if (!response) {
            console.warn("No quotes found for the provided order ID.");
            return;
        }
        setQuote(response.data.data[response.data.data.length - 1]);

    } catch (error) {
        console.error("Error in handleProceed:", error);
    }
};


export { getAllQuotes };