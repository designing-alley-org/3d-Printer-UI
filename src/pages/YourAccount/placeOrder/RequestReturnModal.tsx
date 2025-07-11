import React, { useRef, useState } from 'react';
import {
    Box,
    Typography,
    Modal,
    TextField,
    Button,
    IconButton,
    Grid,
    Divider
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { returnRequestService } from '../../../services/fedex';
import toast from 'react-hot-toast';

interface ImagePreview {
    file: File;
    url: string;
}

interface RequestReturnModalProps {
    open: boolean;
    onClose: () => void;
    shipmentId: string;
    orderID?: string;
}

const RequestReturnModal: React.FC<RequestReturnModalProps> = ({ open, onClose, shipmentId, orderID }) => {
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [reason, setReason] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (images.length >= 5) {
            alert('Only 5 images can be uploaded.');
            return;
        }
        

        if (files) {
            const newImages: ImagePreview[] = Array.from(files).map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));
            setImages((prev) => [...prev, ...newImages]);
        }
    };

    const handleImageRemove = (index: number) => {
        const newList = [...images];
        newList.splice(index, 1);
        setImages(newList);
    };

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    const handleSubmit = async () => {
       
        setIsLoading(true);
        const formData = new FormData();
        images.forEach((img) => {
            formData.append('files', img.file);
        });
        formData.append('reason', reason);
        formData.append('orderID', orderID || '');
        try {
            await returnRequestService(shipmentId, formData);
            setImages([]);
            setReason('');
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error('Error with return request. Please try again.');
        } finally {
            setIsLoading(false);
        }

        console.log('Submitted with reason:', reason);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                    bgcolor: '#fff',
                    p: 4,
                    m: '100px auto',
                    borderRadius: 2,
                    boxShadow: '0px 6px 24px rgba(33, 150, 243, 0.2)',
                    outline: 'none',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Request Return
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography fontWeight={500} mb={1}>
                    Shipment ID: <strong>{shipmentId}</strong>
                </Typography>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Reason for Return"
                    variant="outlined"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Box alignItems="flex-start">
                    {/* Attach Images Left */}
                    <Box display="flex" flexDirection="column" width={'50%'} mr={2}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Typography fontWeight={600} mr={1}>
                                Attach Images
                            </Typography>
                            <IconButton onClick={openFilePicker} size="small" sx={{ color: '#1976d2' }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 500 , fontSize: '0.8rem', mb: 2  }}>
                            Note: Must attach minimum 2 images.
                        </Typography>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </Box>

                    {/* Vertical Divider */}
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                    {/* Image Preview */}
                    <Grid container spacing={1}>
                        {images.map((img, idx) => (
                            <Grid item key={idx}>
                                <Box
                                    sx={{
                                        width: { xs: 64, sm: 80 },
                                        height: { xs: 64, sm: 80 },
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        position: 'relative',
                                    }}
                                >
                                    <img
                                        src={img.url}
                                        alt={`preview-${idx}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleImageRemove(idx)}
                                        sx={{
                                            position: 'absolute',
                                            top: 4,
                                            right: 4,
                                            backgroundColor: '#fff',
                                            borderRadius: '6px',
                                            padding: '2px',
                                            boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
                                            '&:hover': {
                                                backgroundColor: '#f44336',
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Submit Button */}
                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={images.length < 2 || !reason.trim()}
                        sx={{
                            bgcolor: '#1976d2',
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            fontWeight: 'bold',
                            borderRadius: '999px',
                            '&:hover': {
                                bgcolor: '#1565c0',
                            },
                        }}
                    >
                       {isLoading ? 'Loading...' : ' Request Return'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default RequestReturnModal;
