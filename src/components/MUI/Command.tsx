"use client"

import * as React from "react"
import {
  Box,
  Typography,
  Dialog,
  Drawer,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  DialogProps
} from "@mui/material"
import {
  Search as SearchIcon,
} from "@mui/icons-material"


function Command({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      {children}
    </Box>
  )
}

interface CommandDialogProps extends Omit<DialogProps, 'children'> {
    children: React.ReactNode;
}

function CommandDialog({ children, ...props }: CommandDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const containerStyles = {
    "& .MuiDialog-container": {
      alignItems: "flex-start",
      paddingTop: "20vh",
    },
    "& .MuiPaper-root": {
      padding: 0,
      overflow: "hidden",
      width: "100%",
      maxWidth: 740,
      borderRadius: 0.5,
    },
  }

  const drawerStyles = {
    "& .MuiPaper-root": {
      height: "60%",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 0,
      overflow: "hidden",
    },
  }

  const content = <Command>{children}</Command>;

  if (isMobile) {
    return (
      <Drawer anchor="bottom" {...props} sx={drawerStyles}>
        {content}
      </Drawer>
    )
  }

  return (
    <Dialog {...props} sx={containerStyles}>
      {content}
    </Dialog>
  )
}

interface CommandInputProps extends Omit<React.ComponentProps<typeof TextField>, 'onChange'> {
  setSearchValue: (value: string) => void;
}

function CommandInput({ setSearchValue, ...props }: CommandInputProps) {
  return (
    <Box sx={{ p: 1.5, borderBottom: 1, borderColor: "divider" }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Search for a printer..."
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        }}
        autoFocus
        {...props}
      />
    </Box>
  )
}

function CommandList({ children, ...props }: React.ComponentProps<typeof List>) {
  return (
    <List
      {...props}
      sx={{
        maxHeight: 450,
        overflowY: "auto",
        overflowX: "hidden",
        p: 1,
        ...props.sx,
      }}
    >
      {children}
    </List>
  )
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      variant="body2"
      textAlign="center"
      sx={{ p: 4, color: "text.secondary" }}
      {...props}
    >
      No Data found.
    </Typography>
  )
}

function CommandItem({ onSelect, children, ...props }: { onSelect: () => void } & React.ComponentProps<typeof ListItemButton>) {
  return (
    <ListItemButton
      onClick={onSelect}
      {...props}
      sx={{
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        p: 1.5,
        mb: 0.5,
        ...props.sx
      }}
    >
      {children}
    </ListItemButton>
  )
}



export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
}