import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPrinter } from '../types/printer';
import { FileDataDB } from '../types/uploadFiles';
import { UpdateValueById } from '../store/customizeFilesDetails/CustomizationSlice';
import { RootState } from '../store/types';

export function usePrinterSelector(
  printersData: IPrinter[],
  file?: FileDataDB
) {
  const [open, setOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<IPrinter | null>(null);
  const [searchValue, setSearchValue] = useState('');

  // Redux Hooks
  const { activeFileId } = useSelector(
    (state: RootState) => state.customization
  );
  const dispatch = useDispatch();

  // Handle CMD/CTRL + K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Handle printer selection
  const handleSelect = (printer: IPrinter) => {
    setSelectedPrinter(printer);
    dispatch(
      UpdateValueById({
        id: activeFileId as string,
        data: { printerId: printer._id },
      })
    );
    setOpen(false);
  };

  // Filtered printers
  const filteredPrinters = printersData.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Sync selected printer when file or data changes
  useEffect(() => {
    if (file?.printerId && printersData.length > 0) {
      const printer = printersData.find((p) => p._id === file.printerId);
      if (printer) {
        setSelectedPrinter(printer);
      }
    } else {
      setSelectedPrinter(null);
    }
  }, [file, printersData]);

  // Disable button if technologyId, materialId, or colorId is missing
  const isDisabled = useCallback(() => {
    return !(file?.colorId && file?.materialId && file?.technologyId);
  }, [file?.colorId, file?.materialId, file?.technologyId])();

  return {
    open,
    setOpen,
    selectedPrinter,
    handleSelect,
    searchValue,
    setSearchValue,
    filteredPrinters,
    isDisabled,
  };
}
