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
  onPrinterSelect,
}: {
  printersData: IPrinter[];
  file: FileDataDB | undefined;
  onPrinterSelect?: (printer: IPrinter) => void;
}) {
  const {
    open,
    setOpen,
    selectedPrinter,
    handleSelect,
    setSearchValue,
    filteredPrinters,
    isDisabled,
  } = usePrinterSelector(printersData, file, onPrinterSelect);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        disabled={isDisabled}
        sx={{
          width: '100%',
          padding: '7px 15px',
          justifyContent: 'space-between',
          borderRadius: 0.4,
          color: selectedPrinter ? 'text.primary' : 'text.secondary',
          borderColor: 'divider',
          fontSize: '.75rem',
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
