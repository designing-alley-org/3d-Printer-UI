import { getQuotesService } from "../../services/order"

// Interfaces for Quotes
interface IGetQuotes {
    orderId: string;
    setAllQuotes: (data: QuoteData) => void;
    setQuote: (data: QuoteItem) => void;
}

interface QuoteItem {
    fileName: string;
    quantity: number;
    price: number;
}

interface QuoteData {
    quoteStatus: string;
    isClosed: boolean;
    approvedBy: any;
    tax: number;
    files: QuoteItem[];
    Shipping: number;
    Taxes: number;
    totalPrice: number;
    _id: string;
}

export const getQuotes = async ({ orderId, setAllQuotes, setQuote }: IGetQuotes): Promise<void> => {
    try {
        const data = await getQuotesService(orderId);
       const quotes = data.data;
        setAllQuotes(quotes);
        const activeIndex = 0;
        setQuote(quotes[activeIndex]);
    } catch (error) {
        console.error('Error fetching and setting quotes:', error);
    }
};
