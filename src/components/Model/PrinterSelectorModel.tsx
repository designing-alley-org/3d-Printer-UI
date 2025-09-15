import { useEffect, useState } from 'react';
import { PrinterInfo } from '../PrinterCard';
import { Box, Button } from '@mui/material';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../MUI/Command';

import { IPrinter } from '../../types/printer';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateValueById } from '../../store/customizeFilesDetails/CustomizationSlice';
import { RootState } from '../../store/types';

export default function PrinterSelector({
  printersData,
  selectedPrinterId,
}: {
  printersData: IPrinter[];
  selectedPrinterId?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<IPrinter | null>(null);
  const [searchValue, setSearchValue] = useState('');
  // Redux
  const { activeFileId } = useSelector(
    (state: RootState) => state.customization
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

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

  const filteredPrinters = printersData.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    if (selectedPrinterId && printersData.length > 0) {
      const printer = printersData.find((p) => p._id === selectedPrinterId);
      if (printer) {
        setSelectedPrinter(printer);
      }
    } else {
      setSelectedPrinter(null);
    }
  }, [selectedPrinterId, printersData]);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        // endIcon={<UnfoldMoreIcon />}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          borderRadius: 0.5,
          color: selectedPrinter ? 'text.primary' : 'text.secondary',
          borderColor: 'divider',
        }}
      >
        {selectedPrinter
          ? selectedPrinter.name
          : 'Select a Technology, Material, or Color...'}
      </Button>
      <CommandDialog open={open} onClose={() => setOpen(false)}>
        <CommandInput setSearchValue={setSearchValue} />
        <CommandList>
          {filteredPrinters.length === 0 ? (
            <CommandEmpty />
          ) : (
            filteredPrinters.map((printer) => (
              <CommandItem
                key={printer._id}
                onSelect={() => handleSelect(printer)}
              >
                <PrinterInfo printer={printer} />
              </CommandItem>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </Box>
  );
}
