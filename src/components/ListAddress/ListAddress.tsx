import React from 'react';
import { 
  Typography, 
  Stack, 
  Chip, 
  Radio, 
  IconButton, 
  useMediaQuery, 
  Card,
  CardContent
} from '@mui/material';
import { Edit } from '@mui/icons-material';

interface Address {
  _id: string;
  personName: string;
  phoneNumber: string;
  city: string;
  countryCode: string;
  postalCode: string;
  streetLines: string;
}

interface ListAddressProps {
  address: Address;
  index: number;
  selectedAddressId?: string;
  onAddressSelect?: (addressId: string) => void;
  onEditClick?: (address: Address) => void;
  showRadio?: boolean;
  showEdit?: boolean;
}

const ListAddress: React.FC<ListAddressProps> = ({
  address,
  selectedAddressId,
  onAddressSelect,
  onEditClick,
  showRadio = true,
  showEdit = true,
}) => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const handleRadioChange = () => {
    if (onAddressSelect) {
      onAddressSelect(address._id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditClick) {
      onEditClick(address);
    }
  };

  return (
  <Card  sx={{ mb: 1.5, mr:1, cursor: showRadio ? 'pointer' : 'default' }} onClick={showRadio ? handleRadioChange : undefined}>
    <CardContent sx={{ padding: isSmallScreen ? '8px' : '12px' }}>
      <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onClick={showRadio ? handleRadioChange : undefined}
    >
      <Stack spacing={0.5} sx={{ flex: 1 }}>
        <Typography
          variant={isSmallScreen ? "body1" : "h6"}
          color="text.primary"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {address.personName}
          {selectedAddressId === address._id && (
            <Chip
              label="Default Selected"
              size="small"
              sx={{
                borderRadius: "0.3rem",
                fontSize: "0.6rem",
                height: "1.5rem",
              }}
            />
          )}
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontSize: isSmallScreen ? "0.6rem" : undefined }}
        >
          {address.phoneNumber}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: isSmallScreen ? "0.6rem" : undefined }}
        >
          {address.city}, {address.countryCode}, {address.postalCode}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: isSmallScreen ? "0.6rem" : undefined }}
        >
          {address.streetLines}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        {showEdit && (
          <IconButton
            size={isSmallScreen ? "small" : "medium"}
            onClick={handleEditClick}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.dark',
              },
            }}
          >
            <Edit fontSize={isSmallScreen ? "small" : "medium"} />
          </IconButton>
        )}
        
        {showRadio && (
          <Radio
            checked={selectedAddressId === address._id}
            onChange={handleRadioChange}
            value={address._id}
            name="address"
            color="primary"
          />
        )}
      </Stack>
    </Stack>
    </CardContent>
  </Card>
  );
};

export default ListAddress;
