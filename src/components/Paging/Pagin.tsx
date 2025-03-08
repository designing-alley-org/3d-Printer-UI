import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IPagin {
    setPagination: (pageNum: number) => void;
    totalPages: number;
  }


export default function Pagin({setPagination,totalPages}: IPagin) {

  return (
    <Stack spacing={1} >
      <Pagination
        count={totalPages}
        onChange={(_, pageNum) => setPagination(pageNum)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
