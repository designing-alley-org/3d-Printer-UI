import { Box, Button } from '@mui/material';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../MUI/Command';
import { PrinterInfo } from '../PrinterCard';
import { IPrinter } from '../../types/printer';
import { FileDataDB } from '../../types/uploadFiles';
import { usePrinterSelector } from '../../hook/usePrinterSelector';

export default function PrinterSelector({
  printersData,
  file,
}: {
  printersData: IPrinter[];
  file: FileDataDB | undefined;
}) {
  
  const {
    open,
    setOpen,
    selectedPrinter,
    handleSelect,
    searchValue,
    setSearchValue,
    filteredPrinters,
    isDisabled,
  } = usePrinterSelector(printersData, file);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        disabled={isDisabled}
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
