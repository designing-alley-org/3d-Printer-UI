import { filterPrinterService } from '../../services/printer';

interface Props {
  materialId: string;
  technologyId: string;
  colorId: string;
  setPrinterData: React.Dispatch<any>;
  setPrinterMessage: React.Dispatch<string>;
}

export const filterPrinterAction = async ({
  materialId,
  technologyId,
  colorId,
  setPrinterData,
  setPrinterMessage,
}: Props): Promise<void> => {
  try {
    setPrinterData([]);
    const res = await filterPrinterService(technologyId, materialId, colorId);
    if (res.length === 0) {
      setPrinterMessage(
        'No printers found with the selected technology and material'
      );
    } else {
      setPrinterMessage('');
    }
    setPrinterData(res);
  } catch (err) {
    console.error('Error fetching printer data:', err);
  }
};
