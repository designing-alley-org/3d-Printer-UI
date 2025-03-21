import { useEffect, useState } from 'react';
import { FileInfo } from './FileInfo';
import { FileActions } from './FileActions';
import type { OrderFileProps, PricingDetailType } from '../../types';
import './OrderFile.css';
import { PricingChart } from '../PricingChart/PricingChart';
import { getPrinterById } from '../../store/actions/getPrinterById';


  export function OrderFile({ fileName, quantity, pricing, file }: OrderFileProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [printerName, setPrinterName] = useState<string>('');

    useEffect(() => {
      if (file.printer) {
        getPrinterById(file.printer, setPrinterName);
      }
    }, [file.printer]);


    const pricingDetails: PricingDetailType[] = [
      { label: 'Scale', value: `${file.dimensions.length.toFixed(3)} x ${file.dimensions.width.toFixed(3)} x ${file.dimensions.height.toFixed(3)} ${file.unit}`, pricePerUnit: 20, total: 12, icon: 'ruler' },
      { label: 'Technology', value: file.technology, pricePerUnit: 20, total: 12, icon: 'cpu' },
      { label: 'Material', value: file.material, pricePerUnit: 20, total: 12, icon: 'box' },
      { label: 'Colors', value: file.color, pricePerUnit: 20, total: 12, icon: 'palette' },
      { label: 'Printers', value: printerName, pricePerUnit: 20, total: 12, icon: 'printer' },
      { label: 'Infill Percentage', value: `${file.infill}%`, pricePerUnit: 20, total: 12, icon: 'percent' },
      { label: 'Quantity', value: `${file.quantity}`, pricePerUnit: 20, total: 12, icon: 'StretchHorizontal' },
      { label: 'Weight', value: `${file?.dimensions?.weight || 0} gm` , pricePerUnit: 20, total: 12, icon: 'weight' },
    ];

    const handleViewDetails = () => {
      setIsSelected(!isSelected);
    };

  return (
    <div className="order-file-container">
      <div className={isSelected ? 'order-file-header_seleceted' : 'order-file-header'}>
        <FileInfo fileName={fileName} />
        <FileActions
          quantity={quantity}
          pricing={pricing}
          isSelected={isSelected}
          onViewDetails={handleViewDetails}
          file={file.fileUrl}
        />
      </div>
      
      {isSelected && (
        <div className="order-file-details">
          <PricingChart 
            details={pricingDetails}
            quantity={quantity}
            taxes={10}
            total={pricing + 10}
          />
        </div>
      )}
    </div>
  );
}