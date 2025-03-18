import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IPagin {
    setPagination: (pageNum: number) => void;
    totalPages: number;
}

export default function Pagin({ setPagination, totalPages }: IPagin) {
    return (
        <Stack
            spacing={1}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1rem',
                padding: '0 1rem',

                '@media (max-width: 680px)': {
                    padding: '0rem',
                    margin: '0rem',
                },
            }}
        >
            <Pagination
                count={totalPages}
                sx={{
                    '& .MuiPaginationItem-root': {
                        transition: 'all 0.2s ease-in-out',
                        '@media (max-width: 480px)': {
                            padding: '0rem 0.5rem',
                            fontSize: '0.5rem',
                            height: '1.5rem',
                        },
                        '@media (min-width: 481px) and (max-width: 768px)': {
                            padding: '0.3rem 0.8rem',
                            fontSize: '0.85rem',
                        },
                        '@media (min-width: 769px)': {
                            padding: '0rem 1rem',
                            fontSize: '1rem',
                        },
                    },
                }}
                onChange={(_, pageNum) => setPagination(pageNum)}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                        sx={{
                            '&.Mui-selected': {
                                '@media (max-width: 480px)': {
                                    fontSize: '0.5rem',
                                    height: '1.5rem',
                                    padding: '0rem',
                                    margin:'0rem'
                                },
                                '@media (min-width: 481px) and (max-width: 768px)': {
                                    padding: '0.3rem 0.8rem',
                                    fontSize: '0.85rem',
                                },
                                '@media (min-width: 769px)': {
                                    padding: '0rem 1rem',
                                    fontSize: '1rem',
                                },
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
}
