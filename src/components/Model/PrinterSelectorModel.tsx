import { useEffect, useState } from "react";
import { Printer, PrinterInfo } from "../PrinterCard";
import { Box, Button, Typography } from "@mui/material";
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from "../MUI/Command";


import {
  UnfoldMore as UnfoldMoreIcon,
} from "@mui/icons-material"


export default function PrinterSelector({ printersData }: { printersData: Printer[] }) {
  const [open, setOpen] = useState(false)
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (printer: Printer) => {
    setSelectedPrinter(printer);
    setOpen(false);
  }

  const filteredPrinters = printersData.filter(p =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            endIcon={<UnfoldMoreIcon />}
            sx={{
                width: '100%',
                justifyContent: 'space-between',
                borderRadius: 0.5,
                color: selectedPrinter ? 'text.primary' : 'text.secondary',
                borderColor: 'divider',
            }}
        >
            {selectedPrinter ? selectedPrinter.name : "Select a printer..."}
        </Button>
      <CommandDialog open={open} onClose={() => setOpen(false)}>
        <CommandInput setSearchValue={setSearchValue} />
        <CommandList>
          {filteredPrinters.length === 0 ? (
            <CommandEmpty />
          ) : (
            filteredPrinters.map((printer) => (
                <CommandItem
                    key={printer.id}
                    onSelect={() => handleSelect(printer)}
                >
                    <PrinterInfo printer={printer} />
                </CommandItem>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </Box>
  )
}

