import { getQuotesService } from "../../services/order"

// Interfaces for Quotes
interface IGetQuotes {
    orderId: string;
    activeIndex: number;
    setAllQuotes: any;
    setQuote: any;
}


export const getQuoteByOrderId = async ({ orderId, setAllQuotes, setQuote, activeIndex }: IGetQuotes): Promise<void> => {
    try {
        const data = await getQuotesService(orderId);
        const quotes = data.data;
        setAllQuotes(quotes);
        setQuote(quotes[activeIndex]);
    } catch (error) {
        console.error('Error fetching and setting quotes:', error);
    }
};
