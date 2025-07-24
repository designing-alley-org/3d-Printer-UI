import { createOrderService } from "../../services/order";

interface ICreateOrder {
    setActiveTabs?: (tabs: number[]) => void;
    setIsSaving: (isSaving: boolean) => void;
    navigate: (path: string) => void;

}

const createOrder = async ({
    setActiveTabs,
    setIsSaving,
    navigate,
}: ICreateOrder): Promise<void> => {
    try {
        setIsSaving(true); 

        // Call the service to create the order
        const response = await createOrderService();

        if (!response.data.data._id) {
            throw new Error('Order ID is missing in the response');
        }

        // Set active tabs if provided
        if (setActiveTabs) {
            setActiveTabs([0]); // Activate the first tab
        }

        // Navigate to the upload page with the new order ID
        navigate(`/get-quotes/${response.data.data._id}/upload-stl`);

      
    } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order. Please try again.");
    } finally {
        setIsSaving(false); 
    }
};

export { createOrder };
