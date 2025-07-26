import { Dispatch } from "redux";
import { getQuotesService } from "../../services/order";
import { setQuoteData } from "../quote/quote";

// Interfaces for Quotes
interface IGetQuotes {
    orderId: string;
    activeIndex: number;
    setAllQuotes: (quotes: any[]) => void;
    setQuote: (quote: any) => void;
    dispatch?:Dispatch<any>
}

export const getQuoteByOrderId = async ({
    orderId,
    setAllQuotes,
    setQuote,
    activeIndex,
    dispatch
}: IGetQuotes): Promise<void> => {
    try {
        const data = await getQuotesService(orderId);
        const quotes = data?.data ?? [];
        setAllQuotes(quotes);
        if(dispatch) {
            dispatch(setQuoteData(quotes));
        }
        if (quotes.length > 0 && quotes[activeIndex]) {
            setQuote(quotes[activeIndex]);
        } else {
            setQuote(null); // or some default
        }
        return quotes;
    } catch (error) {
        console.error("Error fetching and setting quotes:", error);
    }
};
