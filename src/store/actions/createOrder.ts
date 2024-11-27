import { createOrderService } from "../../services/order";

interface ICreateOrder {
    setActiveTabs: (tabs: number[]) => void;
    setIsSaving: (isSaving: boolean) => void;
    navigate: (path: string) => void;
}

const createOrder = async ({
    setActiveTabs,
    setIsSaving,
    navigate,
}: ICreateOrder): Promise<void> => {
    try {
        setIsSaving(true); // Start saving indicator

        // Call the service to create the order
        const response = await createOrderService();

        // Handle response
        if (response.status === 200) {
            console.log("Order created successfully!");
            setActiveTabs([0]); // Activate the first tab
            navigate(`${response.data.data._id}/upload-stl`); 
        } else {
            console.warn("Order creation failed or invalid response.");
        }
    } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order. Please try again.");
    } finally {
        setIsSaving(false); 
    }
};

export { createOrder };
