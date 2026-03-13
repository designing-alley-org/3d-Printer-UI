import { useCallback, useEffect, useState } from 'react';
import { IPrinter } from '../types/printer';
import { FileDataDB } from '../types/uploadFiles';

export function usePrinterSelector(
  printersData: IPrinter[],
  file?: FileDataDB,
  onPrinterSelect?: (printer: IPrinter) => void
) {
  const [open, setOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<IPrinter | null>(null);
  const [searchValue, setSearchValue] = useState('');

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
    if (onPrinterSelect) {
      onPrinterSelect(printer);
    }
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
